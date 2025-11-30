from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional
import json
import os
import logging

logger = logging.getLogger(__name__)

class DatabaseService:
    """Local storage database service - no MongoDB required"""
    
    def __init__(self):
        # Create data directory if it doesn't exist
        self.data_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
        os.makedirs(self.data_dir, exist_ok=True)
        
        # Define file paths
        self.users_file = os.path.join(self.data_dir, 'users.json')
        self.messages_file = os.path.join(self.data_dir, 'messages.json')
        self.statistics_file = os.path.join(self.data_dir, 'statistics.json')
        
        # Initialize files if they don't exist
        self._init_files()
    
    def _init_files(self):
        """Initialize JSON files if they don't exist"""
        for file_path in [self.users_file, self.messages_file, self.statistics_file]:
            if not os.path.exists(file_path):
                with open(file_path, 'w') as f:
                    json.dump([], f)
    
    def _load_data(self, file_path: str) -> List[Dict]:
        """Load data from JSON file"""
        try:
            with open(file_path, 'r') as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Error loading data from {file_path}: {e}")
            return []
    
    def _save_data(self, file_path: str, data: List[Dict]) -> bool:
        """Save data to JSON file"""
        try:
            with open(file_path, 'w') as f:
                json.dump(data, f, indent=2, default=str)
            return True
        except Exception as e:
            logger.error(f"Error saving data to {file_path}: {e}")
            return False
    
    # User Operations
    def create_or_get_user(self, clerk_user_id: str, email: str = None) -> Dict[str, Any]:
        """Create or retrieve user (using local storage)"""
        try:
            # Load existing users
            users = self._load_data(self.users_file)
            
            # Find existing user
            for user in users:
                if user.get('clerk_user_id') == clerk_user_id:
                    return user
            
            # Create new user
            new_user = {
                'id': len(users) + 1,
                'clerk_user_id': clerk_user_id,
                'email': email,
                'created_at': datetime.utcnow().isoformat(),
                'updated_at': datetime.utcnow().isoformat()
            }
            
            users.append(new_user)
            self._save_data(self.users_file, users)
            
            return new_user
            
        except Exception as e:
            logger.error(f"Error creating/getting user: {e}")
            raise
    
    def update_user(self, clerk_user_id: str, update_data: Dict[str, Any]) -> bool:
        """Update user information (using local storage)"""
        try:
            users = self._load_data(self.users_file)
            
            for i, user in enumerate(users):
                if user.get('clerk_user_id') == clerk_user_id:
                    user.update(update_data)
                    user['updated_at'] = datetime.utcnow().isoformat()
                    users[i] = user
                    self._save_data(self.users_file, users)
                    return True
            
            return False
        except Exception as e:
            logger.error(f"Error updating user: {e}")
            return False
    
    # Message Operations
    def save_message_analysis(self, user_id: str, content: str, analysis_result: Dict[str, Any], 
                            ip_address: str = None, user_agent: str = None) -> Dict[str, Any]:
        """Save message analysis to local JSON file"""
        try:
            # Load existing messages
            messages = self._load_data(self.messages_file)
            
            # Create new message object
            message = {
                'id': len(messages) + 1,
                'user_id': user_id,
                'content': content,
                'risk_score': analysis_result.get('risk_score', 0),
                'classification': analysis_result.get('classification', 'unknown'),
                'confidence': analysis_result.get('confidence', 0.0),
                'threats_detected': analysis_result.get('threats_detected', []),
                'analysis_details': analysis_result.get('analysis_details', {}),
                'ip_address': ip_address,
                'user_agent': user_agent,
                'analyzed_at': datetime.now().isoformat()
            }
            
            # Add to messages list
            messages.append(message)
            
            # Save back to file
            self._save_data(self.messages_file, messages)
            
            logger.info(f"Message analysis saved successfully for user {user_id}")
            return message
            
        except Exception as e:
            logger.error(f"Error saving message analysis: {e}")
            raise
    
    def get_user_messages(self, user_id: str, limit: int = 50, skip: int = 0, 
                         classification: str = None) -> List[Dict[str, Any]]:
        """Get user's message history from local JSON file"""
        try:
            messages = self._load_data(self.messages_file)
            
            # Filter by user_id
            user_messages = [msg for msg in messages if msg.get('user_id') == user_id]
            
            # Filter by classification if specified
            if classification:
                user_messages = [msg for msg in user_messages if msg.get('classification') == classification]
            
            # Sort by analyzed_at descending
            user_messages.sort(key=lambda x: x.get('analyzed_at', ''), reverse=True)
            
            # Apply pagination
            start_idx = skip
            end_idx = skip + limit
            return user_messages[start_idx:end_idx]
            
        except Exception as e:
            logger.error(f"Error getting user messages: {e}")
            return []
    
    def delete_message(self, user_id: str, message_id: str) -> bool:
        """Delete a specific message from local JSON file"""
        try:
            messages = self._load_data(self.messages_file)
            
            # Find and remove the message
            original_count = len(messages)
            messages = [msg for msg in messages if not (msg.get('id') == int(message_id) and msg.get('user_id') == user_id)]
            
            # Save updated data
            if len(messages) < original_count:
                self._save_data(self.messages_file, messages)
                return True
            
            return False
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
            stats_data = self._load_data(self.statistics_file)
            
            # Find existing stats for user
            user_stats = None
            stats_index = -1
            for i, stats in enumerate(stats_data):
                if stats.get('user_id') == user_id:
                    user_stats = stats
                    stats_index = i
                    break
            
            if not user_stats:
                # Create new statistics record
                user_stats = {
                    'user_id': user_id,
                    'total_messages': 0,
                    'spam_count': 0,
                    'safe_count': 0,
                    'suspicious_count': 0,
                    'created_at': datetime.utcnow().isoformat(),
                    'updated_at': datetime.utcnow().isoformat()
                }
            
            # Update totals
            user_stats['total_messages'] = user_stats.get('total_messages', 0) + 1
            
            if classification == 'spam':
                user_stats['spam_count'] = user_stats.get('spam_count', 0) + 1
            elif classification == 'safe':
                user_stats['safe_count'] = user_stats.get('safe_count', 0) + 1
            elif classification == 'suspicious':
                user_stats['suspicious_count'] = user_stats.get('suspicious_count', 0) + 1
            
            user_stats['updated_at'] = datetime.utcnow().isoformat()
            
            # Save or update stats
            if stats_index >= 0:
                stats_data[stats_index] = user_stats
            else:
                stats_data.append(user_stats)
            
            self._save_data(self.statistics_file, stats_data)
            
        except Exception as e:
            logger.error(f"Error updating user statistics: {e}")
    
    def get_user_statistics(self, user_id: str) -> Dict[str, Any]:
        """Get user statistics from local JSON file"""
        try:
            stats_data = self._load_data(self.statistics_file)
            
            # Find user stats
            for stats in stats_data:
                if stats.get('user_id') == user_id:
                    return stats
            
            # Return empty statistics if none exist
            return {
                'user_id': user_id,
                'total_messages': 0,
                'spam_count': 0,
                'safe_count': 0,
                'suspicious_count': 0,
                'created_at': datetime.utcnow().isoformat(),
                'updated_at': datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error getting user statistics: {e}")
            return {
                'user_id': user_id,
                'total_messages': 0,
                'spam_count': 0,
                'safe_count': 0,
                'suspicious_count': 0
            }
    
    def get_recent_activity(self, user_id: str, days: int = 30) -> List[Dict[str, Any]]:
        """Get recent activity for dashboard from local JSON file"""
        try:
            messages = self._load_data(self.messages_file)
            since_date = datetime.utcnow() - timedelta(days=days)
            since_date_str = since_date.isoformat()
            
            # Filter by user and date
            user_messages = [
                msg for msg in messages 
                if msg.get('user_id') == user_id and 
                msg.get('analyzed_at', '') >= since_date_str
            ]
            
            # Sort by analyzed_at descending and limit to 10
            user_messages.sort(key=lambda x: x.get('analyzed_at', ''), reverse=True)
            
            return user_messages[:10]
            
        except Exception as e:
            logger.error(f"Error getting recent activity: {e}")
            return []

# Global database service instance
database_service = DatabaseService()