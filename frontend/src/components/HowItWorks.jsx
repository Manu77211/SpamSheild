import { Upload, Brain, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Add Your Message',
      description: 'Simply paste any message you want to check for spam content.',
      color: 'from-purple-500 to-indigo-500',
      delay: 0.2,
    },
    {
      icon: Brain,
      title: 'Smart Check',
      description: 'Our system quickly looks at the message patterns and content.',
      color: 'from-blue-500 to-purple-500',
      delay: 0.4,
    },
    {
      icon: Shield,
      title: 'Find Issues',
      description: 'The system identifies any suspicious patterns or content.',
      color: 'from-indigo-500 to-purple-500',
      delay: 0.6,
    },
    {
      icon: CheckCircle,
      title: 'See Results',
      description: 'Get clear results showing if the message is safe or spam.',
      color: 'from-purple-500 to-cyan-500',
      delay: 0.8,
    },
  ];

  return (
    <section className="py-20 bg-linear-to-br from-gray-800 via-gray-900 to-gray-800">
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
            <span className="bg-linear-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Quick and easy spam detection in just 4 simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-linear-to-r from-purple-500/30 via-blue-500/30 to-cyan-500/30 transform -translate-y-1/2" />

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
                <div className="bg-gray-800/60 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 shadow-2xl hover:shadow-purple-500/20 transition transform hover:scale-105 relative z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-linear-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/25">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-linear-to-br ${step.color} mb-6 shadow-lg`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
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
            className="inline-flex items-center space-x-2 px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition transform hover:scale-105"
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
