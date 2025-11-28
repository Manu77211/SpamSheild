import { Shield, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">SpamShield</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Simple spam detection tool to help you identify suspicious messages and keep your inbox organized.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Manu77211"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800/60 backdrop-blur-sm border border-purple-500/20 rounded-xl hover:bg-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
              >
                <Github className="h-5 w-5 text-gray-300 hover:text-purple-400 transition" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800/60 backdrop-blur-sm border border-purple-500/20 rounded-xl hover:bg-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
              >
                <Twitter className="h-5 w-5 text-gray-300 hover:text-purple-400 transition" />
              </a>
              <a
                href="https://www.linkedin.com/in/manu-s-b98151308"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800/60 backdrop-blur-sm border border-purple-500/20 rounded-xl hover:bg-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
              >
                <Linkedin className="h-5 w-5 text-gray-300 hover:text-purple-400 transition" />
              </a>
              <a
                href="mailto:contact@spamshield.com"
                className="p-3 bg-gray-800/60 backdrop-blur-sm border border-purple-500/20 rounded-xl hover:bg-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
              >
                <Mail className="h-5 w-5 text-gray-300 hover:text-purple-400 transition" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-purple-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-purple-400 transition-colors duration-300">
                  News
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-purple-400 transition-colors duration-300">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-purple-400 transition-colors duration-300">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="hover:text-purple-400 transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-purple-400 transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-purple-400 transition-colors duration-300">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-purple-400 transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} SpamShield. All rights reserved. Built with <span className="text-purple-400">💜</span> to help you stay safe online.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
