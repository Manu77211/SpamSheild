from flask import Flask, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import logging
from datetime import datetime
import os

# Import configurations and routes
from config.settings import config
from config.database import db
from routes.api import api_bp

def create_app(config_name=None):
    """Application factory pattern"""
    
    # Create Flask app
    app = Flask(__name__)
    
    # Load configuration
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')
    
    app.config.from_object(config[config_name])
    
    # Setup logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    logger = logging.getLogger(__name__)
    
    # Setup CORS
    CORS(app, origins=app.config['CORS_ORIGINS'])
    
    # Setup rate limiting
    limiter = Limiter(
        key_func=get_remote_address,
        app=app,
        default_limits=["200 per day", "50 per hour"]
    )
    
    # Register blueprints
    app.register_blueprint(api_bp)
    
    # Global error handlers
    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({
            'error': 'Bad request',
            'code': 'BAD_REQUEST',
            'message': str(error.description)
        }), 400
    
    @app.errorhandler(401)
    def unauthorized(error):
        return jsonify({
            'error': 'Unauthorized',
            'code': 'UNAUTHORIZED',
            'message': 'Authentication required'
        }), 401
    
    @app.errorhandler(403)
    def forbidden(error):
        return jsonify({
            'error': 'Forbidden',
            'code': 'FORBIDDEN',
            'message': 'Access denied'
        }), 403
    
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            'error': 'Not found',
            'code': 'NOT_FOUND',
            'message': 'Resource not found'
        }), 404
    
    @app.errorhandler(429)
    def ratelimit_handler(e):
        return jsonify({
            'error': 'Rate limit exceeded',
            'code': 'RATE_LIMIT_EXCEEDED',
            'message': str(e.description)
        }), 429
    
    @app.errorhandler(500)
    def internal_error(error):
        logger.error(f"Internal server error: {error}")
        return jsonify({
            'error': 'Internal server error',
            'code': 'INTERNAL_ERROR',
            'message': 'Something went wrong on our end'
        }), 500
    
    # Root endpoint
    @app.route('/')
    def index():
        return jsonify({
            'name': 'SpamShield API',
            'version': '1.0.0',
            'status': 'running',
            'timestamp': datetime.utcnow().isoformat(),
            'endpoints': {
                'health': '/api/health',
                'analyze': '/api/analyze',
                'analyze_file': '/api/analyze/file',
                'history': '/api/history',
                'statistics': '/api/statistics',
                'export': '/api/export'
            }
        })
    
    # Health check endpoint
    @app.route('/health')
    def health():
        # Using local JSON storage - no database connection to test
        return jsonify({
            'status': 'healthy',
            'timestamp': datetime.utcnow().isoformat(),
            'storage': 'local_json_files',
            'environment': config_name
        })
    
    # Startup tasks
    def startup():
        logger.info("SpamShield API starting up...")
        logger.info(f"Environment: {config_name}")
        logger.info(f"Debug mode: {app.config['DEBUG']}")
        
        # Database setup - using local JSON files, no indexes needed
        logger.info("Using local JSON file storage - no database indexes required")
    
    # Call startup function
    with app.app_context():
        startup()
    
    # Cleanup on shutdown
    @app.teardown_appcontext
    def cleanup(error):
        if error:
            logger.error(f"Request error: {error}")
    
    logger.info("SpamShield API initialized successfully")
    return app

# Create app instance
app = create_app()

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
    
    print(f"🚀 Starting SpamShield API on port {port}")
    print(f"🔧 Debug mode: {debug}")
    print(f"🌐 Access the API at: http://localhost:{port}")
    print(f"📊 Health check: http://localhost:{port}/health")
    
    app.run(host='0.0.0.0', port=port, debug=debug)