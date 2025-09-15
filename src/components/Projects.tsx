import React, { useRef, useState } from "react";
import { useIntersectionObserver } from "../utils/hooks";
import { PROJECTS, PROJECT_CATEGORIES } from "../data";
import { Briefcase, ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const projectsRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(projectsRef, { threshold: 0.1 });

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeCategory);

  return (
    <section
      id="projects"
      className="py-20 bg-white dark:bg-gray-900 scroll-mt-20"
      ref={projectsRef}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className={`transition-all duration-1000 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <Briefcase
                className="mr-3 text-blue-600 dark:text-blue-400"
                size={28}
              />
              Projects
            </h2>

            <div className="flex flex-wrap gap-2 mb-12 justify-center">
              {PROJECT_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    activeCategory === category.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg 
                            transition-all transform hover:shadow-xl hover:-translate-y-1
                            ${isVisible ? "animate-fadeIn" : "opacity-0"}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center"
                        >
                          <ExternalLink size={16} className="mr-1" />
                          Live Demo
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 flex items-center"
                        >
                          <Github size={16} className="mr-1" />
                          Code
                        </a>
                      )}
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

export default Projects;
