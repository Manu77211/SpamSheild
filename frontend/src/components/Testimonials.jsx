import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Small Business Owner',
      image: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      text: "SpamShield saved my business from a phishing attack! The AI detected a fake invoice email that looked completely legitimate. Incredible accuracy!",
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'IT Security Manager',
      image: 'https://i.pravatar.cc/150?img=33',
      rating: 5,
      text: "We've integrated SpamShield across our organization. The real-time detection has reduced spam incidents by 95%. Best investment we've made!",
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Freelance Designer',
      image: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      text: "As someone who works with clients worldwide, I receive countless messages daily. SpamShield gives me peace of mind that I'm protected.",
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Retired Teacher',
      image: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      text: "I'm not tech-savvy, but SpamShield is so easy to use! It's protected me from several scams already. Highly recommend to everyone!",
    },
    {
      id: 5,
      name: 'Lisa Park',
      role: 'Marketing Director',
      image: 'https://i.pravatar.cc/150?img=9',
      rating: 5,
      text: "The accuracy is phenomenal. SpamShield caught sophisticated phishing attempts that other tools missed. It's now essential to our workflow.",
    },
    {
      id: 6,
      name: 'James Wilson',
      role: 'E-commerce Store Owner',
      image: 'https://i.pravatar.cc/150?img=15',
      rating: 5,
      text: "Since using SpamShield, I haven't fallen for a single scam. The instant analysis and clear explanations make it perfect for anyone!",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-linear-to-br from-blue-600 to-purple-600 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join thousands of satisfied users protecting themselves from spam and scams
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
                {/* Quote Icon */}
                <Quote className="h-12 w-12 text-purple-300 mb-6" />

                {/* Testimonial Text */}
                <p className="text-xl md:text-2xl text-gray-800 mb-8 leading-relaxed italic">
                  "{testimonials[currentIndex].text}"
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* User Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full border-4 border-purple-200"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">50K+</div>
            <div className="text-blue-100">Happy Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">4.9/5</div>
            <div className="text-blue-100">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">1M+</div>
            <div className="text-blue-100">Scams Blocked</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
