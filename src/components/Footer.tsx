import React from 'react';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 bg-gray-900 border-t border-gray-700 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-4">Connect with Me</h3>
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <a
              href="https://github.com/usmancout"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors duration-200"
            >
              <Instagram className="w-5 h-5" />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.linkedin.com/in/usmancout/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors duration-200"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:usman.cout@gmail.com"
              className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors duration-200"
            >
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </a>
          </div>
          <div className="text-gray-400 text-sm">
            <p>&copy; 2025 Bahria University GPA Calculator. Made by Usman</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;