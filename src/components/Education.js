import { GraduationCap, Calendar, Building2, BookOpen } from "lucide-react";
import ju from "../assets/optimized/ju.png";
import ndc from "../assets/optimized/ndc.png";
import frii from "../assets/optimized/frii.jpeg";

const Education = ({ darkMode }) => {
  const education = [
    {
      institution: "Jahangirnagar University",
      degree: "Bachelor of Science in Information Technology",
      duration: "February 2018 - March 2023",
      logo: ju,
      icon: GraduationCap,
      description: "CGPA: 3.51 out of 4.00",
    },
    {
      institution: "Notre Dame College",
      degree: "HSC ~ Science",
      duration: "2015 - 2017",
      logo: ndc,
      icon: Building2,
      description: "GPA: 5.00 out of 5.00",
    },
    {
      institution: "Faizur Rahman Ideal Institute",
      degree: "SSC ~ Science",
      duration: "2007 - 2014",
      logo: frii,
      icon: BookOpen,
      description: "GPA: 5.00 out of 5.00",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-center gap-3 mb-24">
          <GraduationCap className={`w-10 h-10 ${
            darkMode ? "text-purple-400" : "text-purple-600"
          }`} />
          <div className="relative">
            <h1 className={`text-4xl font-bold ${
              darkMode 
                ? "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 bg-clip-text text-transparent drop-shadow-sm"
            }`}>
              Educational Journey
            </h1>
            {!darkMode && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 bg-clip-text text-transparent opacity-20 blur-sm -z-10">
                Educational Journey
              </div>
            )}
          </div>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Timeline Line */}
          <div className={`absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b ${
            darkMode 
              ? "from-purple-400 via-pink-500 to-red-500" 
              : "from-purple-600 via-purple-500 to-purple-700"
          } transform -translate-x-1/2`}></div>

          {/* Timeline Items */}
          <div className="relative">
            {education.map((edu, index) => {
              const Icon = edu.icon;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`flex items-center mb-16 last:mb-0 ${
                    isLeft ? "justify-start" : "justify-end"
                  }`}
                >
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
                    className={`w-[calc(50%-3rem)] ${
                      isLeft ? "mr-auto pr-8" : "ml-auto pl-8"
                    }`}
                  >
                    <div
                      className={`relative group rounded-xl p-6 transition-all duration-300 border ${
                        darkMode
                          ? "bg-gray-800/90 border-gray-700/50 hover:bg-gray-700/90 shadow-lg hover:shadow-xl"
                          : "bg-white/95 border-light-border-secondary hover:bg-light-surface-secondary shadow-card-light hover:shadow-card-hover"
                      }`}
                    >
                      {/* Gradient overlay on hover */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${
                        darkMode 
                          ? "from-purple-500/10 to-pink-500/10" 
                          : "from-purple-600/10 to-purple-700/10"
                      } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Institution Logo */}
                        <div className="mb-4 flex justify-center">
                          <div className={`w-24 h-24 rounded-full overflow-hidden bg-white p-2 border-4 ${
                            darkMode 
                              ? "border-purple-400/20" 
                              : "border-purple-600/20"
                          } shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                            <img
                              src={edu.logo}
                              alt={edu.institution}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>

                        <div className="text-center space-y-3">
                          <div className="flex items-center justify-center gap-2">
                            <Icon className={`${
                              darkMode ? "text-purple-400" : "text-purple-600"
                            }`} size={20} />
                            <h3
                              className={`text-xl font-semibold ${
                                darkMode ? "text-gray-200" : "text-light-text-primary"
                              }`}
                            >
                              {edu.institution}
                            </h3>
                          </div>

                          <p
                            className={`text-lg font-medium ${
                              darkMode ? "text-gray-300" : "text-light-text-secondary"
                            }`}
                          >
                            {edu.degree}
                          </p>

                          {/* <p
                            className={`text-sm font-semibold ${
                              darkMode ? "text-purple-400" : "text-purple-600"
                            }`}
                          >
                            {edu.description}
                          </p> */}

                          <div
                            className={`flex items-center justify-center gap-2 text-sm ${
                              darkMode ? "text-gray-400" : "text-light-text-tertiary"
                            }`}
                          >
                            <Calendar size={16} />
                            <span>{edu.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden relative">
          {/* Timeline Line */}
          <div className={`absolute top-0 left-8 w-1 h-full bg-gradient-to-b ${
            darkMode 
              ? "from-purple-400 via-pink-500 to-red-500" 
              : "from-purple-600 via-purple-500 to-purple-700"
          }`}></div>

          {/* Timeline Items */}
          <div className="relative">
            {education.map((edu, index) => {
              const Icon = edu.icon;
              return (
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
                      className={`relative group rounded-xl p-6 transition-all duration-300 border ${
                        darkMode
                          ? "bg-gray-800/90 border-gray-700/50 hover:bg-gray-700/90 shadow-lg hover:shadow-xl"
                          : "bg-white/95 border-light-border-secondary hover:bg-light-surface-secondary shadow-card-light hover:shadow-card-hover"
                      }`}
                    >
                      {/* Gradient overlay on hover */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${
                        darkMode 
                          ? "from-purple-500/10 to-pink-500/10" 
                          : "from-purple-600/10 to-purple-700/10"
                      } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Institution Logo */}
                        <div className="mb-4 flex justify-center">
                          <div className={`w-24 h-24 rounded-full overflow-hidden bg-white p-2 border-4 ${
                            darkMode 
                              ? "border-purple-400/20" 
                              : "border-purple-600/20"
                          } shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                            <img
                              src={edu.logo}
                              alt={edu.institution}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>

                        <div className="text-center space-y-3">
                          <div className="flex items-center justify-center gap-2">
                            <Icon className={`${
                              darkMode ? "text-purple-400" : "text-purple-600"
                            }`} size={20} />
                            <h3
                              className={`text-xl font-semibold ${
                                darkMode ? "text-gray-200" : "text-light-text-primary"
                              }`}
                            >
                              {edu.institution}
                            </h3>
                          </div>

                          <p
                            className={`text-lg font-medium ${
                              darkMode ? "text-gray-300" : "text-light-text-secondary"
                            }`}
                          >
                            {edu.degree}
                          </p>

                          {/* <p
                            className={`text-sm font-semibold ${
                              darkMode ? "text-purple-400" : "text-purple-600"
                            }`}
                          >
                            {edu.description}
                          </p> */}

                          <div
                            className={`flex items-center justify-center gap-2 text-sm ${
                              darkMode ? "text-gray-400" : "text-light-text-tertiary"
                            }`}
                          >
                            <Calendar size={16} />
                            <span>{edu.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
