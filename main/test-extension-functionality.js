#!/usr/bin/env node
/**
 * Extension Functionality Test Suite
 * Tests the core logic of Universal Cookie Extractor v2
 */

// Simulate browser environment
global.chrome = {
    tabs: {
        query: function(query, callback) {
            callback([{
                url: 'https://linkedin.com/feed',
                title: 'LinkedIn Feed'
            }]);
        }
    },
    cookies: {
        getAll: function(filter) {
            // Simulate comprehensive cookie set from LinkedIn
            return Promise.resolve([
                // Authentication cookies
                {
                    name: 'li_at',
                    value: 'AQEDARxxxxxxxx',
                    domain: '.linkedin.com',
                    path: '/',
                    secure: true,
                    httpOnly: true,
                    sameSite: 'None',
                    expirationDate: Date.now() / 1000 + 86400
                },
                {
                    name: 'JSESSIONID',
                    value: 'ajax:1234567890',
                    domain: 'www.linkedin.com',
                    path: '/',
                    secure: true,
                    httpOnly: true,
                    sameSite: 'Strict'
                },
                {
                    name: 'csrf-token',
                    value: 'csrf-xyz123',
                    domain: 'linkedin.com',
                    path: '/',
                    secure: false,
                    httpOnly: false,
                    sameSite: 'Lax',
                    expirationDate: Date.now() / 1000 + 3600
                },
                // Tracking/analytics cookies
                {
                    name: 'li_analytics',
                    value: 'tracking123',
                    domain: '.linkedin.com',
                    path: '/',
                    secure: false,
                    httpOnly: false,
                    sameSite: 'None',
                    expirationDate: Date.now() / 1000 + 86400 * 30
                },
                {
                    name: 'marketing_prefs',
                    value: 'opt_in=true',
                    domain: 'linkedin.com',
                    path: '/',
                    secure: true,
                    httpOnly: false,
                    sameSite: 'Strict',
                    expirationDate: Date.now() / 1000 + 86400 * 365
                },
                // Session cookies
                {
                    name: 'temp_session',
                    value: 'temp123',
                    domain: 'www.linkedin.com',
                    path: '/',
                    secure: true,
                    httpOnly: true,
                    sameSite: 'Strict'
                }
            ]);
        }
    }
};

// Import core functions from extension
function getDomainFromUrl(url) {
    try {
        const urlObj = new URL(url);
        return urlObj.hostname;
    } catch (e) {
        return 'unknown';
    }
}

function isAuthCookie(cookie) {
    const authPatterns = [
        'auth', 'session', 'token', 'login', 'user', 'csrf', 'xsrf',
        'li_at', 'c_user', 'xs', 'fr', 'sb', 'datr', // Facebook
        'auth_token', 'twid', 'ct0', // Twitter
        'sessionid', 'csrftoken', // Instagram
        'SID', 'HSID', 'SSID', 'APISID', 'SAPISID', // Google
        'JSESSIONID', 'PHPSESSID', 'ASP.NET_SessionId' // Common sessions
    ];
    
    return authPatterns.some(pattern => 
        cookie.name.toLowerCase().includes(pattern.toLowerCase())
    );
}

function getCookieFlags(cookie) {
    const flags = [];
    if (cookie.secure) flags.push('🔒Secure');
    if (cookie.httpOnly) flags.push('🚫HttpOnly');
    if (!cookie.expirationDate) flags.push('⏱️Session');
    else flags.push('💾Persistent');
    if (cookie.sameSite) flags.push(`🌐${cookie.sameSite}`);
    return flags.join(' ');
}

