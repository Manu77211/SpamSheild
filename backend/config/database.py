from pymongo import MongoClient
from config.settings import Config
import logging

logger = logging.getLogger(__name__)

class Database:
    _instance = None
    _client = None
    _db = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Database, cls).__new__(cls)
            cls._instance._initialize()
        return cls._instance
    
    def _initialize(self):
        """Initialize MongoDB connection"""
        try:
            self._client = MongoClient(Config.MONGODB_URI)
            self._db = self._client[Config.DATABASE_NAME]
            
            # Test connection
            self._client.admin.command('ping')
            logger.info("Successfully connected to MongoDB")
            
        except Exception as e:
            logger.error(f"Failed to connect to MongoDB: {e}")
            # Don't raise the error - let the app start without DB
            logger.warning("App starting without MongoDB connection")
            self._client = None
            self._db = None
    
    @property
    def client(self):
        return self._client
    
    @property
    def db(self):
        return self._db
    
    def get_collection(self, name):
        """Get a specific collection"""
        return self._db[name]
    
    def close_connection(self):
        """Close database connection"""
        if self._client:
            self._client.close()
            logger.info("Database connection closed")

# Global database instance
db = Database()