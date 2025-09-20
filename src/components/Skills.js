import React from "react";
import {
  Database,
  Globe,
  Server,
  Smartphone,
  Cpu,
  Zap,
} from "lucide-react";

const Skills = ({ darkMode }) => {

  const skillCategories = {
    frontend: {
      title: "Frontend Development",
      icon: <Globe size={24} />,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      skills: [
        { name: "React", level: 95, years: "3+ years" },
        { name: "JavaScript", level: 90, years: "4+ years" },
        { name: "HTML5", level: 95, years: "5+ years" },
        { name: "CSS3", level: 90, years: "5+ years" },
        { name: "Tailwind CSS", level: 88, years: "2+ years" },
       
      ],
    },
    backend: {
      title: "Backend Development",
      icon: <Server size={24} />,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      skills: [
        { name: "Java", level: 92, years: "3+ years" },
        { name: "Spring Boot", level: 90, years: "3+ years" },
        { name: "RESTful APIs", level: 88, years: "3+ years" },
        { name: "Microservices", level: 85, years: "2+ years" },
        { name: "Spring Security", level: 80, years: "2+ years" },
      ],
    },
    database: {
      title: "Database & Storage",
      icon: <Database size={24} />,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      skills: [
        { name: "MySQL", level: 88, years: "3+ years" },
        { name: "PostgreSQL", level: 85, years: "2+ years" },
        { name: "Oracle", level: 80, years: "2+ years" },
      ],
    },
    tools: {
      title: "Tools & Technologies",
      icon: <Cpu size={24} />,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      skills: [
        { name: "Git", level: 90, years: "4+ years" },
        { name: "Docker", level: 85, years: "2+ years" },
        { name: "AWS", level: 75, years: "1+ years" },
        { name: "Linux", level: 80, years: "3+ years" },
        { name: "CI/CD", level: 80, years: "2+ years" },
      ],
    },
  
  };

  const getCategoryGradient = (categoryKey) => {
    const gradients = {
      frontend: "from-blue-400 via-purple-500 to-pink-500",
      backend: "from-green-400 via-emerald-500 to-teal-500",
      database: "from-orange-400 via-red-500 to-pink-500",
      tools: "from-purple-400 via-indigo-500 to-blue-500",
    };
    return gradients[categoryKey] || "from-gray-400 to-gray-600";
  };

  const getSkillColor = (skillName, categoryKey) => {
    const skillColors = {
      frontend: {
        "React": "from-blue-400 to-cyan-500",
        "JavaScript": "from-yellow-400 to-orange-500",
        "HTML5": "from-orange-400 to-red-500",
        "CSS3": "from-blue-500 to-indigo-500",
        "Tailwind CSS": "from-cyan-400 to-blue-500",
      },
      backend: {
        "Java": "from-orange-500 to-red-500",
        "Spring Boot": "from-green-500 to-emerald-500",
        "RESTful APIs": "from-blue-500 to-purple-500",
        "Microservices": "from-purple-500 to-pink-500",
        "Spring Security": "from-green-600 to-teal-500",
      },
      database: {
        "MySQL": "from-orange-400 to-yellow-500",
        "PostgreSQL": "from-blue-600 to-indigo-500",
        "Oracle": "from-red-500 to-pink-500",
      },
      tools: {
        "Git": "from-orange-500 to-red-500",
        "Docker": "from-blue-500 to-cyan-500",
        "AWS": "from-orange-400 to-yellow-500",
        "Linux": "from-yellow-500 to-orange-500",
        "CI/CD": "from-purple-500 to-pink-500",
      },
    };
    
    return skillColors[categoryKey]?.[skillName] || getCategoryGradient(categoryKey);
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <h1 className={`text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient ${
              darkMode ? "" : "drop-shadow-sm"
            }`}>
              Technical Skills
            </h1>
            {!darkMode && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent opacity-20 blur-sm -z-10">
                Technical Skills
              </div>
            )}
          </div>
          <p className={`text-lg ${darkMode ? "text-gray-400" : "text-light-text-secondary"}`}>
            A comprehensive overview of my technical expertise and proficiency levels
          </p>
        </div>

        {/* All Skills Categories */}
        <div className="space-y-12">
          {Object.entries(skillCategories).map(([key, category]) => (
            <div key={key} className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-lg ${category.bgColor} ${category.color} shadow-lg`}>
                  {category.icon}
                </div>
                <div className="relative">
                  <h2 className={`text-2xl font-bold bg-gradient-to-r ${getCategoryGradient(key)} bg-clip-text text-transparent ${
                    darkMode ? "" : "drop-shadow-sm"
                  }`}>
                    {category.title}
                  </h2>
                  {!darkMode && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryGradient(key)} bg-clip-text text-transparent opacity-15 blur-sm -z-10`}>
                      {category.title}
                    </div>
                  )}
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {category.skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className={`group relative p-4 rounded-lg border transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg ${
                      darkMode
                        ? "bg-gray-800/30 border-gray-700/30 hover:bg-gray-700/40"
                        : "bg-light-surface-primary border-light-border-secondary hover:bg-light-surface-secondary shadow-light-md"
                    }`}
                  >
                    <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${getSkillColor(skill.name, key)} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                    <div className="relative z-10">
                    <h3 className={`text-center font-medium transition-all duration-300 ${
                      darkMode 
                        ? "text-gray-200 group-hover:text-white" 
                        : "text-light-text-primary group-hover:text-light-text-primary"
                    } group-hover:scale-105`}>
                      <span className={`bg-gradient-to-r ${getSkillColor(skill.name, key)} bg-clip-text text-transparent`}>
                        {skill.name}
                      </span>
                    </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg ${
            darkMode ? "bg-gray-800/50" : "bg-light-bg-tertiary shadow-light-md"
          }`}>
            <Zap className="text-yellow-400" size={20} />
            <span className={`font-medium ${darkMode ? "text-gray-200" : "text-light-text-primary"}`}>
              Continuously learning and adapting to new technologies
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
