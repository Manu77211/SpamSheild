import { Shield, Zap, Brain, Lock, Globe, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning algorithms analyze patterns to identify spam and phishing attempts with incredible accuracy.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Zap,
      title: 'Real-Time Protection',
      description: 'Instant analysis and blocking of suspicious messages before they reach your inbox.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      icon: Shield,
      title: 'Multi-Layer Security',
      description: 'Comprehensive protection against phishing, malware, and social engineering attacks.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Your messages are analyzed securely without storing personal data. Complete privacy guaranteed.',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Globe,
      title: 'Global Threat Database',
      description: 'Connected to worldwide threat intelligence for up-to-date protection against emerging scams.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      icon: TrendingUp,
      title: 'Continuous Learning',
      description: 'Our AI constantly evolves and improves by learning from new spam patterns and threats.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r-from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Everything you need to stay protected from spam and phishing attacks
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05, rotateY: 5 }}
              className="group p-6 rounded-2xl bg-linear-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl transition cursor-pointer"
            >
              <motion.div 
                className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-4`}
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
