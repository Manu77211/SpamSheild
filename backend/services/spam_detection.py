import re
import urllib.parse
from typing import Dict, List, Tuple, Any
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class SpamDetector:
    """Advanced spam detection engine"""
    
    def __init__(self):
        self.spam_keywords = [
            # Financial scams
            'free money', 'cash prize', 'urgent payment', 'wire transfer', 'bank account',
            'inheritance', 'lottery', 'winner', 'congratulations', 'claim now',
            'limited time', 'act now', 'urgent', 'immediate', 'verify account',
            
            # Phishing
            'click here', 'update payment', 'confirm identity', 'suspended account',
            'verify now', 'login verification', 'security alert', 'account locked',
            'unusual activity', 'confirm details',
            
            # Romance/Social scams
            'lonely', 'love you', 'destiny', 'soulmate', 'marry me', 'divorce',
            'widow', 'orphan', 'military', 'overseas', 'deployment',
            
            # General spam
            'make money', 'work from home', 'get rich', 'no experience',
            'guaranteed income', 'passive income', 'investment opportunity',
            'risk free', 'double your money'
        ]
        
        self.suspicious_patterns = [
            r'\b\d{4}-\d{4}-\d{4}-\d{4}\b',  # Credit card numbers
            r'\b\d{3}-\d{2}-\d{4}\b',        # SSN pattern
            r'[A-Z]{2,}\s+[A-Z]{2,}',        # All caps words
            r'!!!+',                          # Multiple exclamation marks
            r'\$\d+',                         # Money amounts
            r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+',  # URLs
        ]
        
        self.phishing_domains = [
            'bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'short.link',
            'suspicious-bank.com', 'fake-paypal.net', 'scam-site.org'
        ]
        
        self.threat_categories = {
            'financial_scam': ['money', 'payment', 'bank', 'account', 'transfer', 'prize'],
            'phishing': ['verify', 'login', 'account', 'suspended', 'security', 'click'],
            'romance_scam': ['love', 'lonely', 'marry', 'destiny', 'military'],
            'job_scam': ['work from home', 'make money', 'no experience', 'guaranteed'],
            'tech_support': ['computer', 'virus', 'infected', 'microsoft', 'support'],
            'charity_scam': ['donation', 'charity', 'help', 'disaster', 'urgent help']
        }
    
    def analyze_message(self, message: str, user_id: str = None) -> Dict[str, Any]:
        """
        Analyze a message for spam indicators
        
        Returns:
            Dict containing analysis results
        """
        try:
            message_lower = message.lower().strip()
            
            if not message_lower:
                return self._create_result(0, 'safe', 0.0, [], {})
            
            # Initialize scores
            keyword_score = 0
            pattern_score = 0
            url_score = 0
            formatting_score = 0
            
            # Analyze keywords
            keyword_matches = []
            for keyword in self.spam_keywords:
                if keyword.lower() in message_lower:
                    keyword_matches.append(keyword)
                    keyword_score += 15
            
            # Analyze suspicious patterns
            pattern_matches = []
            for pattern in self.suspicious_patterns:
                matches = re.findall(pattern, message, re.IGNORECASE)
                if matches:
                    pattern_matches.extend(matches)
                    pattern_score += 20
            
            # Analyze URLs
            url_matches = []
            urls = re.findall(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', message)
            for url in urls:
                url_matches.append(url)
                domain = self._extract_domain(url)
                if domain in self.phishing_domains:
                    url_score += 30
                else:
                    url_score += 10
            
            # Analyze message formatting
            formatting_issues = []
            
            # Check for excessive caps
            caps_ratio = sum(1 for c in message if c.isupper()) / len(message) if message else 0
            if caps_ratio > 0.6:
                formatting_score += 20
                formatting_issues.append('excessive_caps')
            
            # Check for excessive punctuation
            exclamation_count = message.count('!')
            question_count = message.count('?')
            if exclamation_count > 3:
                formatting_score += 15
                formatting_issues.append('excessive_exclamation')
            if question_count > 2:
                formatting_score += 10
                formatting_issues.append('excessive_questions')
            
            # Check message length (very short or very long can be suspicious)
            if len(message) < 10:
                formatting_score += 5
                formatting_issues.append('too_short')
            elif len(message) > 1000:
                formatting_score += 10
                formatting_issues.append('too_long')
            
            # Calculate total risk score
            total_score = min(100, keyword_score + pattern_score + url_score + formatting_score)
            
            # Determine classification and confidence
            if total_score >= 70:
                classification = 'spam'
                confidence = 0.9
            elif total_score >= 40:
                classification = 'suspicious'
                confidence = 0.7
            else:
                classification = 'safe'
                confidence = 0.8
            
            # Identify threat categories
            threats_detected = self._identify_threats(message_lower)
            
            # Create detailed analysis
            analysis_details = {
                'keyword_matches': keyword_matches,
                'pattern_matches': pattern_matches,
                'url_matches': url_matches,
                'formatting_issues': formatting_issues,
                'message_length': len(message),
                'caps_ratio': caps_ratio,
                'exclamation_count': exclamation_count,
                'question_count': question_count,
                'scores': {
                    'keyword_score': keyword_score,
                    'pattern_score': pattern_score,
                    'url_score': url_score,
                    'formatting_score': formatting_score
                }
            }
            
            return self._create_result(
                total_score, 
                classification, 
                confidence, 
                threats_detected, 
                analysis_details
            )
            
        except Exception as e:
            logger.error(f"Error analyzing message: {e}")
            return self._create_result(0, 'error', 0.0, [], {'error': str(e)})
    
    def _identify_threats(self, message: str) -> List[str]:
        """Identify specific threat categories"""
        threats = []
        for category, keywords in self.threat_categories.items():
            for keyword in keywords:
                if keyword in message:
                    threats.append(category)
                    break
        return threats
    
    def _extract_domain(self, url: str) -> str:
        """Extract domain from URL"""
        try:
            parsed = urllib.parse.urlparse(url)
            return parsed.netloc.lower()
        except:
            return ''
    
    def _create_result(self, risk_score: int, classification: str, confidence: float, 
                      threats: List[str], details: Dict[str, Any]) -> Dict[str, Any]:
        """Create standardized analysis result"""
        return {
            'risk_score': risk_score,
            'classification': classification,
            'confidence': confidence,
            'threats_detected': threats,
            'analysis_details': details,
            'recommendations': self._get_recommendations(classification, threats),
            'analyzed_at': datetime.utcnow().isoformat()
        }
    
    def _get_recommendations(self, classification: str, threats: List[str]) -> List[str]:
        """Get security recommendations based on analysis"""
        recommendations = []
        
        if classification == 'spam':
            recommendations.append("🚨 This message appears to be spam. Do not respond or click any links.")
            recommendations.append("🗑️ Delete this message immediately.")
            
        elif classification == 'suspicious':
            recommendations.append("⚠️ This message contains suspicious elements. Exercise caution.")
            recommendations.append("🔍 Verify the sender's identity before taking any action.")
            
        if 'financial_scam' in threats:
            recommendations.append("💰 Never share financial information via text/email.")
            
        if 'phishing' in threats:
            recommendations.append("🎣 This appears to be a phishing attempt. Don't click links or provide credentials.")
            
        if 'romance_scam' in threats:
            recommendations.append("💔 Be cautious of romantic advances from unknown contacts.")
        
        if not recommendations:
            recommendations.append("✅ This message appears to be safe, but always stay vigilant.")
            
        return recommendations

# Global spam detector instance
spam_detector = SpamDetector()