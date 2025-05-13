import { NavItem, Skill, Project, Experience, Education } from "../types";
import {
  Code,
  LayoutDashboard,
  Server,
  LineChart,
  Briefcase,
  Lightbulb,
} from "lucide-react";

export const NAV_ITEMS: NavItem[] = [
  { title: "Home", href: "#home" },
  { title: "About", href: "#about" },
  { title: "Skills", href: "#skills" },
  { title: "Projects", href: "#projects" },
  { title: "Experience", href: "#experience" },
  { title: "Contact", href: "#contact" },
];

export const SKILLS: Skill[] = [
  { name: "JavaScript", icon: "javascript", category: "frontend" },
  { name: "TypeScript", icon: "typescript", category: "frontend" },
  { name: "React", icon: "react", category: "frontend" },
  { name: "Next.js", icon: "next", category: "frontend" },
  { name: "Angular", icon: "angular", category: "frontend" },
  { name: "CSS/SCSS", icon: "css", category: "frontend" },
  { name: "HTML5", icon: "html", category: "frontend" },
  { name: "Python", icon: "python", category: "backend" },
  { name: "Flask", icon: "flask", category: "backend" },
  { name: "FastAPI", icon: "api", category: "backend" },
  { name: "Java", icon: "java", category: "backend" },
  { name: "Spring Boot", icon: "spring", category: "backend" },
  { name: "Node.js", icon: "node", category: "backend" },
  { name: "SQL", icon: "database", category: "backend" },
  { name: "Git", icon: "git", category: "devops" },
  { name: "Docker", icon: "docker", category: "devops" },
  { name: "AWS", icon: "cloud", category: "devops" },
  { name: "Financial Analysis", icon: "chart", category: "other" },
  { name: "Bus Strategy", icon: "strategy", category: "other" },
];

export const PROJECTS: Project[] = [
  {
    id: "project1",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with inventory management, payment processing, and analytics dashboard.",
    image:
      "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
    category: "fullstack",
    link: "https://example.com/ecommerce",
    githubLink: "https://github.com/username/ecommerce",
  },
  {
    id: "project2",
    title: "Financial Dashboard",
    description:
      "Interactive dashboard providing real-time financial data visualization and investment tracking.",
    image:
      "https://images.pexels.com/photos/7567444/pexels-photo-7567444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Angular", "TypeScript", "D3.js", "Spring Boot"],
    category: "business",
    link: "https://example.com/finance-dashboard",
    githubLink: "https://github.com/username/finance-dashboard",
  },
  {
    id: "project3",
    title: "Inventory Management System",
    description:
      "Enterprise-level inventory management system with barcode scanning, analytics, and forecasting.",
    image:
      "https://images.pexels.com/photos/4480505/pexels-photo-4480505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["React", "FastAPI", "PostgreSQL", "Docker"],
    category: "fullstack",
    link: "https://example.com/inventory-system",
    githubLink: "https://github.com/username/inventory-system",
  },
  {
    id: "project4",
    title: "Business Intelligence Tool",
    description:
      "A tool that helps businesses make data-driven decisions through interactive reports and visualizations.",
    image:
      "https://images.pexels.com/photos/5849577/pexels-photo-5849577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Next.js", "Python", "Pandas", "Tableau"],
    category: "business",
    link: "https://example.com/bi-tool",
    githubLink: "https://github.com/username/bi-tool",
  },
  {
    id: "project5",
    title: "Microservices Architecture",
    description:
      "Redesigned monolithic application into scalable microservices with improved performance and reliability.",
    image:
      "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    technologies: ["Java", "Spring Boot", "Kubernetes", "RabbitMQ"],
    category: "backend",
    githubLink: "https://github.com/username/microservices-demo",
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp1",
    title: "Senior Software Engineer",
    company: "Tech Innovations Inc.",
    duration: "2020 - Present",
    description: [
      "Lead a team of 5 developers in building and maintaining core products",
      "Architected and implemented microservices-based solutions using Spring Boot and Docker",
      "Improved application performance by 40% through code optimization and caching strategies",
      "Collaborated with product and design teams to implement new features and improvements",
    ],
    skills: [
      "Java",
      "Spring Boot",
      "Microservices",
      "Docker",
      "React",
      "Team Leadership",
    ],
  },
  {
    id: "exp2",
    title: "Full-Stack Developer",
    company: "Digital Solutions LLC",
    duration: "2018 - 2020",
    description: [
      "Developed and maintained web applications using React, Node.js, and MongoDB",
      "Implemented RESTful APIs and integrated third-party services",
      "Created responsive UI components and improved user experience",
      "Participated in code reviews and mentored junior developers",
    ],
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "REST APIs"],
  },
  {
    id: "exp3",
    title: "Financial Analyst",
    company: "Global Finance Partners",
    duration: "2016 - 2018",
    description: [
      "Conducted financial analyses and prepared reports for executive decision-making",
      "Developed Excel models for financial forecasting and scenario analysis",
      "Collaborated with IT team to automate reporting processes using Python scripts",
      "Presented financial insights to management and stakeholders",
    ],
    skills: [
      "Financial Analysis",
      "Excel Modeling",
      "Python",
      "Data Visualization",
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    degree: "MBA in Finance",
    institution: "IEAM Paris",
    year: "2019",
    description:
      "Focused on financial management, investment analysis, and business strategy",
  },
  {
    degree: " Master Econimics & Management",
    institution: "FASEG",
    year: "2016",
    description:
      "Focused on public and private financial management, and business strategy",
  },
  {
    degree: "BSc in Computer Science",
    institution: "Ucad",
    year: "2014",
    description: "Specialized in software engineering and data structures",
  },
];

export const SKILL_CATEGORIES = [
  { id: "frontend", name: "Frontend", icon: LayoutDashboard },
  { id: "backend", name: "Backend", icon: Server },
  { id: "devops", name: "DevOps", icon: Code },
  { id: "other", name: "Business", icon: Briefcase },
];

export const PROJECT_CATEGORIES = [
  { id: "all", name: "All Projects" },
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
  { id: "fullstack", name: "Full Stack" },
  { id: "business", name: "Business" },
];
