from flask import Blueprint, request, jsonify, g
from utils.auth import require_auth, get_current_user_id
from utils.database_service import database_service
from services.spam_detection import spam_detector
from werkzeug.utils import secure_filename
import logging
import os

logger = logging.getLogger(__name__)

# Create blueprint
api_bp = Blueprint('api', __name__, url_prefix='/api')

@api_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'SpamShield API is running',
        'timestamp': spam_detector._create_result(0, 'safe', 1.0, [], {})['analyzed_at']
    })

@api_bp.route('/analyze', methods=['POST'])
@require_auth
def analyze_message():
    """Analyze message for spam"""
    try:
        user_id = get_current_user_id()
        data = request.get_json()
        
        if not data or 'content' not in data:
            return jsonify({
                'error': 'Message content is required',
                'code': 'MISSING_CONTENT'
            }), 400
        
        content = data.get('content', '').strip()
        if not content:
            return jsonify({
                'error': 'Message content cannot be empty',
                'code': 'EMPTY_CONTENT'
            }), 400
        
        if len(content) > 5000:  # Limit message length
            return jsonify({
                'error': 'Message too long (max 5000 characters)',
                'code': 'MESSAGE_TOO_LONG'
            }), 400
        
        # Analyze the message
        analysis_result = spam_detector.analyze_message(content, user_id)
        
        # Save to database
        ip_address = request.environ.get('HTTP_X_FORWARDED_FOR', request.environ.get('REMOTE_ADDR'))
        user_agent = request.headers.get('User-Agent')
        
        saved_message = database_service.save_message_analysis(
            user_id=user_id,
            content=content,
            analysis_result=analysis_result,
            ip_address=ip_address,
            user_agent=user_agent
        )
        
        return jsonify({
            'success': True,
            'message_id': saved_message.get('_id'),
            'analysis': analysis_result
        })
        
    except Exception as e:
        logger.error(f"Error analyzing message: {e}")
        return jsonify({
            'error': 'Failed to analyze message',
            'code': 'ANALYSIS_ERROR',
            'details': str(e)
        }), 500

@api_bp.route('/analyze/file', methods=['POST'])
@require_auth
def analyze_file():
    """Analyze uploaded file for spam content"""
    try:
        user_id = get_current_user_id()
        
        if 'file' not in request.files:
            return jsonify({
                'error': 'No file provided',
                'code': 'NO_FILE'
            }), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({
                'error': 'No file selected',
                'code': 'NO_FILE_SELECTED'
            }), 400
        
        # Check file extension
        if not file.filename.lower().endswith(('.txt', '.csv')):
            return jsonify({
                'error': 'Only .txt and .csv files are supported',
                'code': 'INVALID_FILE_TYPE'
            }), 400
        
        # Read file content
        try:
            content = file.read().decode('utf-8')
        except UnicodeDecodeError:
            return jsonify({
                'error': 'File encoding not supported (use UTF-8)',
                'code': 'ENCODING_ERROR'
            }), 400
        
        if len(content) > 10000:  # Limit file size
            return jsonify({
                'error': 'File too large (max 10KB)',
                'code': 'FILE_TOO_LARGE'
            }), 400
        
        # For CSV files, analyze each line separately
        if file.filename.lower().endswith('.csv'):
            lines = content.split('\n')
            results = []
            
            for i, line in enumerate(lines[:50]):  # Limit to 50 lines
                if line.strip():
                    analysis = spam_detector.analyze_message(line.strip(), user_id)
                    results.append({
                        'line_number': i + 1,
                        'content': line.strip()[:100] + ('...' if len(line) > 100 else ''),
                        'analysis': analysis
                    })
                    
                    # Save each line to database
                    database_service.save_message_analysis(
                        user_id=user_id,
                        content=line.strip(),
                        analysis_result=analysis,
                        ip_address=request.environ.get('HTTP_X_FORWARDED_FOR', request.environ.get('REMOTE_ADDR')),
                        user_agent=f"File Upload: {file.filename}"
                    )
            
            return jsonify({
                'success': True,
                'file_type': 'csv',
                'lines_processed': len(results),
                'results': results
            })
        
        else:
            # Analyze entire text file
            analysis_result = spam_detector.analyze_message(content, user_id)
            
            saved_message = database_service.save_message_analysis(
                user_id=user_id,
                content=content,
                analysis_result=analysis_result,
                ip_address=request.environ.get('HTTP_X_FORWARDED_FOR', request.environ.get('REMOTE_ADDR')),
                user_agent=f"File Upload: {file.filename}"
            )
            
            return jsonify({
                'success': True,
                'file_type': 'text',
                'message_id': saved_message.get('_id'),
                'analysis': analysis_result
            })
        
    except Exception as e:
        logger.error(f"Error analyzing file: {e}")
        return jsonify({
            'error': 'Failed to analyze file',
            'code': 'FILE_ANALYSIS_ERROR',
            'details': str(e)
        }), 500

