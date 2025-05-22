import React from "react";
import { Github as GitHub, Linkedin, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <a href="#home" className="text-2xl font-bold">
                <span className="text-blue-400">Dev</span>Portfolio
              </a>
              <p className="text-gray-400 mt-2 max-w-md">
                Software developer with a passion for crafting smart and
                scalable solutions. Engineering expertise combined with business
                acumen.
              </p>
            </div>

            <div className="flex space-x-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <GitHub size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:contact@example.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email Contact"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} *MGaye. All rights reserved.
            </p>

            <div className="mt-4 md:mt-0 flex items-center">
              <button
                onClick={scrollToTop}
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full text-gray-400 hover:text-white transition-colors"
                aria-label="Scroll to top"
              >
                <ArrowUp size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
