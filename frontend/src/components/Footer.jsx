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
              <Shield className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">SpamShield</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              AI-powered spam detection and protection. Keeping your inbox safe from
              phishing, scams, and malicious content.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@spamshield.com"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-blue-400 transition">
                  News
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-blue-400 transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="hover:text-blue-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-blue-400 transition">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} SpamShield. All rights reserved. Built with ❤️ to
            protect your digital life.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
