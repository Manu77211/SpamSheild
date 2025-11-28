#!/usr/bin/env python3
"""
SpamShield Backend API Test Suite
Tests all endpoints without requiring frontend
"""

import requests
import json
import time
from datetime import datetime

# Configuration
BASE_URL = "http://localhost:5000"
HEADERS = {
    "Content-Type": "application/json",
    "User-Agent": "SpamShield-Test-Suite/1.0"
}

# Mock Clerk JWT token for testing (this won't work with real auth, just for structure testing)
MOCK_AUTH_TOKEN = "Bearer mock-jwt-token-for-testing"
AUTH_HEADERS = {**HEADERS, "Authorization": MOCK_AUTH_TOKEN}

def print_test_header(test_name):
    """Print formatted test header"""
    print(f"\n{'='*60}")
    print(f"🧪 TESTING: {test_name}")
    print(f"{'='*60}")

def print_result(endpoint, status_code, response_data, expected_status=200):
    """Print test result in formatted way"""
    status_emoji = "✅" if status_code == expected_status else "❌"
    print(f"\n{status_emoji} {endpoint}")
    print(f"   Status: {status_code} (expected: {expected_status})")
    
    if isinstance(response_data, dict):
        # Pretty print JSON
        print("   Response:")
        for key, value in response_data.items():
            if isinstance(value, dict) and len(str(value)) > 100:
                print(f"     {key}: {type(value).__name__} (truncated)")
            elif isinstance(value, list) and len(str(value)) > 100:
                print(f"     {key}: [{len(value)} items]")
            else:
                print(f"     {key}: {value}")
    else:
        print(f"   Response: {response_data}")

def test_basic_endpoints():
    """Test basic endpoints that don't require auth"""
    print_test_header("BASIC ENDPOINTS")
    
    # Test root endpoint
    try:
        response = requests.get(f"{BASE_URL}/")
        print_result("GET /", response.status_code, response.json())
    except Exception as e:
        print(f"❌ GET / - Error: {e}")
    
    # Test health endpoint
    try:
        response = requests.get(f"{BASE_URL}/health")
        print_result("GET /health", response.status_code, response.json())
    except Exception as e:
        print(f"❌ GET /health - Error: {e}")
    
    # Test API health
    try:
        response = requests.get(f"{BASE_URL}/api/health")
        print_result("GET /api/health", response.status_code, response.json())
    except Exception as e:
        print(f"❌ GET /api/health - Error: {e}")

def test_analyze_endpoint_no_auth():
    """Test analyze endpoint without authentication (should fail)"""
    print_test_header("ANALYZE ENDPOINT - NO AUTH")
    
    test_messages = [
        "Hello, how are you today?",
        "FREE MONEY! Click here to win $1000 NOW!!!",
        "Your account has been suspended. Click here to verify: http://fake-bank.com"
    ]
    
    for i, message in enumerate(test_messages, 1):
        try:
            payload = {"content": message}
            response = requests.post(f"{BASE_URL}/api/analyze", json=payload, headers=HEADERS)
            print_result(f"POST /api/analyze (Test {i})", response.status_code, 
                        response.json() if response.headers.get('content-type') == 'application/json' else response.text, 
                        expected_status=401)
        except Exception as e:
            print(f"❌ POST /api/analyze (Test {i}) - Error: {e}")

def test_spam_detection_algorithm():
    """Test spam detection algorithm directly (without API auth)"""
    print_test_header("SPAM DETECTION ALGORITHM")
    
    # We'll test this by importing the spam detector directly
    test_messages = [
        {
            "content": "Hello, how are you today?",
            "expected": "safe"
        },
        {
            "content": "FREE MONEY! Click here to win $1000 NOW!!! URGENT!!!",
            "expected": "spam"
        },
        {
            "content": "Your account has been suspended. Please verify immediately.",
            "expected": "suspicious"
        },
        {
            "content": "WINNER! You've won a lottery! Call 1-800-SCAM-NOW to claim your prize!",
            "expected": "spam"
        },
        {
            "content": "Hi, I'm writing from overseas. I'm a widow with inheritance money...",
            "expected": "spam"
        }
    ]
    
    # Import and test spam detector directly
    import sys
    sys.path.append('.')
    try:
        from services.spam_detection import spam_detector
        
        for i, test_case in enumerate(test_messages, 1):
            result = spam_detector.analyze_message(test_case["content"])
            classification = result["classification"]
            risk_score = result["risk_score"]
            threats = result["threats_detected"]
            
            status_emoji = "✅" if classification == test_case["expected"] else "⚠️"
            print(f"\n{status_emoji} Test {i}: {test_case['expected'].upper()} Message")
            print(f"   Content: {test_case['content'][:60]}...")
            print(f"   Classification: {classification} (expected: {test_case['expected']})")
            print(f"   Risk Score: {risk_score}/100")
            print(f"   Confidence: {result['confidence']}")
            print(f"   Threats: {', '.join(threats) if threats else 'None'}")
            print(f"   Recommendations: {len(result['recommendations'])} provided")
            
    except ImportError as e:
        print(f"❌ Could not import spam detector: {e}")
    except Exception as e:
        print(f"❌ Error testing spam detector: {e}")

