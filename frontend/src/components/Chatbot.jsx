import { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm SpamShield AI Assistant. How can I help you today?",
      sender: 'bot',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickActions = [
    'Check a message',
    'Report spam',
    'How does it work?',
    'Get help',
  ];

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
    };
    setMessages([...messages, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: 'Thanks for your message! Our AI is analyzing your request. For immediate spam checking, please use the Dashboard.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);

    setInputValue('');
  };

  const handleQuickAction = (action) => {
    setInputValue(action);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1, y: [0, -10, 0] }}
        transition={{ 
          scale: { duration: 0.3 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{ scale: 1.15, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition border-2 border-white"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">SpamShield AI</h3>
                <p className="text-xs text-blue-100">Always here to help</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: message.sender === 'user' ? 50 : -50, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-white text-gray-800 shadow'
                    }`}
                  >
                    {message.text}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 bg-white border-t flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action)}
                  className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
                >
                  {action}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
