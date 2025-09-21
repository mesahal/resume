import React from "react";
import {
  Code2,
  ChevronLeft,
  ChevronRight,
  Database,
  Globe,
  Server,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import cityremit from "../assets/optimized/cityremit.png";
import convay from "../assets/convay.webp";
import healthcare from "../assets/optimized/healthcare.png";
import omnizia from "../assets/optimized/Omnizia.webp";
import myLogo from "../assets/optimized/myLogo.webp";

const Work = ({ darkMode }) => {

  const professionalProjects = [
    {
      title: "Omnizia",
      description:
        "A business management platform where I developed backend microservices and integrated CI/CD pipelines for deployment.",
      image: omnizia,
      technologies: ["Java", "Spring Boot", "PostgreSQL", "React"],
      features: [
        "Backend microservices development",
        "CI/CD pipeline integration",
        "Business management features",
        "Scalable architecture",
      ],
      role: "Backend Developer",
      links: {
        live: "#",
      },
      icons: [
        { Icon: Server, color: "text-blue-400" },
        { Icon: Database, color: "text-red-400" },
        { Icon: Globe, color: "text-green-400" },
      ],
    },
    {
      title: "City Remit",
      description:
        "Financial application for transferring remittances from Malaysia. Built APIs, added features, and fixed backend bugs.",
      image: cityremit,
      technologies: ["Java", "Spring Boot", "Oracle", "Vue"],
      features: [
        "Remittance transfer system",
        "API development",
        "Backend bug fixes",
        "Feature enhancements",
      ],
      role: "Backend Developer",
      links: {
        live: "https://cityremit.cblmoneytransfer.com/login",
      },
      icons: [
        { Icon: Server, color: "text-blue-400" },
        { Icon: Database, color: "text-red-400" },
        { Icon: Globe, color: "text-green-400" },
      ],
    },
    {
      title: "Convay",
      description:
        "Video conferencing platform for individuals and enterprises. Developed RESTful APIs and fixed frontend bugs.",
      image: convay,
      technologies: ["Java", "Spring Boot", "MySQL", "React"],
      features: [
        "Video conferencing platform",
        "RESTful API development",
        "Frontend bug fixes",
        "Enterprise features",
      ],
      role: "Full Stack Developer",
      links: {
        live: "https://convay.com/home",
      },
      icons: [
        { Icon: Globe, color: "text-purple-400" },
        { Icon: Server, color: "text-yellow-400" },
        { Icon: Database, color: "text-cyan-400" },
      ],
    },
    {
      title: "Health Care",
      description:
        "Doctor appointment platform with BMDC validation. Implemented backend features and collaborated with frontend team.",
      image: healthcare,
      technologies: [
        "Java",
        "Spring Boot",
        "PostgreSQL",
        "React",
      ],
      features: [
        "Doctor appointment booking",
        "BMDC validation system",
        "Backend feature implementation",
        "Frontend collaboration",
      ],
      role: "Full Stack Developer",
      links: {
        live: "https://github.com/LnD-Brainstaiton/Health-Care",
      },
      icons: [
        { Icon: Database, color: "text-emerald-400" },
        { Icon: Server, color: "text-pink-400" },
        { Icon: Globe, color: "text-orange-400" },
      ],
    },
    {
      title: "Portfolio",
      description:
        "Built a personal portfolio website to showcase projects and achievements.",
      image: myLogo,
      technologies: ["React", "Tailwind"],
      features: [
        "Personal portfolio website",
        "Project showcase",
        "Achievement display",
        "Responsive design",
      ],
      role: "Frontend Developer",
      links: {
        live: "https://mdsahal.netlify.app/",
      },
      icons: [
        { Icon: Globe, color: "text-purple-400" },
        { Icon: Code2, color: "text-pink-400" },
      ],
    },
  ];


  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <h1 className={`text-4xl font-bold ${
              darkMode 
                ? "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 bg-clip-text text-transparent drop-shadow-sm"
            }`}>
              Professional Projects
            </h1>
            {!darkMode && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 bg-clip-text text-transparent opacity-20 blur-sm -z-10">
                Professional Projects
              </div>
            )}
          </div>
        </div>

        {/* Professional Projects Carousel */}
        <div className="mb-20">
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full transition-all duration-300 ${
                darkMode
                  ? "bg-gray-800/80 hover:bg-gray-700/80 text-white"
                  : "bg-white/80 hover:bg-white text-light-text-primary"
              } shadow-card-light hover:shadow-card-hover work-swiper-button-prev`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full transition-all duration-300 ${
                darkMode
                  ? "bg-gray-800/80 hover:bg-gray-700/80 text-white"
                  : "bg-white/80 hover:bg-white text-light-text-primary"
              } shadow-card-light hover:shadow-card-hover work-swiper-button-next`}
            >
              <ChevronRight size={24} />
            </button>

            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: ".work-swiper-button-prev",
                nextEl: ".work-swiper-button-next",
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              className="w-full max-w-5xl mx-auto"
            >
              {professionalProjects.map((project, index) => (
                <SwiperSlide key={index} className="w-full max-w-3xl">
                  <div
                    className={`rounded-xl overflow-hidden transition-all duration-300 ${
                      darkMode
                        ? "bg-gray-800/50 border border-gray-700/50"
                        : "bg-white/95 border border-light-border-secondary shadow-card-light"
                    }`}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent z-10" />
                      <div className="absolute top-4 right-4 z-20 flex gap-2">
                        {project.icons.map(({ Icon, color }, i) => (
                          <Icon key={i} className={`w-6 h-6 ${color}`} />
                        ))}
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <Code2 className="text-purple-400" size={24} />
                        <h3
                          className={`text-2xl font-bold ${
                            darkMode ? "text-gray-200" : "text-light-text-primary"
                          }`}
                        >
                          {project.title}
                        </h3>
                      </div>

                      <div className="mb-6">
                        <p
                          className={`text-lg mb-4 ${
                            darkMode ? "text-gray-300" : "text-light-text-secondary"
                          }`}
                        >
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className={`px-3 py-1 text-sm rounded-full border ${
                                darkMode
                                  ? "bg-gray-700/50 border-gray-600 text-gray-300"
                                  : "bg-light-bg-tertiary border-light-border-secondary text-light-text-primary"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div
                        className={`space-y-2 ${
                          darkMode ? "text-gray-400" : "text-light-text-secondary"
                        }`}
                      >
                        <h4 className={`font-semibold ${
                          darkMode ? "text-purple-400" : "text-purple-600"
                        }`}>
                          Key Features:
                        </h4>
                        <ul className="list-disc list-inside space-y-1">
                          {project.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Links */}
                      {project.links && project.links.live && project.links.live !== "#" && (
                        <div className="mt-6">
                          <h4 className={`font-semibold mb-3 ${
                            darkMode ? "text-purple-400" : "text-purple-600"
                          }`}>
                            Project Link:
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            <a
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
                            >
                              <Globe size={16} />
                              View Project
                            </a>
                          </div>
                        </div>
                      )}

                      <div className="mt-6 pt-6 border-t border-gray-700/50">
                        <p
                          className={`flex items-center gap-2 font-bold ${
                            darkMode ? "text-orange-400" : "text-light-text-primary"
                          }`}
                        >
                          <span className={`font-semibold ${
                            darkMode ? "text-purple-400" : "text-purple-600"
                          }`}>
                            Role:
                          </span>
                          {project.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Other Projects */}
        {/* <div>
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Other Notable Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProjects.map((project, index) => (
              <div
                key={index}
                className={`group rounded-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all duration-300 border ${
                  darkMode
                    ? "bg-gray-800/50 border-gray-700/50"
                    : "bg-white/80 border-gray-200/50"
                }`}
              >
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Code2 className="text-purple-400" size={20} />
                    <h3
                      className={`text-xl font-semibold ${
                        darkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {project.title}
                    </h3>
                  </div>

                  <p
                    className={`mb-4 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`px-2 py-1 text-xs rounded-full border ${
                          darkMode
                            ? "bg-gradient-to-r from-purple-400/20 to-pink-500/20 text-gray-300 border-purple-500/20"
                            : "bg-gradient-to-r from-purple-400/10 to-pink-500/10 text-gray-600 border-purple-500/10"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-pink-400 transition-colors"
                  >
                    Learn More
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Work;
