export const profile = {
  name: "Md Sahal",
  title: "Software Engineer II",
  company: "Brain Station 23",
  email: "mdsahal.info@gmail.com",
};
export const socials = [
  ["GitHub", "https://github.com/mesahal"],
  ["LinkedIn", "https://www.linkedin.com/in/me-sahal/"],
  ["YouTube", "https://www.youtube.com/@me__sahal"],
  ["Facebook", "https://www.facebook.com/memdsahal"],
  ["Instagram", "https://www.instagram.com/me_md_sahal"],
  ["X", "https://twitter.com/me__sahal"],
  ["WhatsApp channel", "https://whatsapp.com/channel/0029VapIAQjKgsO1w66ao52d"],
];
export const services = [
  {
    id: "product",
    label: "Launch a product",
    projectId: "accelera-gp",
    title: "Applications people enjoy using.",
    description:
      "Web applications, customer portals, and mobile experiences with the APIs that make them work.",
    detail: "Web applications · iOS · Flutter",
  },
  {
    id: "integration",
    label: "Connect my systems",
    projectId: "city-remit",
    title: "Make the moving parts work together.",
    description:
      "Backend services and integrations that connect your application to the rest of your business.",
    detail: "REST APIs · Spring Boot · Integrations",
  },
  {
    id: "automation",
    label: "Automate a workflow",
    projectId: "omnizia",
    title: "Less repetitive work. More useful output.",
    description:
      "Data-processing workflows and AI-assisted summaries designed around a clear business need.",
    detail: "Batch processing · Data workflows · AI APIs",
  },
];
export const projectsById = {
  "accelera-gp": {
    id: "accelera-gp",
    title: "Accelera GP — Noshinow",
    shortTitle: "Noshinow",
    category: "RESTAURANT PLATFORM",
    role: "Software Engineer · Professional team contribution",
    context:
      "A multi-tenant restaurant platform with a website builder, customer storefronts, and owner tools.",
    contribution:
      "I work on the website-builder experience: configurable headers, rich-text formatting, gallery presentation, and content that stays consistent from editor to published page.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    liveUrl: null,
    flow: ["Restaurant website", "Builder controls", "Saved page content"],
    result: "More control over how restaurant owners present their business.",
    notes: [
      "Sticky or static headers",
      "Bold and text-color controls",
      "Gallery and line-break improvements",
    ],
  },
  butterfly: {
    id: "butterfly",
    title: "My Butterfly",
    shortTitle: "My Butterfly",
    category: "IOS · HOME & LIFESTYLE",
    role: "iOS Developer · Professional team contribution",
    context:
      "A home-appliances app that brings shopping, rewards, and after-sales service together.",
    contribution:
      "Contributed to the iOS application through user-interface implementation, API integration, and application delivery workflows.",
    technologies: ["Swift", "SwiftUI", "iOS", "Xcode"],
    liveUrl: "https://apps.apple.com/sg/app/my-butterfly/id6800672279",
    linkLabel: "View on the App Store",
    result: "A published iOS application for Butterfly customers.",
    notes: [
      "Native iOS interfaces",
      "API-connected experiences",
      "Application delivery",
    ],
  },
  "city-remit": {
    id: "city-remit",
    title: "City Remit",
    shortTitle: "City Remit",
    category: "FINANCIAL SERVICES",
    role: "Backend Developer · Professional team contribution",
    context:
      "Backend services supporting remittance operations and transaction management from Malaysia.",
    contribution:
      "Built REST APIs and backend services for transaction workflows, working with Spring Boot, Oracle, and Vue.",
    technologies: ["Java", "Spring Boot", "Oracle", "Vue"],
    liveUrl: "https://cityremit.cblmoneytransfer.com/login",
    linkLabel: "Visit product",
    flow: ["Transfer request", "Backend services", "Transaction records"],
    result: "Connected APIs supporting remittance operations.",
    notes: [
      "REST API development",
      "Transaction workflows",
      "Backend integration",
    ],
  },
  omnizia: {
    id: "omnizia",
    title: "Omnizia",
    shortTitle: "Omnizia",
    category: "DATA & AI WORKFLOWS",
    role: "Backend Developer · Professional team contribution",
    context:
      "A medical data intelligence platform with automated data-processing workflows.",
    contribution:
      "Developed automated processing jobs and integrated OpenAI APIs for assisted summaries and intelligent workflows.",
    technologies: ["Java", "Spring Boot", "Spring Batch", "OpenAI API"],
    liveUrl: null,
    flow: ["Source data", "Batch processing", "Assisted summaries"],
    result: "Automated processing and assisted summarization workflows.",
    notes: [
      "Batch data processing",
      "OpenAI API integration",
      "Summary generation",
    ],
  },
};
export const featuredProjects = [
  "accelera-gp",
  "butterfly",
  "city-remit",
  "omnizia",
].map((id) => projectsById[id]);
export const additionalProjects = [
  {
    title: "JU Alumni Association",
    description:
      "Responsive organizational features, user workflows, and web interfaces for Jahangirnagar University alumni.",
    role: "Full Stack Developer",
    technologies: ["React", "Spring Boot", "Java", "MySQL"],
    url: "https://alumni.iitju.edu.bd/",
  },
  {
    title: "Convay",
    description:
      "Meeting scheduling APIs, recording alerts, and enterprise communication workflows.",
    role: "Full Stack Developer",
    technologies: ["Java", "Spring Boot", "MySQL", "React"],
    url: "https://convay.com/home",
  },
  {
    title: "Cardinal Tour & Travel",
    description:
      "A responsive travel and tourism platform with modern interfaces and performance-focused implementation.",
    role: "Frontend Developer",
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    url: "https://cardinaltourtravel.com/",
  },
  {
    title: "RWWS",
    description:
      "Web solutions for organizational management and public information delivery for an NGO.",
    role: "Frontend Developer",
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    url: "https://www.rwws.org.bd/",
  },
  {
    title: "Amla Kamla",
    description:
      "A responsive web application built with rapid prototyping and AI-assisted development workflows.",
    role: "Frontend Developer",
    technologies: ["React", "Tailwind CSS", "JavaScript"],
    url: "https://amla-kamla.netlify.app/",
  },
  {
    title: "Personal portfolio",
    description:
      "My evolving home for projects, professional experience, and creative work.",
    role: "Frontend Developer",
    technologies: ["React", "Tailwind CSS"],
    url: "https://mdsahal.netlify.app/",
  },
];
export const game = {
  title: "Word Detective",
  subtitle: "Word Puzzle",
  url: "https://play.google.com/store/apps/details?id=com.mdsahal.worddetective",
};
export const experience = [
  {
    company: "Brain Station 23",
    role: "Software Engineer II",
    start: "2024-04",
    end: null,
    description:
      "Current title; company tenure shown. API development, data workflows, web applications, and mobile experiences across professional team projects.",
  },
  {
    company: "Synesis IT",
    role: "Trainee Programmer",
    start: "2023-08",
    end: "2024-03",
    description:
      "Contributed to Convay: meeting scheduling APIs, recording alerts, and real-time session improvements.",
  },
  {
    company: "BdOSN Girls Programming Camp",
    role: "Programming Instructor",
    start: "2020",
    end: "2021",
    description:
      "Mentored 100+ students in algorithms and competitive programming.",
  },
];
export const dateLabel = (value) =>
  value.length === 4
    ? value
    : new Intl.DateTimeFormat("en", {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(`${value}-01T00:00:00Z`));
