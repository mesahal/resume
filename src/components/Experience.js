import {
  Calendar,
  Terminal,
  Code2,
  Binary,
  Cpu,
} from "lucide-react";
import bs23Logo from "../assets/optimized/brain_station_23_logo.jpeg";
import synesisLogo from "../assets/optimized/synesis_it_limited_logo.jpeg";
import bdosnLogo from "../assets/optimized/bdosn_logo.jpeg";
const Experience = ({ darkMode }) => {
  const experiences = [
    {
      company: "Brain Station 23 PLC.",
      role: "Software Engineer I",
      duration: "Apr 2024 – Present",
      logo: bs23Logo,
      description:
        "Developed and maintained RESTful APIs using Spring Boot, implementing new features and backend fixes.",
      achievements: [],
      skills: ["Spring Boot", "RESTful APIs", "Backend Development"],
    },
    {
      company: "Synesis IT Ltd.",
      role: "Trainee Programmer",
      duration: "Aug 2023 – Mar 2024",
      logo: synesisLogo,
      description:
        "Built RESTful APIs using Spring Boot and fixed frontend issues with React to improve usability.",
      achievements: [],
      skills: ["Spring Boot", "React", "RESTful APIs", "Frontend Development"],
    },
    {
      company: "BdOSN Girls Programming Camp",
      role: "Programming Instructor",
      duration: "2020 – 2021",
      logo: bdosnLogo,
      description:
        "Conducted online programming classes and mentored students in problem-solving.",
      achievements: [],
      skills: ["Programming Education", "Mentoring", "Problem Solving"],
    },
  ];

  const floatingIcons = [
    { icon: <Terminal size={24} />, delay: "100" },
    { icon: <Code2 size={24} />, delay: "1000" },
    { icon: <Binary size={24} />, delay: "2000" },
    { icon: <Cpu size={24} />, delay: "3000" },
  ];

  return (
    <section className="py-20 px-4">
      {/* Animated Background Icons */}
      {floatingIcons.map((item, index) => (
        <div
          key={index}
          className={`absolute ${
            darkMode ? "text-white/10" : "text-gray-500/15"
          }`}
          style={{
            animation: `float 15s infinite linear`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          {item.icon}
        </div>
      ))}

      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h1 className={`text-4xl font-bold ${
              darkMode 
                ? "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 bg-clip-text text-transparent drop-shadow-sm"
            }`}>
              Professional Journey
            </h1>
            {!darkMode && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 bg-clip-text text-transparent opacity-20 blur-sm -z-10">
                Professional Journey
              </div>
            )}
          </div>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Timeline Line */}
          <div className={`absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b ${
            darkMode 
              ? "from-purple-400 via-pink-500 to-red-500" 
              : "from-purple-600 via-purple-500 to-purple-700"
          } transform -translate-x-1/2`}></div>

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6">
                  <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-r ${
                    darkMode 
                      ? "from-purple-400 to-pink-500" 
                      : "from-purple-600 to-purple-700"
                  } border-4 border-white dark:border-gray-300`}>
                    <div className={`absolute inset-0 w-full h-full rounded-full animate-ping bg-gradient-to-r ${
                      darkMode 
                        ? "from-purple-400 to-pink-500" 
                        : "from-purple-600 to-purple-700"
                    } opacity-75`}></div>
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`w-5/6 md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? "ml-auto" : "mr-auto"
                  }`}
                >
                  <div
                    className={`group relative rounded-xl p-6 transition-all duration-300 border hover:transform hover:scale-[1.02] ${
                      darkMode
                        ? "bg-gray-800/90 border-gray-700/50 hover:bg-gray-700/50 shadow-lg"
                        : "bg-light-surface-primary border-light-border-secondary hover:bg-light-surface-secondary shadow-card-light hover:shadow-card-hover"
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${
                      darkMode 
                        ? "from-purple-500/10 to-pink-500/10" 
                        : "from-purple-600/10 to-purple-700/10"
                    } rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    {/* Company Logo */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-white p-2">
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3
                          className={`text-xl font-semibold ${
                            darkMode ? "text-gray-200" : "text-light-text-primary"
                          }`}
                        >
                          {exp.company}
                        </h3>
                        <p
                          className={`text-lg ${
                            darkMode ? "text-purple-400" : "text-light-accent-primary"
                          }`}
                        >
                          {exp.role}
                        </p>
                      </div>
                    </div>

                    <p
                      className={`mb-4 ${
                        darkMode ? "text-gray-400" : "text-light-text-secondary"
                      }`}
                    >
                      {exp.description}
                    </p>

                    {/* Key Achievements */}
                    {exp.achievements && (
                      <div className="mb-4">
                        <h4 className={`text-sm font-semibold mb-2 ${
                          darkMode ? "text-gray-300" : "text-light-text-primary"
                        }`}>
                          Key Achievements:
                        </h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className={`flex items-start gap-2 text-sm ${
                              darkMode ? "text-gray-400" : "text-light-text-secondary"
                            }`}>
                              <span className="text-purple-400 mt-1">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.skills.map((skill, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 text-sm rounded-full border ${
                            darkMode
                              ? "bg-gray-700/50 border-gray-600 text-gray-300"
                              : "bg-light-bg-tertiary border-light-border-secondary text-light-text-primary"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div
                      className={`flex items-center gap-2 text-sm ${
                        darkMode ? "text-gray-500" : "text-light-text-tertiary"
                      }`}
                    >
                      <Calendar size={16} />
                      {exp.duration}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden relative">
          {/* Timeline Line */}
          <div className={`absolute top-0 left-8 w-1 h-full bg-gradient-to-b ${
            darkMode 
              ? "from-purple-400 via-pink-500 to-red-500" 
              : "from-purple-600 via-purple-500 to-purple-700"
          }`}></div>

          {/* Timeline Items */}
          <div className="relative">
            {experiences.map((exp, index) => (
              <div key={index} className="relative mb-16 last:mb-0">
                {/* Timeline Dot */}
                <div className="absolute left-8 transform -translate-x-1/2 w-6 h-6">
                  <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-r ${
                    darkMode 
                      ? "from-purple-400 to-pink-500" 
                      : "from-purple-600 to-purple-700"
                  } border-4 border-white dark:border-gray-300`}>
                    <div className={`absolute inset-0 w-full h-full rounded-full animate-ping bg-gradient-to-r ${
                      darkMode 
                        ? "from-purple-400 to-pink-500" 
                        : "from-purple-600 to-purple-700"
                    } opacity-75`}></div>
                  </div>
                </div>

                {/* Card */}
                <div className="ml-16">
                  <div
                    className={`group relative rounded-xl p-6 transition-all duration-300 border shadow-lg hover:shadow-xl ${
                      darkMode
                        ? "bg-gray-800/90 border-gray-700/50 hover:bg-gray-700/90"
                        : "bg-light-surface-primary border-light-border-secondary hover:bg-light-surface-secondary shadow-light-xl"
                    }`}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Company Logo */}
                      <div className="mb-4 flex justify-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-white p-2 border-4 border-purple-400/20 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                          <img
                            src={exp.logo}
                            alt={exp.company}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      <div className="text-center space-y-3">
                        <h3
                          className={`text-xl font-semibold ${
                            darkMode ? "text-gray-200" : "text-light-text-primary"
                          }`}
                        >
                          {exp.company}
                        </h3>

                        <p
                          className={`text-lg font-medium ${
                            darkMode ? "text-gray-300" : "text-light-text-secondary"
                          }`}
                        >
                          {exp.role}
                        </p>

                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-light-text-tertiary"
                          }`}
                        >
                          {exp.description}
                        </p>

                        <div
                          className={`flex items-center justify-center gap-2 text-sm ${
                            darkMode ? "text-gray-400" : "text-light-text-tertiary"
                          }`}
                        >
                          <Calendar size={16} />
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
