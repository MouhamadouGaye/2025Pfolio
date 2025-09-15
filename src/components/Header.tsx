import React, { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { NAV_ITEMS } from "../data";
import { useScrollPosition } from "../utils/hooks";

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 50;

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white bg-opacity-80 backdrop-blur-md dark:bg-gray-900 dark:bg-opacity-80 shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <a
          href="#home"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          {/* <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent text-shadow-lg">
            MG
          </span>
          aye */}
          <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent text-shadow-lg transition-transform duration-300 hover:scale-105">
            MG
          </span>
          aye
        </a>
        <a
          href="https://2025-pfolio.vercel.app/ai.html"
          className={`${isDarkMode ? "text-white" : "text-blue-500"}`}
        >
          *my-ai
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={toggleDarkMode}
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-3">
          <button
            onClick={toggleDarkMode}
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="p-2 text-gray-600 dark:text-gray-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      <div
        className={`fixed top-0 mt-16 border-b-gray-900 dark:border-b-white 
          border-b-10 border-t-gray-900 dark:border-t-white border-t-2 
           inset-0 z-50 transition-transform duration-300 ease-in-out transform 
           md:hidden flex flex-col bg-white dark:bg-gray-900
           ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Start Test*/}

        {/*fin de test */}
        <nav className="container mx-auto p-6 bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-80">
          <ul className="flex flex-col space-y-6 text-center">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-xl font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
