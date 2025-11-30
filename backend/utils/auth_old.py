import jwt
from functools import wraps
from flask import request, jsonify, g
from config.settings import Config
import logging

logger = logging.getLogger(__name__)

class SimpleAuth:
    """Simple authentication handler for SpamShield"""
    
    def __init__(self):
        self.jwt_secret = Config.JWT_SECRET
    
    def verify_token(self, token: str) -> dict:
        """
        Verify Clerk JWT token
        
        Args:
            token: JWT token from Authorization header
            
        Returns:
            Dict containing user information
        """
        try:
            if not token:
                raise ValueError("No token provided")
            
            # Remove 'Bearer ' prefix if present
            if token.startswith('Bearer '):
                token = token[7:]
            
            # For development, we can decode without verification
            # In production, you should verify the signature properly
            decoded = jwt.decode(
                token, 
                options={"verify_signature": False}  # For development only
            )
            
            return {
                'user_id': decoded.get('sub'),
                'email': decoded.get('email'),
                'session_id': decoded.get('sid'),
                'is_authenticated': True
            }
            
        except jwt.ExpiredSignatureError:
            raise ValueError("Token has expired")
        except jwt.InvalidTokenError:
            raise ValueError("Invalid token")
        except Exception as e:
            logger.error(f"Token verification failed: {e}")
            raise ValueError(f"Token verification failed: {str(e)}")
    
    def get_user_info(self, user_id: str) -> dict:
        """
        Get user information from Clerk API
        
        Args:
            user_id: Clerk user ID
            
        Returns:
            Dict containing user details
        """
        try:
            headers = {
                'Authorization': f'Bearer {self.clerk_secret_key}',
                'Content-Type': 'application/json'
            }
            
            url = f"https://api.clerk.com/v1/users/{user_id}"
            response = requests.get(url, headers=headers)
            
            if response.status_code == 200:
                return response.json()
            else:
                logger.error(f"Failed to fetch user info: {response.status_code}")
                return None
                
        except Exception as e:
            logger.error(f"Error fetching user info: {e}")
            return None

# Global auth instance
clerk_auth = ClerkAuth()

def require_auth(f):
    """
    Decorator to require authentication for routes
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            # Get token from Authorization header
            auth_header = request.headers.get('Authorization')
            if not auth_header:
                return jsonify({
                    'error': 'No authorization header provided',
                    'code': 'UNAUTHORIZED'
                }), 401
            
            # Verify token
            user_info = clerk_auth.verify_token(auth_header)
            
            # Store user info in Flask's g object
            g.current_user = user_info
            g.user_id = user_info['user_id']
            
            return f(*args, **kwargs)
            
        except ValueError as e:
            return jsonify({
                'error': str(e),
                'code': 'INVALID_TOKEN'
            }), 401
        except Exception as e:
            logger.error(f"Authentication error: {e}")
            return jsonify({
                'error': 'Authentication failed',
                'code': 'AUTH_ERROR'
            }), 500
    
    return decorated_function

def get_current_user():
    """Get current authenticated user"""
    return getattr(g, 'current_user', None)

def get_current_user_id():
    """Get current authenticated user ID"""
    return getattr(g, 'user_id', None)