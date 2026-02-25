#!/usr/bin/env python3
"""
Cookie Extraction Validator
Tests the JSON format from the Universal Cookie Extractor
"""

import json
import sys
from datetime import datetime

def validate_cookie_data(json_data):
    """Validate the structure of extracted cookie data"""
    
    try:
        data = json.loads(json_data)
    except json.JSONDecodeError as e:
        return False, f"Invalid JSON: {e}"
    
    # Check required fields
    required_fields = ['timestamp', 'extractionType', 'cookieCount']
    for field in required_fields:
        if field not in data:
            return False, f"Missing required field: {field}"
    
    # Validate extraction type
    valid_types = ['current_site', 'all_sites', 'selected_cookies']
    if data['extractionType'] not in valid_types:
        return False, f"Invalid extractionType: {data['extractionType']}"
    
    # Check cookies structure
    if 'cookies' in data:
        cookies = data['cookies']
        if not isinstance(cookies, list):
            return False, "Cookies must be a list"
        
        for i, cookie in enumerate(cookies):
            required_cookie_fields = ['name', 'value', 'domain']
            for field in required_cookie_fields:
                if field not in cookie:
                    return False, f"Cookie {i} missing field: {field}"
    
    elif 'cookiesByDomain' in data:
        # All sites format
        domains = data['cookiesByDomain']
        if not isinstance(domains, dict):
            return False, "cookiesByDomain must be an object"
    
    else:
        return False, "Missing cookies or cookiesByDomain"
    
    return True, "Valid cookie data format"

def print_cookie_summary(json_data):
    """Print a summary of the extracted cookies"""
    
    data = json.loads(json_data)
    
    print(f"🍪 Cookie Extraction Summary")
    print(f"=" * 40)
    print(f"Timestamp: {data['timestamp']}")
    print(f"Extraction Type: {data['extractionType']}")
    print(f"Total Cookies: {data['cookieCount']}")
    
    if data['extractionType'] in ['current_site', 'selected_cookies']:
        print(f"Domain: {data.get('domain', 'Unknown')}")
        print(f"Current URL: {data.get('currentUrl', 'Unknown')}")
        
        if data['extractionType'] == 'selected_cookies':
            print(f"Total Available: {data.get('totalAvailable', 'Unknown')}")
            print(f"Selected Count: {data.get('selectedCount', 'Unknown')}")
        
        cookies = data['cookies']
        print(f"\n📋 Cookie List:")
        for i, cookie in enumerate(cookies[:10]):  # Show first 10
            secure = "🔒" if cookie.get('secure') else "🔓"
            http_only = "🚫JS" if cookie.get('httpOnly') else "✅JS"
            session = "⏱️" if cookie.get('session') else "💾"
            
            print(f"  {i+1:2d}. {cookie['name'][:20]:20} {secure} {http_only} {session}")
        
        if len(cookies) > 10:
            print(f"     ... and {len(cookies) - 10} more cookies")
    
    elif data['extractionType'] == 'all_sites':
        print(f"Domain Count: {data.get('domainCount', 0)}")
        
        domains = data.get('domains', [])
        print(f"\n🌐 Domains with Cookies:")
        for i, domain in enumerate(domains[:15]):  # Show first 15
            cookie_count = len(data['cookiesByDomain'][domain])
            print(f"  {i+1:2d}. {domain:30} ({cookie_count} cookies)")
        
        if len(domains) > 15:
            print(f"     ... and {len(domains) - 15} more domains")

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 test-cookie-parser.py '<json_data>'")
        print("Example: python3 test-cookie-parser.py '{\"timestamp\":\"...\"}'")
        return
    
    json_data = sys.argv[1]
    
    # Validate format
    is_valid, message = validate_cookie_data(json_data)
    
    if is_valid:
        print("✅", message)
        print_cookie_summary(json_data)
    else:
        print("❌", message)
        return 1
    
    return 0

if __name__ == '__main__':
    exit(main())