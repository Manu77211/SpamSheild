import { Shield, Target, Heart, Users, Award, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Your privacy and data security are our top priorities in everything we build.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Constantly evolving our AI to stay ahead of emerging threats and scams.',
    },
    {
      icon: Heart,
      title: 'User-Centric',
      description: 'Designed with simplicity in mind, making protection accessible to everyone.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a safer digital world together through collaboration and education.',
    },
  ];

  const stats = [
    { number: '2020', label: 'Founded' },
    { number: '50K+', label: 'Active Users' },
    { number: '99.5%', label: 'Accuracy Rate' },
    { number: '1M+', label: 'Threats Blocked' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-linear-to-br from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-6">
              <Shield className="h-12 w-12" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Protecting the Digital World,<br />One Message at a Time
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We're on a mission to make the internet a safer place by empowering everyone
              with intelligent spam and phishing detection technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r-from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 text-blue-600 mb-4">
                <Target className="h-6 w-6" />
                <span className="font-semibold">Our Mission</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Making Cybersecurity Accessible to Everyone
              </h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                In 2020, we witnessed countless people fall victim to increasingly sophisticated
                phishing and spam attacks. We knew there had to be a better way.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                SpamShield was born from a simple belief: everyone deserves protection from
                digital threats, regardless of their technical expertise. Using cutting-edge
                AI and machine learning, we've built a solution that's both powerful and
                incredibly easy to use.
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Our Core Values
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
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
                className="text-center p-6 rounded-2xl bg-linear-to-br from-gray-50 to-blue-50 hover:shadow-xl transition"
              >
                <div className="inline-flex p-4 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
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