def test_database_connection():
    """Test database connection directly"""
    print_test_header("DATABASE CONNECTION")
    
    try:
        import sys
        sys.path.append('.')
        from config.database import db
        
        # Test basic connection
        result = db.client.admin.command('ping')
        print("✅ Database Connection")
        print(f"   Status: Connected")
        print(f"   Response: {result}")
        
        # Test collections
        collections = db.db.list_collection_names()
        print(f"   Collections: {collections}")
        
        # Test collection access
        users_count = db.get_collection('users').count_documents({})
        messages_count = db.get_collection('messages').count_documents({})
        stats_count = db.get_collection('statistics').count_documents({})
        
        print(f"   Users: {users_count} documents")
        print(f"   Messages: {messages_count} documents")
        print(f"   Statistics: {stats_count} documents")
        
    except Exception as e:
        print(f"❌ Database Connection Error: {e}")

def test_error_handling():
    """Test various error scenarios"""
    print_test_header("ERROR HANDLING")
    
    # Test 404 endpoint
    try:
        response = requests.get(f"{BASE_URL}/nonexistent-endpoint")
        print_result("GET /nonexistent-endpoint", response.status_code, 
                    response.json() if response.headers.get('content-type') == 'application/json' else response.text,
                    expected_status=404)
    except Exception as e:
        print(f"❌ 404 Test - Error: {e}")
    
    # Test invalid JSON
    try:
        response = requests.post(f"{BASE_URL}/api/analyze", 
                               data="invalid json", 
                               headers={"Content-Type": "application/json"})
        print_result("POST /api/analyze (Invalid JSON)", response.status_code,
                    response.json() if response.headers.get('content-type') == 'application/json' else response.text,
                    expected_status=400)
    except Exception as e:
        print(f"❌ Invalid JSON Test - Error: {e}")

def test_rate_limiting():
    """Test rate limiting functionality"""
    print_test_header("RATE LIMITING")
    
    print("🚀 Sending multiple requests to test rate limiting...")
    
    for i in range(5):
        try:
            response = requests.get(f"{BASE_URL}/api/health")
            print(f"   Request {i+1}: {response.status_code} - {response.json().get('status', 'Unknown')}")
        except Exception as e:
            print(f"   Request {i+1}: Error - {e}")
        
        time.sleep(0.1)  # Small delay

def create_test_files():
    """Create test files for file upload testing"""
    print_test_header("CREATING TEST FILES")
    
    # Create test text file
    with open('test_message.txt', 'w') as f:
        f.write("FREE MONEY! Click here to claim your $1000 prize! URGENT!")
    print("✅ Created test_message.txt")
    
    # Create test CSV file
    with open('test_messages.csv', 'w') as f:
        f.write("Hello, how are you?\n")
        f.write("FREE MONEY! Click now!\n")
        f.write("Your account is suspended. Verify now!\n")
        f.write("Meeting at 3pm tomorrow\n")
        f.write("WINNER! Call 1-800-SCAM!\n")
    print("✅ Created test_messages.csv")

def main():
    """Run all tests"""
    print("🛡️  SPAMSHIELD BACKEND TEST SUITE")
    print(f"📅 Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"🔗 Base URL: {BASE_URL}")
    
    # Check if server is running
    try:
        response = requests.get(BASE_URL, timeout=5)
        print("✅ Server is running!")
    except requests.exceptions.ConnectionError:
        print("❌ Server is not running! Start the backend first:")
        print("   cd backend && python app.py")
        return
    except Exception as e:
        print(f"❌ Server check failed: {e}")
        return
    
    # Run all tests
    test_basic_endpoints()
    test_analyze_endpoint_no_auth()
    test_spam_detection_algorithm()
    test_database_connection()
    test_error_handling()
    test_rate_limiting()
    create_test_files()
    
    print(f"\n{'='*60}")
    print("🎉 ALL TESTS COMPLETED!")
    print(f"📅 Finished at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{'='*60}")
    print("\n📝 NEXT STEPS:")
    print("1. Review test results above")
    print("2. Fix any issues found")
    print("3. Test with real authentication tokens")
    print("4. Connect frontend to backend")

if __name__ == "__main__":
    main()