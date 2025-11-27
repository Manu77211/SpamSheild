import { useState } from 'react';
import { Calendar, TrendingUp, AlertTriangle, Shield, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'phishing', 'scams', 'malware', 'updates'];

  const newsArticles = [
    {
      id: 1,
      title: 'New Phishing Campaign Targets Banking Customers',
      excerpt: 'Security researchers have discovered a sophisticated phishing campaign targeting major bank customers with fake SMS messages...',
      category: 'phishing',
      date: '2025-11-27',
      image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&auto=format&fit=crop',
      trending: true,
    },
    {
      id: 2,
      title: 'FBI Warns of Cryptocurrency Scam Surge',
      excerpt: 'The FBI reports a 300% increase in cryptocurrency-related scams, with losses exceeding $1 billion in the past year...',
      category: 'scams',
      date: '2025-11-26',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop',
      trending: true,
    },
    {
      id: 3,
      title: 'SpamShield Updates Detection Algorithm',
      excerpt: 'Our latest AI model update improves spam detection accuracy to 99.8%, with enhanced real-time phishing protection...',
      category: 'updates',
      date: '2025-11-25',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop',
      trending: false,
    },
    {
      id: 4,
      title: 'New Malware Spreads Through Fake Package Delivery Texts',
      excerpt: 'Cybersecurity experts warn about malicious software disguised as package delivery notifications targeting smartphone users...',
      category: 'malware',
      date: '2025-11-24',
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&auto=format&fit=crop',
      trending: false,
    },
    {
      id: 5,
      title: 'Social Engineering Tactics Evolve with AI',
      excerpt: 'Scammers are now using AI-generated voices and deepfakes to make their phishing attempts more convincing...',
      category: 'phishing',
      date: '2025-11-23',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop',
      trending: true,
    },
    {
      id: 6,
      title: 'Holiday Season Scams: What to Watch Out For',
      excerpt: 'As holiday shopping peaks, scammers are exploiting fake discount codes and fraudulent online stores...',
      category: 'scams',
      date: '2025-11-22',
      image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&auto=format&fit=crop',
      trending: false,
    },
  ];

  const filteredArticles = newsArticles.filter((article) => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r-from-blue-600 to-purple-600 text-white pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
              Latest Spam & Security News
            </h1>
            <p className="text-xl text-black max-w-2xl mx-auto">
              Stay informed about the latest threats, scams, and security updates
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured/Trending Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-800">Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredArticles
              .filter((article) => article.trending)
              .slice(0, 2)
              .map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                >
                  <div className="relative h-48">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full">
                      Trending
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium">
                        {article.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600">{article.excerpt}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* All Articles Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
              >
                <div className="relative h-40">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  {article.trending && (
                    <div className="absolute top-2 right-2 p-1 bg-orange-500 rounded-full">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2 text-xs text-gray-500">
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full font-medium">
                      {article.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{article.excerpt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default News;
