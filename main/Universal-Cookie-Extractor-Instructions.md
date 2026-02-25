# 🍪 Universal Cookie Extractor - Enhanced Edition

## 🚀 **What's New - Universal Support!**
- ✅ **Any Website** - Works on LinkedIn, Facebook, Twitter, Instagram, etc.
- ✅ **Current Site Mode** - Extract cookies from just the current website
- ✅ **All Sites Mode** - Extract cookies from ALL websites you've visited
- ✅ **Smart Detection** - Automatically detects current website
- ✅ **Organized Output** - Groups cookies by domain for clarity

## 📦 Files Included
- `universal-cookie-extractor.zip` - The enhanced Chrome extension
- Complete source code for transparency

## 🚀 Installation Steps

### 1. Download & Extract
- Download `universal-cookie-extractor.zip` 
- Extract to a folder (like `linkedin-cookie-extractor/`)

### 2. Install in Chrome
1. Open Chrome → `chrome://extensions/`
2. Turn ON "Developer mode" (top right)
3. Click "Load unpacked" 
4. Select the extracted folder
5. Extension appears with 🍪 icon

## 🎯 How to Use

### Mode 1: Current Site Cookies
1. **Navigate to any website** (LinkedIn, Facebook, etc.)
2. **Login normally** to that website
3. **Click the 🍪 extension icon**
4. **Click "Extract Cookies"** - gets cookies from current site only
5. **Copy JSON output**

### Mode 2: All Sites Cookies  
1. **Click the 🍪 extension icon** (from any tab)
2. **Click "Extract All Cookies (All Sites)"** 
3. **Gets cookies from EVERY website** you've logged into
4. **Copy JSON output**

## 🌐 **What Sites Can It Handle?**
- **LinkedIn** - Session cookies, CSRF tokens, auth data
- **Facebook/Meta** - All authentication cookies  
- **Twitter/X** - API tokens, session data
- **Instagram** - Login sessions, API keys
- **Google Services** - Gmail, Drive, Photos sessions
- **Any Website** - E-commerce, banking, social media, etc.

## 🔍 **Output Format**
```json
{
  "timestamp": "2026-02-21T12:30:00.000Z",
  "extractionType": "current_site" | "all_sites",
  "domain": "linkedin.com",
  "cookieCount": 25,
  "cookies": [
    {
      "name": "li_at",
      "value": "AQEDARxxxxxxxx",
      "domain": ".linkedin.com",
      "path": "/",
      "secure": true,
      "httpOnly": true
    }
  ]
}
```

## 🎯 **Use Cases**
- **LinkedIn Automation** - Extract for messaging/networking bots
- **Social Media Management** - Bulk posting across platforms  
- **Web Scraping** - Authenticated data extraction
- **Testing & Development** - Session debugging
- **Account Migration** - Transfer sessions between tools

## 🔒 **Security Features**
- **Read-only access** - Cannot modify or delete cookies
- **No data storage** - Doesn't save cookies in extension
- **Transparent code** - Full source code included
- **Domain-specific** - Can target specific sites only

## 🛠️ **Advanced Features**
- **Session vs Persistent** - Identifies temporary vs saved cookies
- **Domain grouping** - Organizes multi-domain cookie sets
- **Expiration tracking** - Shows which cookies will expire
- **Security flags** - HttpOnly, Secure, SameSite indicators

## ❌ **Troubleshooting**
- **No cookies found**: Login to the website first
- **Extension not working**: Enable Developer mode
- **Outdated cookies**: Re-extract if sessions expire
- **Permission errors**: Check host permissions in manifest

## 🚀 **Testing Instructions for You:**

1. **Install the extension**
2. **Test on LinkedIn**: 
   - Go to linkedin.com, login
   - Extract cookies → should get ~20-30 cookies
3. **Test on Facebook**:
   - Go to facebook.com, login  
   - Extract cookies → should get session data
4. **Test "All Sites"**:
   - Click "Extract All Cookies" → should get cookies from every site

## 🤖 **Next Steps with kkbot:**
1. Extract cookies from LinkedIn (or any site)
2. Send JSON data to kkbot
3. kkbot imports session for automation
4. Automate messaging, posting, data extraction, etc.

**This is now a UNIVERSAL automation tool - not just LinkedIn!** 🌐🚀