import { Upload, Brain, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Submit Message',
      description: 'Paste or upload any suspicious message, email, or SMS you want to verify.',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.2,
    },
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'Our advanced AI scans patterns, keywords, links, and sender behavior in milliseconds.',
      color: 'from-purple-500 to-pink-500',
      delay: 0.4,
    },
    {
      icon: Shield,
      title: 'Threat Detection',
      description: 'Machine learning identifies phishing attempts, scams, and malicious content.',
      color: 'from-orange-500 to-red-500',
      delay: 0.6,
    },
    {
      icon: CheckCircle,
      title: 'Get Results',
      description: 'Receive instant verdict with detailed explanation and safety recommendations.',
      color: 'from-green-500 to-emerald-500',
      delay: 0.8,
    },
  ];

  return (
    <section className="py-20 bg-linear-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple, fast, and accurate spam detection in just 4 steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-linear-to-r from-blue-200 via-purple-200 to-green-200 transform -translate-y-1/2" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: step.delay }}
                className="relative"
              >
                {/* Step Card */}
                <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition transform hover:scale-105 relative z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-linear-to-br ${step.color} mb-4`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for larger screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <ArrowRight className="h-8 w-8 text-purple-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <a
            href="/dashboard"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl transition transform hover:scale-105"
          >
            <span>Try It Now</span>
            <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
