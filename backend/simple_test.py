import requests
import json

print("🛡️  SPAMSHIELD BACKEND TEST")
print("🔗 Testing server at http://localhost:5000\n")

# Test 1: Health Check
print("=== HEALTH CHECK ===")
try:
    response = requests.get("http://localhost:5000/health")
    print(f"✅ Health Check: {response.status_code}")
    data = response.json()
    print(f"Status: {data.get('status')}")
    print(f"Database: {data.get('database')}")
    print(f"Environment: {data.get('environment')}")
except Exception as e:
    print(f"❌ Health Check failed: {e}")

print("\n" + "="*50)

# Test 2: API Health
print("=== API HEALTH CHECK ===")
try:
    response = requests.get("http://localhost:5000/api/health")
    print(f"✅ API Health: {response.status_code}")
    data = response.json()
    print(f"Status: {data.get('status')}")
    print(f"Message: {data.get('message')}")
except Exception as e:
    print(f"❌ API Health failed: {e}")

print("\n" + "="*50)

# Test 3: Root Endpoint
print("=== ROOT ENDPOINT ===")
try:
    response = requests.get("http://localhost:5000/")
    print(f"✅ Root endpoint: {response.status_code}")
    data = response.json()
    print(f"Name: {data.get('name')}")
    print(f"Version: {data.get('version')}")
    print(f"Status: {data.get('status')}")
    print(f"Available endpoints: {list(data.get('endpoints', {}).keys())}")
except Exception as e:
    print(f"❌ Root endpoint failed: {e}")

print("\n" + "="*50)

# Test 4: Unauthorized Access (should fail with 401)
print("=== UNAUTHORIZED ACCESS TEST ===")
try:
    response = requests.post("http://localhost:5000/api/analyze", json={"content": "Hello"})
    print(f"✅ Analyze endpoint (no auth): {response.status_code}")
    if response.status_code == 401:
        print("✅ Correctly blocked unauthorized access")
        data = response.json()
        print(f"Error: {data.get('error')}")
        print(f"Code: {data.get('code')}")
    else:
        print("⚠️  Expected 401 Unauthorized")
except Exception as e:
    print(f"❌ Unauthorized test failed: {e}")

print("\n" + "="*50)
print("🎉 BASIC TESTS COMPLETED!")