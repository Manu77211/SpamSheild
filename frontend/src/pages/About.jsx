import { Shield, Target, Heart, Users, Award, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Keep You Safe',
      description: 'We focus on protecting your personal information and keeping your data private.',
    },
    {
      icon: Zap,
      title: 'Simple Tools',
      description: 'Easy-to-use spam detection that anyone can understand and use effectively.',
    },
    {
      icon: Heart,
      title: 'Made for You',
      description: 'Built with regular users in mind, no complicated setup or confusing features.',
    },
    {
      icon: Users,
      title: 'Better Together',
      description: 'Helping everyone stay safer online by sharing knowledge and good practices.',
    },
  ];

  const stats = [
    { number: '2025', label: 'Built This Year' },
    { number: 'Free', label: 'Always Free' },
    { number: 'Simple', label: 'Easy to Use' },
    { number: 'Private', label: 'Your Data Stays Safe' },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-linear-to-br from-purple-900/50 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center justify-center p-4 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full mb-6">
              <Shield className="h-12 w-12" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-linear-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Helping You Stay Safe Online
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              SpamShield is a simple tool that helps you identify spam messages and stay protected
              from online scams and suspicious content.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-gray-800/60 backdrop-blur-xl border border-purple-500/20 rounded-xl hover:scale-105 transition-transform duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-900/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 text-purple-400 mb-4">
                <Target className="h-6 w-6" />
                <span className="font-semibold">What We Do</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Making Online Safety Simple
              </h2>
              <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                We created SpamShield because we believe everyone should be able to identify
                spam messages easily, without needing technical knowledge.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our tool helps regular people stay safe online by providing simple,
                clear results when checking suspicious messages.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-linear-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Our Values
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              What we believe in and how we work
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gray-800/60 backdrop-blur-xl border border-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:scale-105"
              >
                <div className="inline-flex p-4 bg-linear-to-br from-purple-600 to-blue-600 rounded-xl mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Award className="h-16 w-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Us in Making the Internet Safer
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Start protecting yourself from spam and phishing today
            </p>
            <a
              href="/signup"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-2xl transition transform hover:scale-105"
            >
              Get Started Free
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
