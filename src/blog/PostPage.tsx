// export default PostPage;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { getPost } from "../api/kobe-blog";
import "./PostPage.css";

export const dummyPosts = [
  {
    id: "1",
    title: "Building Scalable Microservices with Spring Boot",
    author: "John Doe",
    date: "15/03/2024",
    readTime: "8 min read",
    imageUrl:
      "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    excerpt:
      "Learn how to design resilient microservices with Spring Boot, Docker, and modern cloud-native practices.",
    content: `
Microservices have become the standard architecture for building modern enterprise applications because they improve scalability, resilience, and deployment flexibility.

In this article, we explore:

• Structuring Spring Boot services
• Service discovery with Eureka
• API Gateway routing
• Centralized configuration
• Docker containerization
• Kubernetes deployment strategies

We'll also discuss communication patterns using REST and messaging systems such as RabbitMQ and Kafka, as well as monitoring with Spring Boot Actuator and Prometheus.

By the end of this guide you'll understand how to design scalable services that remain maintainable as your application grows.
`,
    tags: ["Spring Boot", "Microservices", "Java"],
  },

  {
    id: "2",
    title: "Financial Technology: The Future of Digital Banking",
    author: "Jane Smith",
    date: "10/03/2024",
    readTime: "6 min read",
    imageUrl:
      "https://images.pexels.com/photos/7567444/pexels-photo-7567444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    excerpt:
      "Discover how AI, blockchain, and digital payments are transforming financial services worldwide.",
    content: `
Financial technology has dramatically changed how consumers interact with banks and financial institutions.

This article covers:

• Mobile banking platforms
• AI-powered fraud detection
• Blockchain applications
• Instant payment systems
• Digital lending
• Open Banking APIs

We'll also examine how startups and traditional banks compete while delivering faster, safer, and more personalized financial experiences.
`,
    tags: ["FinTech", "Banking", "Technology"],
  },

  {
    id: "3",
    title: "Mastering React Performance Optimization",
    author: "Alex Johnson",
    date: "28/02/2024",
    readTime: "9 min read",
    imageUrl:
      "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    excerpt:
      "Improve React application performance using memoization, lazy loading, virtualization, and efficient rendering techniques.",
    content: `
As React applications grow, performance becomes increasingly important.

In this guide you'll learn:

• React.memo and useMemo
• useCallback best practices
• Code splitting with React.lazy
• Route-based lazy loading
• Virtualizing long lists
• Preventing unnecessary re-renders

We'll also measure performance using React DevTools Profiler and Lighthouse to identify bottlenecks before they affect users.
`,
    tags: ["React", "Performance", "JavaScript"],
  },

  {
    id: "4",
    title: "Getting Started with Docker for Full-Stack Developers",
    author: "Michael Brown",
    date: "20/02/2024",
    readTime: "7 min read",
    imageUrl:
      "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    excerpt:
      "Learn how Docker simplifies development, testing, and deployment by creating reproducible application environments.",
    content: `
Docker has become an essential tool for modern software development.

Topics covered include:

• Images vs Containers
• Writing Dockerfiles
• Docker Compose
• Networking containers
• Managing volumes
• Deploying applications consistently

You'll build a complete full-stack application running React, Spring Boot, and PostgreSQL inside Docker containers, making local development and production deployments much easier.
`,
    tags: ["Docker", "DevOps", "Full Stack"],
  },
];
// export default function PostPage() {

//   const { id } = useParams();
//   const [post, setPost] = useState<any>(null);

//   useEffect(() => {
//     getPost(id).then(setPost);
//   }, [id]);

//   if (!post) return <p>Loading...</p>;

//   return (
//     <div className="article-container">
//       <img className="article-image" src={post.imageUrl} />

//       <h1 className="article-title">{post.title}</h1>

//       <p className="article-content">{post.content}</p>
//     </div>
//   );
// }
export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const foundPost = dummyPosts.find((p) => p.id === id);
    setPost(foundPost);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Post not found.
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <article className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-[450px] object-cover"
          />

          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-5 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">{post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-10">
              <p className="whitespace-pre-line text-lg leading-9 text-gray-700 dark:text-gray-300">
                {post.content}
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
