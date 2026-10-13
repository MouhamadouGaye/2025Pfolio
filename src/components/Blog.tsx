import { useRef, useState, useEffect } from "react";
import { useIntersectionObserver } from "../utils/hooks";
import { BookOpen, Clock, Tag } from "lucide-react";
import type { MockBlogPost } from "../types";
import { getPosts } from "../first-api/kobe-blog";

interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
  author: string;
  readTime: string;
  date: Date;
  tags: string[];
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [mockPosts, setMockPosts] = useState<MockBlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const blogRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(blogRef, { threshold: 0.1 });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("http://127.0.0.1:8000/api/users/2/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
        console.log("Reel post from a backend: ", posts);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch blog posts",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  // const triggers = "http://blog-frontend-site.storage.googleapis.com/posts";

  // Temporary mock data while API is not available
  useEffect(() => {
    //     const mockPosts: MockBlogPost[] = [
    //       {
    //         id: 1,
    //         title: "Building Scalable Microservices with Spring Boot",
    //         content:
    //           "Learn how to design and implement scalable microservices architecture using Spring Boot and best practices...",
    //         image:
    //           "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //         author: "John Doe",
    //         date: "2024-03-15",
    //         readTime: "8 min read",
    //         tags: ["Microservices", "Spring Boot", "Java"],
    //       },
    //       {
    //         id: 2,
    //         title: "Financial Technology: The Future of Banking",
    //         content:
    //           "Exploring how modern technology is reshaping the banking industry and creating new opportunities...",
    //         image:
    //           "https://images.pexels.com/photos/7567444/pexels-photo-7567444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //         author: "Jane Smith",
    //         date: "2024-03-10",
    //         readTime: "6 min read",
    //         tags: ["FinTech", "Banking", "Technology"],
    //       },
    //       {
    //         id: "3",
    //         title: "Mastering React Performance Optimization",
    //         author: "Alex Johnson",
    //         date: "28/02/2024",
    //         readTime: "9 min read",
    //         image:
    //           "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //         excerpt:
    //           "Improve React application performance using memoization, lazy loading, virtualization, and efficient rendering techniques.",
    //         content: `
    // As React applications grow, performance becomes increasingly important.

    // In this guide you'll learn:

    // `,
    //         tags: ["React", "Performance", "JavaScript"],
    //       },

    //       {
    //         id: "4",
    //         title: "Getting Started with Docker for Full-Stack Developers",
    //         author: "Michael Brown",
    //         date: "20/02/2024",
    //         readTime: "7 min read",
    //         image:
    //           "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //         excerpt:
    //           "Learn how Docker simplifies development, testing, and deployment by creating reproducible application environments.",
    //         content: `
    // Docker has become an essential tool for modern software development.

    // `,
    //         tags: ["Docker", "DevOps", "Full Stack"],
    //       },
    //     ];
    const mockPosts: MockBlogPost[] = [
      {
        id: "1",
        title: "Editor — A Smarter Space to Write, Create, and Collaborate",
        author: "Mouhamadou Gaye",
        date: "13/10/2026",
        readTime: "10 min read",
        image: "https://mouhamadougaye.com/assets/editor.png",
        excerpt:
          "A next-generation document editor designed to transform how people write, organize ideas, collaborate in real time, and turn raw thoughts into polished, professional documents.",
        content: `
Writing should be more than typing words on a blank page. It should be an intelligent, seamless experience that helps people transform ideas into meaningful work.



Editor is a modern document creation and collaboration platform designed for students, developers, professionals, researchers, teams, and anyone who works with information. It combines the flexibility of a traditional word processor with the speed, intelligence, and collaborative capabilities expected from modern software.

You can explore the application here:
[Try Editor](https://app.avecsonko.org/)

Visit the [official website](https://mouhamadougaye.com/)
to learn more about the project.

THE VISION

The goal of Editor is to create a unified workspace where writing, editing, organizing, and sharing documents feel natural. Instead of switching between multiple applications to draft content, review feedback, manage documents, and collaborate with others, users can bring their entire writing workflow into one environment.

CORE FEATURES

• Rich Document Editing: Create beautifully structured documents with headings, paragraphs, lists, quotations, tables, links, images, and customizable formatting.

• Real-Time Collaboration: Allow multiple people to work on the same document, see changes as they happen, and collaborate without constantly exchanging files.

• Intelligent Writing Assistance: Help users improve clarity, correct grammatical mistakes, refine tone, summarize lengthy sections, and develop ideas more effectively.

• Comments and Suggestions: Enable contextual feedback, collaborative reviews, suggested edits, and structured discussions directly within documents.

• Version History: Track document changes, review previous versions, understand how content evolved, and restore earlier work when necessary.

• Flexible Document Organization: Organize documents into workspaces, folders, projects, and collections so important information remains accessible.

• Seamless Sharing: Share documents using configurable permissions, collaborative links, and controlled access for individuals or teams.

• Responsive Experience: Provide a consistent editing experience across desktop, tablet, and mobile devices.

• Productivity-Focused Interface: Keep frequently used tools accessible while reducing unnecessary interface complexity and distractions.

WHAT MAKES EDITOR DIFFERENT?

Traditional document editors often focus primarily on formatting and content creation. Editor takes a broader approach by treating writing as an entire workflow, from the first idea to collaboration, revision, and publication.

The long-term vision is to integrate intelligent assistance, reusable document templates, advanced organization, and collaborative workflows into a single cohesive experience.

POTENTIAL USE CASES

Students can write assignments and collaborate on research. Developers can maintain technical documentation and project notes. Businesses can prepare proposals, reports, and internal documentation. Creative professionals can organize ideas, develop drafts, and refine content with collaborators.

THE TECHNOLOGY BEHIND THE EXPERIENCE

A robust implementation can combine a responsive React-based interface, a structured document model, reusable editing components, and a backend capable of handling document persistence, permissions, and collaborative updates.

Real-time editing can be supported through operational transformation or conflict-free replicated data types, while document history, autosaving, and synchronization help protect users' work.

THE FUTURE OF WRITING

Editor is built around a simple ambition: make creating great documents easier, collaboration more natural, and information more useful.

It is not just a place to write. It is a workspace for turning ideas into finished work.
`,
        tags: [
          "Editor",
          "Productivity",
          "Collaboration",
          "Document Management",
          "AI",
        ],
      },

      {
        id: "2",
        title: "Call — Redefining Video Meetings and Real-Time Collaboration",
        author: "Mouhamadou Gaye",
        date: "13/10/2026",
        readTime: "12 min read",
        image: "https://mouhamadougaye.com/assets/call.png",
        excerpt:
          "A next-generation communication platform that goes beyond conventional video meetings with intelligent meeting assistance, interactive collaboration spaces, persistent meeting context, and tools that help teams turn conversations into results.",
        content: `
Communication is at the center of modern work, but a video call is only one part of a productive meeting. Teams also need context, shared materials, decisions, follow-up tasks, and a reliable way to continue working after everyone disconnects.



Call is envisioned as an enhanced communication and collaboration platform that brings video conferencing, audio calls, messaging, screen sharing, and collaborative workspaces together.

Rather than treating every meeting as an isolated event, Call aims to connect conversations with the work they create.

THE VISION

Call is designed for distributed teams, remote workers, educators, businesses, developers, and communities that need more than a traditional video conferencing tool.

Its central idea is simple: meetings should help people make progress, not merely bring people into the same virtual room.

CORE FEATURES

• High-Quality Video and Audio: Deliver reliable real-time communication with adaptive quality, noise suppression, echo cancellation, and bandwidth-aware streaming.

• Smart Meeting Rooms: Create persistent meeting spaces for teams, projects, classrooms, and recurring discussions, with reusable settings and contextual resources.

• Interactive Screen Sharing: Share an entire screen, a specific application, or a presentation while allowing participants to discuss content and collaborate.

• Live Chat and Reactions: Combine video with contextual messaging, emoji reactions, questions, and lightweight interactions that keep conversations engaging.

• Collaborative Whiteboards: Let participants sketch diagrams, brainstorm ideas, map workflows, and explain complex concepts without leaving the meeting.

• AI Meeting Assistance: With appropriate consent, generate summaries, identify key discussion points, extract decisions, and suggest follow-up tasks.

• Searchable Meeting History: Organize meeting recordings, transcripts, shared files, notes, and decisions so teams can revisit important information.

• Integrated Task Management: Turn agreed actions into trackable tasks, assign owners, set deadlines, and connect follow-up work to the original discussion.

• Flexible Participation: Support scheduled meetings, instant calls, guest access, reusable room links, and convenient transitions between conversations.

• Privacy and Access Controls: Provide waiting rooms, host controls, participant permissions, secure meeting links, and clear recording and transcription consent settings.

• Cross-Device Experience: Support desktop and mobile participation while adapting layouts and controls to the available screen size.

• Inclusive Communication: Offer live captions, keyboard-accessible controls, and features that make meetings more accessible to different participants.

BEYOND TRADITIONAL VIDEO CONFERENCING

Call's distinguishing idea is the integration of communication and execution.

A typical meeting might involve sharing a design, discussing proposed changes, assigning implementation tasks, and documenting the final decision. In Call, these activities can be connected rather than scattered across disconnected tools.

A meeting could produce a structured summary, a list of decisions, assigned tasks, and links to the relevant shared materials. Participants could return later and understand not only what was discussed, but also what happened afterward.

This approach makes Call useful for more than scheduled meetings. It can become a persistent collaboration environment for ongoing projects.

REAL-WORLD APPLICATIONS

Remote teams can coordinate projects without losing important decisions in chat histories. Teachers can combine live lessons with shared notes and interactive whiteboards. Product teams can review prototypes and document feedback. Developers can troubleshoot issues through screen sharing and collaborative debugging. Organizations can run workshops and planning sessions with clear outcomes.

TECHNICAL FOUNDATION

A production-grade implementation could use WebRTC for real-time audio and video, with an appropriate signaling service to establish connections between participants.

A scalable architecture may include a selective forwarding unit (SFU) for group calls, a messaging layer for chat and presence, persistent storage for meeting metadata, and object storage for recordings when enabled.

Adaptive bitrate, connection recovery, monitoring, authorization, and secure media transport are essential to delivering a dependable experience.

Intelligent meeting summaries and transcription can be added through carefully integrated services, with transparent controls over recording, retention, and data access.

THE FUTURE OF MEETINGS

Call aims to transform online meetings from temporary conversations into productive collaborative sessions.

The ambition is not simply to reproduce existing conferencing applications. It is to create a connected environment where people can communicate, think together, make decisions, and move directly into meaningful work.

You can explore the application here:
[Try Editor](https://app.avecsonko.org/call)

Visit the [official website](https://mouhamadougaye.com/)
to learn more about the project.
`,
        tags: [
          "Call",
          "Video Conferencing",
          "WebRTC",
          "Real-Time Communication",
          "Collaboration",
          "AI",
        ],
      },
      {
        id: "2",
        title: "Financial Technology: The Future of Digital Banking",
        author: "Jane Smith",
        date: "10/03/2024",
        readTime: "6 min read",
        image:
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
        title: "Sheet — A More Intelligent Way to Work with Data",
        author: "Mouhamadou Gaye",
        date: "13/10/2026",
        readTime: "13 min read",
        image: "https://mouhamadougaye.com/assets/sheet.png",
        excerpt:
          "A modern spreadsheet platform that aims to move beyond traditional grids through intelligent formulas, interactive visualizations, collaborative data workflows, automation, and a more accessible approach to analysis.",
        content: `
Spreadsheets are among the most useful tools in modern work. They help people manage budgets, analyze business performance, organize information, track projects, and make decisions.

However, as datasets and workflows become more complex, traditional spreadsheets can become difficult to maintain. Complicated formulas, disconnected files, repetitive data entry, and hard-to-understand reports can turn simple tasks into time-consuming processes.

Sheet is envisioned as a next-generation spreadsheet and data workspace that combines the flexibility of a familiar spreadsheet with intelligent analysis, automation, visualization, and collaborative workflows.

You can explore the application here:
[Try Editor](https://app.avecsonko.org/sheet)

Visit the [official website](https://mouhamadougaye.com/)
to learn more about the project.

THE VISION

Sheet aims to make working with data more powerful without making it more complicated.

It is designed for students, analysts, business owners, project managers, researchers, developers, and teams that need to organize information, understand trends, and turn raw data into useful decisions.

CORE FEATURES

• Familiar Spreadsheet Grid: Work with rows, columns, cells, ranges, multiple sheets, formatting, sorting, filtering, and structured tables in an intuitive interface.

• Powerful Formula Engine: Support common spreadsheet functions for mathematics, statistics, text processing, dates, logical operations, lookups, and conditional calculations.

• Intelligent Formula Assistance: Help users construct formulas from plain-language descriptions, explain existing calculations, identify common mistakes, and suggest improvements.

• Interactive Data Visualization: Create charts and dashboards that respond to changing data, helping users identify trends, compare metrics, and communicate findings.

• Real-Time Collaboration: Allow multiple users to edit shared spreadsheets, follow changes, discuss specific cells, and collaborate without passing files back and forth.

• Data Import and Export: Support common formats such as CSV and XLSX, with clear handling of imported values, formulas, formatting, and potential compatibility limitations.

• Automated Workflows: Enable recurring calculations, scheduled data updates, rule-based actions, and repeatable reporting workflows.

• Smart Data Cleaning: Identify duplicate entries, inconsistent formatting, missing values, unexpected data types, and other quality issues before they affect analysis.

• Pivot-Style Analysis: Summarize large datasets by category, compare groups, aggregate metrics, and explore information without manually rebuilding reports.

• Linked Data and References: Organize related information across sheets and workbooks while making dependencies and formula relationships easier to understand.

• Comments and Change History: Review edits, discuss individual cells or ranges, track important changes, and restore earlier versions when necessary.

• Interactive Dashboards: Combine charts, summary metrics, filters, and tables into reusable views designed for reporting and decision-making.

• Access Control: Share workbooks with configurable permissions so collaborators can view, comment on, or edit data according to their responsibilities.

• Performance at Scale: Use efficient recalculation, virtualized rendering, and optimized data structures to keep large workbooks responsive.

WHAT COULD MAKE SHEET BETTER THAN EXCEL?

The goal is not to claim that Sheet already outperforms Microsoft Excel in every capability. Excel is a mature product with extensive formulas, analysis tools, integrations, and enterprise features.

Instead, Sheet can differentiate itself by focusing on a more coherent, approachable, and intelligent data workflow.

1. A SIMPLER EXPERIENCE

Help beginners accomplish everyday tasks without requiring them to learn complicated formulas or navigate overwhelming menus.

2. BUILT-IN INTELLIGENCE

Provide contextual formula suggestions, explanations, anomaly detection, and natural-language assistance directly alongside the data.

3. COLLABORATION BY DESIGN

Make shared workbooks, comments, permissions, and change tracking feel like fundamental parts of the experience rather than separate workflow steps.

4. AUTOMATION WITHOUT COMPLEXITY

Give users accessible tools for automating repetitive calculations, data cleanup, and reporting, while retaining advanced options for technical users.

5. DATA THAT TELLS A STORY

Connect spreadsheets with interactive dashboards and visual reports so people can move from raw values to meaningful insights more naturally.

6. TRANSPARENCY AND TRUST

Make formulas, dependencies, data changes, and automated operations easier to inspect and understand, helping users verify how results were produced.

ADVANCED CAPABILITIES

A more ambitious version of Sheet could support reusable data connectors, custom functions, scripting, collaborative data models, scenario analysis, and advanced statistical tools.

Teams could build operational dashboards, forecast business performance, monitor project budgets, and generate recurring reports from the same underlying data.

Developers could extend the platform through APIs and integrations, while nontechnical users could rely on guided workflows and intelligent assistance.

TECHNICAL FOUNDATION

Building a competitive spreadsheet engine requires more than rendering a grid.

A robust architecture needs a dependency graph for formulas, reliable recalculation, support for different value types, careful numerical handling, and clear rules for formula evaluation.

For large datasets, virtualized rows and columns, incremental calculations, worker-based computation, and efficient memory management can improve responsiveness.

Real-time collaborative editing requires conflict-resolution strategies, while import and export pipelines must account for differences between spreadsheet formats and formula implementations.

A production system should also consider permissions, data validation, audit history, backups, and compatibility with established spreadsheet workflows.

POTENTIAL USE CASES

Small businesses can manage expenses, invoices, and sales reports. Students can organize research and perform calculations. Analysts can clean datasets and build dashboards. Project managers can track milestones, budgets, and resource allocation. Operations teams can automate recurring reports and monitor key performance indicators.

THE FUTURE OF SPREADSHEETS

Sheet is built around the idea that spreadsheets should do more than store numbers.

They should help people understand information, automate repetitive work, collaborate effectively, and make better-informed decisions.

By combining the familiarity of a spreadsheet with intelligent assistance, flexible visualization, and connected workflows, Sheet aims to create a modern data workspace that can compete with established tools while offering its own distinct advantages.
`,
        tags: [
          "Sheet",
          "Spreadsheets",
          "Data Analysis",
          "Automation",
          "Dashboards",
          "AI",
          "Productivity",
        ],
      },
    ];

    setMockPosts(mockPosts);
    console.log("Mock data from dummy: ", mockPosts);
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* this is dev mode with the real data from the backend is: {JSON.stringify(posts)} */}
      {/* <section
        id="blog"
        className="py-20 bg-gray-50 dark:bg-gray-800"
        ref={blogRef}
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
                <BookOpen
                  className="mr-3 text-blue-600 dark:text-blue-400"
                  size={28}
                />
                Blog
              </h2>

              {isLoading && (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              )}

              {error && (
                <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={`http://127.0.0.1:8000${post.media_url}`}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <span>{post.id}</span>
                        <span>•</span>
                        <span>
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {Date.now()}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {post.subtitle}
                      </p>

                      {/* <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full"
                          >
                            <Tag size={14} className="mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a href={`/posts/${post.id}`}>
                        <button className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                          Read More →
                        </button>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section
        id="blog"
        className="py-20 bg-gray-50 dark:bg-gray-900 "
        ref={blogRef}
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
                <BookOpen
                  className="mr-3 text-blue-600 dark:text-blue-400"
                  size={28}
                />
                Blog
              </h2>

              {isLoading && (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              )}

              {error && (
                <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {mockPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {post.content}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full"
                          >
                            <Tag size={14} className="mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a href={`/posts/${post.id}`}>
                        <button className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                          Read More →
                        </button>
                      </a>
                    </div>
                  </article>
                ))}

                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <span>{post.author || "Mouhamadou GAYE"}</span>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {post.readTime || ""}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {post.title}
                      </h3>
                      <p className="line-clamp-3 min-w-0 break-words text-sm leading-6 text-gray-600">
                        {post.content.trim()}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags &&
                          post.tags.map((tag: any) => (
                            <span
                              key={tag}
                              className="flex items-center text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full"
                            >
                              <Tag size={14} className="mr-1" />
                              {tag}
                            </span>
                          ))}
                      </div>

                      <a href={`/posts/${post.id}`}>
                        <button className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                          Read More →
                        </button>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
