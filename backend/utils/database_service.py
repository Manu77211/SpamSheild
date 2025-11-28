from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional
from bson import ObjectId
from config.database import db
from models.models import User, Message, Statistics
import logging

logger = logging.getLogger(__name__)

class DatabaseService:
    """Database operations service"""
    
    def __init__(self):
        self.users_collection = db.get_collection('users')
        self.messages_collection = db.get_collection('messages')
        self.statistics_collection = db.get_collection('statistics')
    
    # User Operations
    def create_or_get_user(self, clerk_user_id: str, email: str = None) -> Dict[str, Any]:
        """Create or retrieve user"""
        try:
            user = self.users_collection.find_one({'clerk_user_id': clerk_user_id})
            
            if user:
                return User.from_dict(user).to_dict()
            
            # Create new user
            new_user = User(clerk_user_id=clerk_user_id, email=email)
            result = self.users_collection.insert_one(new_user.to_dict())
            
            new_user._id = result.inserted_id
            return new_user.to_dict()
            
        except Exception as e:
            logger.error(f"Error creating/getting user: {e}")
            raise
    
    def update_user(self, clerk_user_id: str, update_data: Dict[str, Any]) -> bool:
        """Update user information"""
        try:
            update_data['updated_at'] = datetime.utcnow()
            result = self.users_collection.update_one(
                {'clerk_user_id': clerk_user_id},
                {'$set': update_data}
            )
            return result.modified_count > 0
        except Exception as e:
            logger.error(f"Error updating user: {e}")
            return False
    
    # Message Operations
    def save_message_analysis(self, user_id: str, content: str, analysis_result: Dict[str, Any], 
                            ip_address: str = None, user_agent: str = None) -> Dict[str, Any]:
        """Save message analysis to database"""
        try:
            message = Message(
                user_id=user_id,
                content=content,
                risk_score=analysis_result.get('risk_score', 0),
                classification=analysis_result.get('classification', 'unknown'),
                confidence=analysis_result.get('confidence', 0.0),
                threats_detected=analysis_result.get('threats_detected', []),
                analysis_details=analysis_result.get('analysis_details', {}),
                ip_address=ip_address,
                user_agent=user_agent
            )
            
            result = self.messages_collection.insert_one(message.to_dict())
            message._id = result.inserted_id
            
            # Update user statistics
            self.update_user_statistics(user_id, analysis_result.get('classification'))
            
            return message.to_dict()
            
        except Exception as e:
            logger.error(f"Error saving message analysis: {e}")
            raise
    
    def get_user_messages(self, user_id: str, limit: int = 50, skip: int = 0, 
                         classification: str = None) -> List[Dict[str, Any]]:
        """Get user's message history"""
        try:
            query = {'user_id': user_id}
            if classification:
                query['classification'] = classification
            
            cursor = self.messages_collection.find(query).sort('analyzed_at', -1).skip(skip).limit(limit)
            messages = []
            
            for doc in cursor:
                message = Message.from_dict(doc)
                messages.append(message.to_dict())
            
            return messages
            
        except Exception as e:
            logger.error(f"Error getting user messages: {e}")
            return []
    
    def delete_message(self, user_id: str, message_id: str) -> bool:
        """Delete a specific message"""
        try:
            result = self.messages_collection.delete_one({
                '_id': ObjectId(message_id),
                'user_id': user_id
            })
            return result.deleted_count > 0
        except Exception as e:
            logger.error(f"Error deleting message: {e}")
            return False
    
    def get_message_count(self, user_id: str, classification: str = None) -> int:
        """Get count of user's messages"""
        try:
            query = {'user_id': user_id}
            if classification:
                query['classification'] = classification
            return self.messages_collection.count_documents(query)
        except Exception as e:
            logger.error(f"Error getting message count: {e}")
            return 0
    
    # Statistics Operations
    def update_user_statistics(self, user_id: str, classification: str):
        """Update user statistics after message analysis"""
        try:
            stats = self.statistics_collection.find_one({'user_id': user_id})
            
            if not stats:
                # Create new statistics record
                stats = Statistics(user_id=user_id).to_dict()
            
            # Update totals
            stats['total_messages'] = stats.get('total_messages', 0) + 1
            
            if classification == 'spam':
                stats['spam_count'] = stats.get('spam_count', 0) + 1
            elif classification == 'safe':
                stats['safe_count'] = stats.get('safe_count', 0) + 1
            elif classification == 'suspicious':
                stats['suspicious_count'] = stats.get('suspicious_count', 0) + 1
            
            # Update daily stats
            today = datetime.utcnow().date().isoformat()
            daily_stats = stats.get('daily_stats', {})
            if today not in daily_stats:
                daily_stats[today] = {'total': 0, 'spam': 0, 'safe': 0, 'suspicious': 0}
            
            daily_stats[today]['total'] += 1
            daily_stats[today][classification] = daily_stats[today].get(classification, 0) + 1
            stats['daily_stats'] = daily_stats
            
            # Update monthly stats
            month = datetime.utcnow().strftime('%Y-%m')
            monthly_stats = stats.get('monthly_stats', {})
            if month not in monthly_stats:
                monthly_stats[month] = {'total': 0, 'spam': 0, 'safe': 0, 'suspicious': 0}
            
            monthly_stats[month]['total'] += 1
            monthly_stats[month][classification] = monthly_stats[month].get(classification, 0) + 1
            stats['monthly_stats'] = monthly_stats
            
            stats['last_updated'] = datetime.utcnow()
            
            # Upsert statistics
            self.statistics_collection.update_one(
                {'user_id': user_id},
                {'$set': stats},
                upsert=True
            )
            
        except Exception as e:
            logger.error(f"Error updating user statistics: {e}")
    
    def get_user_statistics(self, user_id: str) -> Dict[str, Any]:
        """Get user statistics"""
        try:
            stats = self.statistics_collection.find_one({'user_id': user_id})
            if stats:
                return Statistics.from_dict(stats).to_dict()
            
            # Return empty statistics if none exist
            return Statistics(user_id=user_id).to_dict()
            
        except Exception as e:
            logger.error(f"Error getting user statistics: {e}")
            return Statistics(user_id=user_id).to_dict()
    
    def get_recent_activity(self, user_id: str, days: int = 30) -> List[Dict[str, Any]]:
        """Get recent activity for dashboard"""
        try:
            since_date = datetime.utcnow() - timedelta(days=days)
            
            cursor = self.messages_collection.find({
                'user_id': user_id,
                'analyzed_at': {'$gte': since_date}
            }).sort('analyzed_at', -1).limit(10)
            
            activities = []
            for doc in cursor:
                message = Message.from_dict(doc)
                activities.append(message.to_dict())
            
            return activities
            
        except Exception as e:
            logger.error(f"Error getting recent activity: {e}")
            return []

# Global database service instance
database_service = DatabaseService()