# Simple authentication placeholder for SpamShield
# Since we're using local storage and Supabase on frontend, backend doesn't need auth

from functools import wraps
from flask import request, jsonify, g
import logging

logger = logging.getLogger(__name__)

def require_auth(f):
    """
    Placeholder authentication decorator - allows all requests
    Since SpamShield uses local storage, no backend auth needed
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # For now, allow all requests through
        # In production, you might want to add API key validation here
        g.current_user = {'user_id': 'anonymous', 'email': 'anonymous@spamshield.local'}
        g.user_id = 'anonymous'
        
        return f(*args, **kwargs)
    
    return decorated_function

def get_current_user():
    """Get current authenticated user (placeholder)"""
    return getattr(g, 'current_user', {'user_id': 'anonymous', 'email': 'anonymous@spamshield.local'})

def get_current_user_id():
    """Get current authenticated user ID (placeholder)"""
    return getattr(g, 'user_id', 'anonymous')