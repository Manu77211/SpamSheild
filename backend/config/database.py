# Database placeholder - Using local storage instead of MongoDB
# No database connection needed for SpamShield

import logging

logger = logging.getLogger(__name__)

class Database:
    """Simple placeholder for database functionality"""
    
    def __init__(self):
        logger.info("SpamShield using local storage - no database required")
    
    @property
    def client(self):
        return None
    
    @property
    def db(self):
        return None
    
    def get_collection(self, name):
        """Placeholder method"""
        return None
    
    def close_connection(self):
        """Placeholder method"""
        pass

# Initialize database placeholder
db = Database()