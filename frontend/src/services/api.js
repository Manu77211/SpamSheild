// API Service for SpamShield Backend
// Handles all communication with Flask backend at localhost:5000

const API_BASE_URL = 'http://localhost:5000';

class SpamShieldAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.getToken = null; // Will be set by auth hook
  }

  // Set the auth token getter function
  setAuthTokenGetter(tokenGetter) {
    this.getToken = tokenGetter;
  }

  // Get auth headers with Clerk token
  async getAuthHeaders() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // Add authorization header if token getter is available
    if (this.getToken) {
      try {
        const token = await this.getToken();
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        console.warn('Failed to get auth token:', error);
      }
    }

    return headers;
  }

  // Test backend connection
  async testConnection() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      const data = await response.json();
      return {
        success: response.ok,
        data,
        status: response.status
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: 0
      };
    }
  }

  // Test API health
  async testAPIHealth() {
    try {
      const response = await fetch(`${this.baseURL}/api/health`);
      const data = await response.json();
      return {
        success: response.ok,
        data,
        status: response.status
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: 0
      };
    }
  }

  // Analyze message (will need auth later)
  async analyzeMessage(content) {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseURL}/api/analyze`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ content })
      });
      
      const data = await response.json();
      return {
        success: response.ok,
        data,
        status: response.status
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: 0
      };
    }
  }

  // Analyze file upload
  async analyzeFile(file) {
    try {
      const headers = await this.getAuthHeaders();
      // Remove Content-Type for FormData (browser will set it with boundary)
      delete headers['Content-Type'];
      
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${this.baseURL}/api/analyze/file`, {
        method: 'POST',
        headers,
        body: formData
      });
      
      const data = await response.json();
      return {
        success: response.ok,
        data,
        status: response.status
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: 0
      };
    }
  }

  // Get user statistics
  async getUserStatistics() {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseURL}/api/statistics`, {
        method: 'GET',
        headers
      });
      
      const data = await response.json();
      return {
        success: response.ok,
        data,
        status: response.status
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: 0
      };
    }
  }

  // Get user history
  async getUserHistory() {
    try {
      const headers = await this.getAuthHeaders();
      const response = await fetch(`${this.baseURL}/api/history`, {
        method: 'GET',
        headers
      });
      
      const data = await response.json();
      return {
        success: response.ok,
        data,
        status: response.status
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: 0
      };
    }
  }
}

// Create singleton instance
const apiService = new SpamShieldAPI();

// Export the service
export default apiService;

// Export individual methods for easy importing
export const {
  testConnection,
  testAPIHealth,
  analyzeMessage
} = apiService;