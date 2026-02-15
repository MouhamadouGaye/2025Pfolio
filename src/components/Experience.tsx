import React, { useRef } from 'react';
import { useIntersectionObserver } from '../utils/hooks';
import { EXPERIENCES } from '../data';
import { Briefcase } from 'lucide-react';

const Experience = () => {
  const experienceRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(experienceRef, { threshold: 0.1 });
  
  return (
    <section 
      id="experience" 
      className="py-20 bg-gray-50 dark:bg-gray-800"
      ref={experienceRef}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div 
            className={`transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 flex items-center">
              <Briefcase className="mr-3 text-blue-600 dark:text-blue-400" size={28} />
              Professional Experience
            </h2>
            
            <div className="relative space-y-8">
              {/* Timeline line */}
              <div className="absolute left-0 top-2 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              
              {EXPERIENCES.map((experience, index) => (
                <div 
                  key={experience.id}
                  className={`ml-8 relative transition-all ${
                    isVisible ? 'animate-fadeIn' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-10 top-1 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500 border-4 border-white dark:border-gray-800"></div>
                  
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="mb-4">
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{experience.duration}</span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">{experience.title}</h3>
                      <div className="text-gray-700 dark:text-gray-300 font-medium">{experience.company}</div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {experience.description.map((item, i) => (
                        <div key={i} className="flex items-start">
                          <span className="text-blue-600 dark:text-blue-400 mr-2 mt-1">•</span>
                          <p className="text-gray-600 dark:text-gray-300">{item}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {experience.skills.map((skill) => (
                        <span 
                          key={skill} 
                          className="text-xs bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;