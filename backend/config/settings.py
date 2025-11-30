import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Flask Configuration
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    DEBUG = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
    
    # Google AI Configuration
    GOOGLE_AI_API_KEY = os.getenv('GOOGLE_AI_API_KEY')
    
    # Security
    JWT_SECRET = os.getenv('JWT_SECRET', 'jwt-secret-key')
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE = int(os.getenv('RATE_LIMIT_PER_MINUTE', 60))
    RATE_LIMIT_PER_HOUR = int(os.getenv('RATE_LIMIT_PER_HOUR', 1000))
    
    # File Upload
    MAX_CONTENT_LENGTH = int(os.getenv('MAX_CONTENT_LENGTH', 16777216))  # 16MB
    ALLOWED_EXTENSIONS = set(os.getenv('ALLOWED_EXTENSIONS', 'txt,csv').split(','))
    
    # CORS
    CORS_ORIGINS = [
        "http://localhost:5173", 
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "https://spam-sheild.vercel.app"
    ]

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}