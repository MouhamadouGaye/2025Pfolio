import React, { useRef } from 'react';
import { useIntersectionObserver } from '../utils/hooks';
import { EDUCATION } from '../data';
import { Briefcase, GraduationCap, Code } from 'lucide-react';

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(aboutRef, { threshold: 0.1 });
  
  return (
    <section 
      id="about" 
      className="py-20 bg-white dark:bg-gray-900"
      ref={aboutRef}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div 
            className={`transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <Code className="mr-3 text-blue-600 dark:text-blue-400" size={28} />
              About Me
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="col-span-2">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  I'm a software developer with a passion for crafting smart and scalable solutions. 
                  With a strong foundation in JavaScript, Python, and Java, I've developed full-stack 
                  applications using frameworks like React, Next.js, Angular, Flask, FastAPI, and Spring Boot.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  I also hold an MBA in Finance, which gives me a unique perspective on how software can solve 
                  real-world business challenges. This background enables me to design and build systems that 
                  not only function well—but also make strategic, financial, and operational sense.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Whether it's a fast-paced startup or a structured enterprise, I can speak the language of 
                  both code and commerce. I thrive on collaboration, clean architecture, and creating seamless 
                  user experiences.
                </p>
              </div>
              
              <div>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <GraduationCap className="mr-2 text-teal-600 dark:text-teal-400" size={20} />
                    Education
                  </h3>
                  
                  <div className="space-y-4">
                    {EDUCATION.map((edu, index) => (
                      <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4 py-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{edu.degree}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{edu.institution}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Developer</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  I enjoy building applications from the ground up, optimizing performance, 
                  and ensuring code quality and maintainability.
                </p>
              </div>
              
              <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Problem Solver</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  I approach challenges with analytical thinking and creative solutions,
                  breaking down complex problems into manageable steps.
                </p>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Business Strategist</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  My MBA background helps me understand how technology decisions 
                  impact business outcomes and user experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;