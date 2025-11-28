import { Shield, Zap, Brain, Lock, Globe, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: 'Smart Detection',
      description: 'Simple technology to help identify spam messages and keep your inbox organized.',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
    },
    {
      icon: Zap,
      title: 'Quick Analysis',
      description: 'Get instant results when you check your messages for spam content.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
    },
    {
      icon: Shield,
      title: 'Easy Protection',
      description: 'Simple tools to help you stay safe from suspicious messages and content.',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/20',
    },
    {
      icon: Lock,
      title: 'Privacy Focused',
      description: 'Your messages stay private. We don\'t store or save any of your personal information.',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
    },
    {
      icon: Globe,
      title: 'Always Updated',
      description: 'Our system stays current with the latest spam patterns to help protect you better.',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20',
    },
    {
      icon: TrendingUp,
      title: 'Getting Better',
      description: 'Our detection improves over time by learning from new spam examples.',
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/20',
    },
  ];

  return (
    <section className="py-20 bg-linear-to-b from-gray-900 via-gray-800 to-gray-900">
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
            <span className="bg-linear-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Why Choose SpamShield
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Simple tools to help you identify and manage spam messages effectively
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
              whileHover={{ y: -10, scale: 1.05 }}
              className="group p-8 rounded-2xl bg-gray-800/60 backdrop-blur-xl border border-purple-500/20 shadow-2xl hover:shadow-purple-500/20 transition cursor-pointer"
            >
              <motion.div 
                className={`inline-flex p-4 rounded-xl ${feature.bgColor} backdrop-blur-sm mb-6`}
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className={`h-7 w-7 ${feature.color}`} />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:bg-linear-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent transition">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
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
