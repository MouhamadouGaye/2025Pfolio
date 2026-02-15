export interface NavItem {
  title: string;
  href: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "devops" | "finance";
  lucideIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: "frontend" | "backend" | "fullstack" | "business";
  link?: string;
  githubLink?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string[];
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

export interface MockBlogPost {
  id: number;
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface BlogPost {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  media_url: string;
  created_at: string;
  user_id: Number;
  tags: ["Microservices", "Spring Boot", "Java"];
}
