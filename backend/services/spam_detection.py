import re
import urllib.parse
from typing import Dict, List, Tuple, Any
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

# Try to import ML libraries safely
try:
    from transformers import pipeline
    ML_AVAILABLE = True
except ImportError:
    logger.error("ML libraries not available - ML model required")
    ML_AVAILABLE = False

class SpamDetector:
    """ML-powered spam detection engine"""

    def __init__(self):
        if not ML_AVAILABLE:
            raise ImportError("ML libraries required for spam detection")

        # Load ML model
        self.classifier = None
        try:
            self.classifier = pipeline("text-classification", model="dima806/email-spam-detection-roberta")
            logger.info("ML model loaded successfully")
        except Exception as e:
            logger.error(f"Failed to load ML model: {e}")
            raise e
    
    def analyze_message(self, message: str, user_id: str = None) -> Dict[str, Any]:
        """
        Analyze a message using ML model only

        Returns:
            Dict containing analysis results
        """
        try:
            message_lower = message.lower().strip()

            if not message_lower:
                return self._create_result(0, 'safe', 0.0, [], {})

            # Use ML model for prediction
            if self.classifier:
                try:
                    result = self.classifier(message)
                    score = result[0]['score']
                    label = result[0]['label']

                    # Improved scoring with real ML confidence
                    if label == 'Spam':
                        if score > 0.8:
                            classification = 'spam'
                            risk_score = min(100, max(70, int(score * 100)))  # 80-100 range
                        elif score > 0.6:
                            classification = 'suspicious'
                            risk_score = min(69, max(50, int(score * 100)))  # 60-69 range
                        else:
                            classification = 'suspicious'
                            risk_score = min(49, max(30, int(score * 100)))  # 30-49 range
                        confidence = round(score, 3)  # Real ML confidence for spam
                    else:  # 'No spam'
                        if score > 0.9:
                            classification = 'safe'
                            risk_score = max(0, int((1-score) * 10))  # 0-1 range for very confident safe
                        elif score > 0.7:
                            classification = 'safe'
                            risk_score = max(0, int((1-score) * 20))  # 0-6 range for confident safe
                        else:
                            classification = 'suspicious'
                            risk_score = min(29, max(10, int((1-score) * 50)))  # 10-29 range for uncertain
                        confidence = round(score, 3)  # Real ML confidence for safe

                    # Analyze content for specific characteristics (for explanations only)
                    content_analysis = self._analyze_content_characteristics(message_lower)

                    # Generate intelligent explanations based on ML + content analysis
                    explanations = self._generate_smart_explanations(classification, score, label, content_analysis)

                    analysis_details = {
                        'ml_label': label,
                        'ml_score': score,
                        'model_explanations': explanations
                    }

                    return self._create_result(risk_score, classification, confidence, content_analysis, analysis_details)

                except Exception as e:
                    logger.error(f"ML prediction failed: {e}")
                    return self._create_result(0, 'error', 0.0, [], {'error': f'ML prediction failed: {str(e)}'})

            else:
                logger.error("ML model not available")
                return self._create_result(0, 'error', 0.0, [], {'error': 'ML model not available'})

        except Exception as e:
            logger.error(f"Error analyzing message: {e}")
            return self._create_result(0, 'error', 0.0, [], {'error': str(e)})
    
    def _create_result(self, risk_score: int, classification: str, confidence: float, 
                      content_analysis: Dict[str, List[str]], details: Dict[str, Any]) -> Dict[str, Any]:
        """Create standardized analysis result"""
        return {
            'risk_score': risk_score,
            'classification': classification,
            'confidence': confidence,
            'threats_detected': [],  # No longer used, kept for compatibility
            'analysis_details': details,
            'recommendations': self._get_recommendations(classification, content_analysis),
            'analyzed_at': datetime.utcnow().isoformat()
        }

    def _get_recommendations(self, classification: str, content_analysis: Dict[str, List[str]]) -> List[str]:
        """Get security recommendations based on analysis"""
        recommendations = []

        if classification == 'spam':
            recommendations.append("🚨 This message appears to be spam. Do not respond or click any links.")
            recommendations.append("🗑️ Delete this message immediately.")

        elif classification == 'suspicious':
            recommendations.append("⚠️ This message contains suspicious elements. Exercise caution.")
            recommendations.append("🔍 Verify the sender's identity before taking any action.")

        else:
            recommendations.append("✅ This message appears to be safe, but always stay vigilant.")

        return recommendations

    def _analyze_content_characteristics(self, message: str) -> Dict[str, List[str]]:
        """Analyze message content for specific characteristics (for explanations only)"""
        characteristics = {
            'money': [],
            'urgency': [],
            'phishing': [],
            'social': [],
            'technical': []
        }

        # Money-related indicators
        money_keywords = ['free', 'prize', 'won', 'cash', 'money', 'dollar', 'bitcoin', 'crypto', 'investment', 'lottery']
        for keyword in money_keywords:
            if keyword in message:
                characteristics['money'].append(keyword)

        # Urgency indicators
        urgency_keywords = ['urgent', 'immediate', 'now', 'act fast', 'limited time', 'expires', 'deadline', 'rush']
        for keyword in urgency_keywords:
            if keyword in message:
                characteristics['urgency'].append(keyword)

        # Phishing indicators
        phishing_keywords = ['click here', 'verify', 'confirm', 'login', 'account', 'password', 'suspended', 'security alert']
        for keyword in phishing_keywords:
            if keyword in message:
                characteristics['phishing'].append(keyword)

        # Check for URLs
        urls = re.findall(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', message)
        if urls:
            characteristics['phishing'].extend(['contains_links'] * len(urls))

        # Social engineering indicators
        social_keywords = ['lonely', 'love', 'destiny', 'soulmate', 'marry', 'military', 'overseas', 'widow', 'orphan']
        for keyword in social_keywords:
            if keyword in message:
                characteristics['social'].append(keyword)

        # Technical support scams
        technical_keywords = ['virus', 'infected', 'microsoft', 'support', 'computer', 'error', 'fix', 'repair']
        for keyword in technical_keywords:
            if keyword in message:
                characteristics['technical'].append(keyword)

        return characteristics

    def _generate_smart_explanations(self, classification: str, score: float, label: str,
                                   content_analysis: Dict[str, List[str]]) -> List[str]:
        """Generate intelligent explanations based on ML results and content analysis"""
        explanations = []

        # Base ML explanation
        if classification == 'spam':
            explanations.append(f"🤖 AI model detected this as spam with {score:.1%} confidence")
        elif classification == 'suspicious':
            if label == 'Spam':
                explanations.append(f"🤖 AI model flagged as potentially spam ({score:.1%} confidence)")
            else:
                explanations.append(f"🤖 AI model classified as safe but with moderate confidence ({score:.1%})")
        else:
            explanations.append(f"🤖 AI model classified as safe with {score:.1%} confidence")

        # Content-specific explanations
        if content_analysis['money']:
            money_terms = ', '.join(content_analysis['money'][:3])  # Limit to 3 terms
            explanations.append(f"💰 Contains money-related terms: {money_terms}")

        if content_analysis['urgency']:
            urgency_terms = ', '.join(content_analysis['urgency'][:2])
            explanations.append(f"⏰ Creates false urgency with: {urgency_terms}")

        if content_analysis['phishing']:
            phishing_indicators = []
            if 'contains_links' in content_analysis['phishing']:
                phishing_indicators.append('suspicious links')
            phishing_terms = [term for term in content_analysis['phishing'] if term != 'contains_links'][:2]
            phishing_indicators.extend(phishing_terms)
            explanations.append(f"🎣 Phishing indicators: {', '.join(phishing_indicators)}")

        if content_analysis['social']:
            social_terms = ', '.join(content_analysis['social'][:2])
            explanations.append(f"💕 Social engineering tactics: {social_terms}")

        if content_analysis['technical']:
            technical_terms = ', '.join(content_analysis['technical'][:2])
            explanations.append(f"🛠️ Technical support scam indicators: {technical_terms}")

        # Add general explanations if no specific characteristics found
        if not any(content_analysis.values()):
            if classification == 'spam':
                explanations.append("📧 Message exhibits typical spam patterns")
            elif classification == 'suspicious':
                explanations.append("🤔 Message contains some unusual elements")
            else:
                explanations.append("✅ No suspicious characteristics detected")

        return explanations[:5]  # Limit to 5 explanations

    def _get_recommendations(self, classification: str, content_analysis: Dict[str, List[str]]) -> List[str]:
        """Get tailored security recommendations based on content analysis"""
        recommendations = []

        if classification == 'spam':
            recommendations.append("🚨 This message appears to be spam. Do not respond or click any links.")
            recommendations.append("🗑️ Delete this message immediately.")

            # Content-specific recommendations
            if content_analysis['money']:
                recommendations.append("💰 Never share financial information or send money to unknown contacts.")
            if content_analysis['phishing']:
                recommendations.append("🎣 This appears to be a phishing attempt. Don't click links or provide credentials.")
            if content_analysis['urgency']:
                recommendations.append("⏰ Scammers create false urgency - take time to verify before acting.")
            if content_analysis['social']:
                recommendations.append("💕 Be cautious of romantic advances or personal stories from unknown contacts.")
            if content_analysis['technical']:
                recommendations.append("🛠️ Never give remote access to your computer or pay for unsolicited tech support.")

        elif classification == 'suspicious':
            recommendations.append("⚠️ This message contains suspicious elements. Exercise caution.")
            recommendations.append("🔍 Verify the sender's identity before taking any action.")

            if content_analysis['phishing']:
                recommendations.append("🎣 Check URLs carefully and avoid clicking suspicious links.")
            if content_analysis['money']:
                recommendations.append("💰 Be extremely cautious with any financial requests.")

        else:  # safe
            recommendations.append("✅ This message appears to be safe, but always stay vigilant.")

            if content_analysis['phishing'] or content_analysis['money']:
                recommendations.append("🔒 Even in safe messages, never share sensitive information.")

        # Limit to 4 recommendations max
        return recommendations[:4]

# Global spam detector instance
spam_detector = SpamDetector()