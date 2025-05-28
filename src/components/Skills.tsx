import React, { useRef, useState } from "react";
import { useIntersectionObserver } from "../utils/hooks";
import { SKILLS, SKILL_CATEGORIES } from "../data";
import { Code, Check } from "lucide-react";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const skillsRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(skillsRef, { threshold: 0.1 });

  const filteredSkills =
    activeCategory === "all"
      ? SKILLS
      : SKILLS.filter((skill) => skill.category === activeCategory);

  return (
    <section
      id="skills"
      className="py-20 bg-gray-50 dark:bg-gray-800"
      ref={skillsRef}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div
            className={`transition-all duration-1000 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <Code
                className="mr-3 text-blue-600 dark:text-blue-400"
                size={28}
              />
              Skills & Expertise
            </h2>

            <div className="mb-10">
              <div className="flex flex-wrap gap-2 mb-8">
                {SKILL_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      activeCategory === category.id
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    }`}
                  >
                    <div className="flex items-center">
                      <category.icon size={18} className="mr-2" />
                      <span>{category.name}</span>
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-4 py-2 rounded-full transition-all ${
                    activeCategory === "all"
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                >
                  All Skills
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredSkills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className={`bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm transform transition-all hover:scale-105 hover:shadow-md
                    ${isVisible ? "animate-fadeIn" : "opacity-0"}`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center mb-2 justify-center relative ">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3 absolute left-0">
                        <Check size={16} />
                      </div>
                      <div className="flex justify-start items-center ">
                        {" "}
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {skill.name}
                        </h3>
                        <span className="absolute right-0 ">
                          <skill.lucideIcon fontSize={14} className="mr-2" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