@api_bp.route('/history', methods=['GET'])
@require_auth
def get_history():
    """Get user's message analysis history"""
    try:
        user_id = get_current_user_id()
        
        # Get query parameters
        page = int(request.args.get('page', 1))
        per_page = min(int(request.args.get('per_page', 20)), 100)  # Max 100 per page
        classification = request.args.get('classification')  # spam, safe, suspicious
        
        skip = (page - 1) * per_page
        
        # Get messages
        messages = database_service.get_user_messages(
            user_id=user_id,
            limit=per_page,
            skip=skip,
            classification=classification
        )
        
        # Get total count for pagination
        total_count = database_service.get_message_count(user_id, classification)
        total_pages = (total_count + per_page - 1) // per_page
        
        return jsonify({
            'success': True,
            'messages': messages,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total_count': total_count,
                'total_pages': total_pages,
                'has_next': page < total_pages,
                'has_prev': page > 1
            }
        })
        
    except Exception as e:
        logger.error(f"Error getting history: {e}")
        return jsonify({
            'error': 'Failed to get message history',
            'code': 'HISTORY_ERROR',
            'details': str(e)
        }), 500

@api_bp.route('/history/<message_id>', methods=['DELETE'])
@require_auth
def delete_message(message_id):
    """Delete a specific message from history"""
    try:
        user_id = get_current_user_id()
        
        success = database_service.delete_message(user_id, message_id)
        
        if success:
            return jsonify({
                'success': True,
                'message': 'Message deleted successfully'
            })
        else:
            return jsonify({
                'error': 'Message not found or access denied',
                'code': 'MESSAGE_NOT_FOUND'
            }), 404
        
    except Exception as e:
        logger.error(f"Error deleting message: {e}")
        return jsonify({
            'error': 'Failed to delete message',
            'code': 'DELETE_ERROR',
            'details': str(e)
        }), 500

@api_bp.route('/statistics', methods=['GET'])
@require_auth
def get_statistics():
    """Get user's spam detection statistics"""
    try:
        user_id = get_current_user_id()
        
        # Get user statistics
        stats = database_service.get_user_statistics(user_id)
        
        # Get recent activity
        recent_activity = database_service.get_recent_activity(user_id, 30)
        
        return jsonify({
            'success': True,
            'statistics': stats,
            'recent_activity': recent_activity
        })
        
    except Exception as e:
        logger.error(f"Error getting statistics: {e}")
        return jsonify({
            'error': 'Failed to get statistics',
            'code': 'STATISTICS_ERROR',
            'details': str(e)
        }), 500

@api_bp.route('/export', methods=['POST'])
@require_auth
def export_data():
    """Export user data as PDF or CSV"""
    try:
        user_id = get_current_user_id()
        data = request.get_json()
        
        export_format = data.get('format', 'pdf').lower()
        if export_format not in ['pdf', 'csv']:
            return jsonify({
                'error': 'Invalid export format (use pdf or csv)',
                'code': 'INVALID_FORMAT'
            }), 400
        
        # Get data to export
        messages = database_service.get_user_messages(user_id, limit=1000)  # Last 1000 messages
        stats = database_service.get_user_statistics(user_id)
        
        if export_format == 'csv':
            # Create CSV content
            import csv
            import io
            
            output = io.StringIO()
            writer = csv.writer(output)
            
            # Write header
            writer.writerow([
                'Date', 'Message Content', 'Risk Score', 'Classification', 
                'Confidence', 'Threats Detected', 'Recommendations'
            ])
            
            # Write data
            for message in messages:
                writer.writerow([
                    message.get('analyzed_at', ''),
                    message.get('content', '')[:100] + ('...' if len(message.get('content', '')) > 100 else ''),
                    message.get('risk_score', 0),
                    message.get('classification', ''),
                    f"{message.get('confidence', 0):.2f}",
                    ', '.join(message.get('threats_detected', [])),
                    '; '.join(message.get('analysis_details', {}).get('recommendations', []))
                ])
            
            csv_content = output.getvalue()
            output.close()
            
            return jsonify({
                'success': True,
                'format': 'csv',
                'content': csv_content,
                'filename': f'spamshield_export_{user_id[:8]}.csv'
            })
        
        else:  # PDF format
            # For now, return a simple text-based PDF content
            # In a full implementation, you'd use reportlab or similar
            pdf_content = f"""
SpamShield Analysis Report
User ID: {user_id}
Generated: {stats.get('last_updated', 'Unknown')}

=== SUMMARY ===
Total Messages Analyzed: {stats.get('total_messages', 0)}
Spam Messages: {stats.get('spam_count', 0)}
Safe Messages: {stats.get('safe_count', 0)}
Suspicious Messages: {stats.get('suspicious_count', 0)}

=== RECENT MESSAGES ===
"""
            
            for i, message in enumerate(messages[:20], 1):
                pdf_content += f"""
{i}. [{message.get('classification', '').upper()}] Risk: {message.get('risk_score', 0)}/100
   Date: {message.get('analyzed_at', 'Unknown')}
   Content: {message.get('content', '')[:200]}...
   Threats: {', '.join(message.get('threats_detected', []))}
"""
            
            return jsonify({
                'success': True,
                'format': 'pdf',
                'content': pdf_content,
                'filename': f'spamshield_report_{user_id[:8]}.pdf'
            })
        
    except Exception as e:
        logger.error(f"Error exporting data: {e}")
        return jsonify({
            'error': 'Failed to export data',
            'code': 'EXPORT_ERROR',
            'details': str(e)
        }), 500