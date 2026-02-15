import React, { useRef } from "react";
import { ChevronDown, Github as GitHub, Linkedin, Mail } from "lucide-react";
import { useIntersectionObserver } from "../utils/hooks";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(heroRef, { threshold: 0.1 });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
      ref={heroRef}
    >
      <div className="absolute bg-transparent dark:bg-dark-gradient w-full h-28 z-10 filter blur-3xl animate-gradient-x"></div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-28 top-40 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute left-10 bottom-40 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute right-1/3 bottom-1/4 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div
            className={`transition-all duration-1000 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            } space-y-8`}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Software Developer
              <span className="text-blue-600 dark:text-blue-400 inline">
                {" "}
                +{" "}
              </span>
              <span className="text-teal-600 dark:text-teal-400">
                Business Strategist
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
              I'm a software developer with a passion for crafting smart and
              scalable solutions. With a strong foundation in code and an MBA in
              Finance, I bring a unique perspective to every project.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#projects"
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 focus:ring-opacity-50"
              >
                Contact Me
              </a>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <a
                href="https://github.com/mouhamadougaye"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <GitHub size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:mgaayee@gmail.com"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Email Contact"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a
          href="#about"
          aria-label="Scroll to about section"
          className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md"
        >
          <ChevronDown className="text-gray-600 dark:text-gray-300" size={24} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