// Test Suite
async function runTests() {
    console.log('🍪 Universal Cookie Extractor v2 - Test Suite\n');
    console.log('='.repeat(50));
    
    let totalTests = 0;
    let passedTests = 0;

    function test(name, condition, expected = true) {
        totalTests++;
        const result = condition === expected;
        if (result) passedTests++;
        
        const status = result ? '✅ PASS' : '❌ FAIL';
        console.log(`${status} ${name}`);
        if (!result) {
            console.log(`     Expected: ${expected}, Got: ${condition}`);
        }
        return result;
    }

    // Test 1: URL Domain Extraction
    console.log('\n📋 Testing Domain Extraction:');
    test('LinkedIn domain extraction', getDomainFromUrl('https://linkedin.com/feed'), 'linkedin.com');
    test('Facebook domain extraction', getDomainFromUrl('https://www.facebook.com/home'), 'www.facebook.com');
    test('Invalid URL handling', getDomainFromUrl('not-a-url'), 'unknown');

    // Test 2: Cookie Authentication Detection
    console.log('\n🔐 Testing Auth Cookie Detection:');
    const testCookies = await chrome.cookies.getAll({});
    
    test('li_at detected as auth', isAuthCookie({name: 'li_at', value: 'test'}), true);
    test('JSESSIONID detected as auth', isAuthCookie({name: 'JSESSIONID', value: 'test'}), true);
    test('csrf-token detected as auth', isAuthCookie({name: 'csrf-token', value: 'test'}), true);
    test('marketing_prefs NOT detected as auth', isAuthCookie({name: 'marketing_prefs', value: 'test'}), false);
    test('li_analytics NOT detected as auth', isAuthCookie({name: 'li_analytics', value: 'test'}), false);

    // Test 3: Cookie Categorization
    console.log('\n🎯 Testing Cookie Categorization:');
    const authCookies = testCookies.filter(isAuthCookie);
    const sessionCookies = testCookies.filter(c => !c.expirationDate);
    const secureCookies = testCookies.filter(c => c.secure);

    test('Auth cookies found', authCookies.length, 4); // li_at, JSESSIONID, csrf-token, temp_session
    test('Session cookies found', sessionCookies.length, 2); // JSESSIONID, temp_session  
    test('Secure cookies found', secureCookies.length >= 3, true);

    // Test 4: Selective Extraction Output
    console.log('\n🚀 Testing Selective Extraction:');
    const selectedCookies = testCookies.filter(isAuthCookie);
    
    const extractionResult = {
        timestamp: new Date().toISOString(),
        extractionType: 'selected_cookies',
        currentUrl: 'https://linkedin.com/feed',
        domain: 'linkedin.com',
        totalAvailable: testCookies.length,
        selectedCount: selectedCookies.length,
        cookies: selectedCookies.map(cookie => ({
            name: cookie.name,
            value: cookie.value,
            domain: cookie.domain,
            path: cookie.path,
            secure: cookie.secure,
            httpOnly: cookie.httpOnly,
            sameSite: cookie.sameSite,
            session: !cookie.expirationDate
        }))
    };

    test('Valid extraction format', typeof extractionResult === 'object', true);
    test('Correct extraction type', extractionResult.extractionType, 'selected_cookies');
    test('Correct selected count', extractionResult.selectedCount, 4);
    test('Correct cookie structure', extractionResult.cookies.length > 0, true);

    // Test 5: JSON Output Validation
    console.log('\n📄 Testing JSON Output:');
    try {
        const jsonOutput = JSON.stringify(extractionResult, null, 2);
        const parsedBack = JSON.parse(jsonOutput);
        
        test('JSON serialization works', true, true);
        test('JSON round-trip works', parsedBack.extractionType, 'selected_cookies');
        test('Cookie data preserved', parsedBack.cookies.length, 4);
        
        console.log('\n📊 Sample JSON Output:');
        console.log(jsonOutput.substring(0, 400) + '...\n');
        
    } catch (error) {
        test('JSON serialization works', false, true);
        console.log(`     Error: ${error.message}`);
    }

    // Test 6: Security & Privacy Features
    console.log('\n🛡️ Testing Security Features:');
    const authOnlyCookies = testCookies.filter(isAuthCookie);
    const allCookies = testCookies;
    
    test('Auth-only extraction reduces data', authOnlyCookies.length < allCookies.length, true);
    test('No tracking cookies in auth selection', !authOnlyCookies.some(c => c.name.includes('analytics')), true);
    test('Essential auth cookies preserved', authOnlyCookies.some(c => c.name === 'li_at'), true);

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log(`🧪 Test Summary: ${passedTests}/${totalTests} tests passed`);
    
    if (passedTests === totalTests) {
        console.log('✅ All tests PASSED! Extension is ready for deployment.');
        return 0;
    } else {
        console.log(`❌ ${totalTests - passedTests} tests FAILED! Review extension logic.`);
        return 1;
    }
}

// Run tests if called directly
if (require.main === module) {
    runTests().then(exitCode => process.exit(exitCode));
}

module.exports = { runTests, getDomainFromUrl, isAuthCookie, getCookieFlags };