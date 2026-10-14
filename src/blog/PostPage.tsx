// export default PostPage;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { getPost } from "../api/kobe-blog";
import "./PostPage.css";
import MarkdownRenderer from "../components/MarkdownRender";

export const dummyPosts = [
  {
    id: "1",
    title: "Editor — A Smarter Space to Write, Create, and Collaborate",
    author: "Mouhamadou Gaye",
    date: "13/10/2026",
    readTime: "10 min read",
    image: "https://mouhamadougaye.com/assets/editor.png",
    excerpt:
      "Discover a modern writing workspace that brings document creation, intelligent assistance, organization, and real-time collaboration together.",
    content: `
# Editor: Turn Ideas into Finished Work

Writing should be more than typing words onto a blank page. The right workspace helps you shape early ideas, bring structure to your thinking, and turn rough drafts into clear, polished work.

**Editor** is a modern document creation and collaboration platform designed for students, developers, professionals, researchers, teams, and anyone who works with information. It combines the familiarity of a traditional word processor with a streamlined workflow for creating, organizing, reviewing, and sharing documents.

[**Try Editor →**](https://senfile.com/)

Learn more on the [official website](https://mouhamadougaye.com/).

## The Vision

Editor aims to bring the entire writing process into one coherent workspace. Instead of moving between separate tools to draft content, collect feedback, manage files, and collaborate, users can keep their work organized in one place.

The goal is simple: make writing feel more focused, collaboration more natural, and finished documents easier to produce.

## Core Features

- **Rich document editing:** Create well-structured documents with headings, paragraphs, lists, quotations, tables, links, images, and flexible formatting.
- **Real-time collaboration:** Work with others in a shared document and follow changes as they happen, without constantly exchanging files.
- **Intelligent writing assistance:** Improve clarity, correct grammar, adjust tone, summarize long sections, and develop ideas with guided assistance.
- **Comments and suggestions:** Give contextual feedback, propose edits, and keep review discussions close to the content they concern.
- **Version history:** Review previous versions, understand how a document evolved, and restore earlier work when needed.
- **Flexible organization:** Arrange documents into workspaces, folders, projects, and collections so important information stays easy to find.
- **Simple sharing:** Share documents through configurable permissions and links that support individual or team workflows.
- **Responsive design:** Work across desktop, tablet, and mobile layouts with an experience adapted to each screen.
- **A focused interface:** Keep essential tools within reach while reducing clutter and unnecessary distractions.

## What Makes Editor Different?

Traditional document editors often concentrate on formatting and content creation. Editor takes a broader view: writing is a workflow that moves from the first idea through drafting, feedback, revision, and sharing.

Its long-term direction is to bring intelligent assistance, reusable templates, document organization, and collaborative review into one consistent experience.

## Who Can Use Editor?

- **Students** can draft assignments, organize notes, and collaborate on research.
- **Developers** can maintain technical documentation, project notes, and team knowledge.
- **Businesses** can prepare proposals, reports, and internal documentation.
- **Researchers** can organize findings and refine complex material.
- **Creative teams** can develop drafts, exchange feedback, and shape ideas together.

## The Technology Behind the Experience

A robust implementation could combine a responsive React-based interface, a structured document model, reusable editing components, and backend services for persistence, permissions, and collaborative updates.

Real-time editing can use approaches such as operational transformation or conflict-free replicated data types. Autosaving, synchronization, and document history can help protect work and make collaboration more dependable.

These are architectural approaches for building the experience; the exact implementation depends on the product's technical requirements.

## The Future of Writing

Editor is built around a straightforward ambition: make great documents easier to create, collaboration easier to manage, and information more useful.

**It is more than a place to write. It is a workspace for turning ideas into finished work.**
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
      "Explore a collaboration platform that connects video meetings with shared workspaces, meeting context, decisions, and actionable follow-ups.",
    content: `
# Call: Make Every Meeting More Productive

Communication is central to modern work, but a video call is only one part of a successful meeting. Teams also need shared context, useful notes, clear decisions, follow-up tasks, and a reliable way to continue working after the call ends.

**Call** is envisioned as a communication and collaboration platform that brings video conferencing, audio calls, messaging, screen sharing, and collaborative workspaces together.

Rather than treating every meeting as an isolated event, Call aims to connect conversations to the work they create.

[**Try Call →**](https://senfile.com/call)

Learn more on the [official website](https://mouhamadougaye.com/).

## The Vision

Call is designed for distributed teams, remote workers, educators, businesses, developers, and communities that need more than a conventional video conferencing tool.

Its central idea is simple: meetings should help people make progress, not merely bring them into the same virtual room.

## Core Features

- **High-quality video and audio:** Support reliable communication with adaptive quality, noise suppression, echo cancellation, and bandwidth-aware streaming.
- **Smart meeting rooms:** Create persistent spaces for teams, projects, classrooms, and recurring discussions, with reusable settings and shared resources.
- **Interactive screen sharing:** Share an entire screen, a specific application, or a presentation while discussing the material together.
- **Live chat and reactions:** Combine video with contextual messages, questions, reactions, and lightweight interactions.
- **Collaborative whiteboards:** Sketch diagrams, brainstorm ideas, map workflows, and explain complex concepts without leaving the meeting.
- **AI meeting assistance:** With appropriate consent, generate summaries, highlight discussion points, capture decisions, and suggest follow-up tasks.
- **Searchable meeting history:** Keep recordings, transcripts, shared files, notes, and decisions organized for later reference.
- **Integrated task management:** Turn agreed actions into trackable tasks, assign owners, set deadlines, and link follow-up work to the original discussion.
- **Flexible participation:** Support scheduled meetings, instant calls, guest access, reusable room links, and smooth transitions between conversations.
- **Privacy and access controls:** Provide waiting rooms, host controls, participant permissions, secure meeting links, and clear recording and transcription settings.
- **Cross-device support:** Adapt layouts and controls for desktop and mobile participants.
- **Accessible communication:** Offer live captions, keyboard-accessible controls, and features that support different communication needs.

## Beyond Traditional Video Conferencing

Call's defining idea is the connection between communication and execution.

Imagine a team reviewing a design, discussing changes, assigning implementation tasks, and recording the final decision. In a connected workspace, those activities can remain linked instead of being scattered across unrelated tools.

A meeting could produce a structured summary, a list of decisions, assigned tasks, and links to relevant materials. Participants could return later and understand not only what was discussed, but also what happened next.

This approach makes Call useful for ongoing projects as well as scheduled meetings.

## Real-World Applications

- **Remote teams** can coordinate projects and preserve decisions beyond chat histories.
- **Teachers and students** can combine live lessons with shared notes and interactive whiteboards.
- **Product teams** can review prototypes and document feedback in context.
- **Developers** can troubleshoot issues through screen sharing and collaborative debugging.
- **Organizations** can run workshops and planning sessions with clearer outcomes and follow-up.

## Technical Foundation

A production-grade implementation could use WebRTC for real-time audio and video, supported by a signaling service that helps participants establish connections.

A scalable architecture may include a selective forwarding unit (SFU) for group calls, a messaging layer for chat and presence, persistent storage for meeting metadata, and object storage for recordings when recording is enabled.

Adaptive bitrate, connection recovery, monitoring, authorization, and secure media transport are important considerations for a dependable experience.

Transcription and meeting summaries can be integrated with transparent controls for consent, retention, and data access.

## The Future of Meetings

Call aims to transform online meetings from temporary conversations into productive collaborative sessions.

The ambition is not simply to reproduce existing conferencing tools. It is to create a connected environment where people can communicate, think together, make decisions, and move directly into meaningful work.
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
    id: "4",
    title: "Financial Technology — The Future of Digital Banking",
    author: "Jane Smith",
    date: "10/03/2024",
    readTime: "6 min read",
    image:
      "https://images.pexels.com/photos/7567444/pexels-photo-7567444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    excerpt:
      "Explore how mobile banking, AI, blockchain, and instant payments are reshaping the way people access and use financial services.",
    content: `
# Financial Technology: The Future of Digital Banking

Financial technology, often called **FinTech**, is changing how consumers and businesses interact with banks and financial institutions. Digital services are making everyday financial tasks more accessible while creating new expectations around speed, convenience, security, and personalization.

[**Try Editor →**](https://senfile.com/)

[**You can have a Try also the Sheet →**](https://senfile.com/sheet)

Learn more on the [official website](https://mouhamadougaye.com/).

## Key Areas of Innovation

- **Mobile banking:** Manage accounts, review transactions, transfer money, and access services through mobile applications.
- **AI-powered fraud detection:** Analyze patterns and flag potentially suspicious activity to help protect customers and institutions.
- **Blockchain applications:** Explore shared digital records and new ways to verify and transfer assets.
- **Instant payments:** Move money more quickly, subject to the capabilities and rules of the payment network.
- **Digital lending:** Use online applications and data-driven processes to streamline parts of the borrowing experience.
- **Open Banking APIs:** Enable authorized services to connect with financial data under applicable consent and security requirements.

## A Changing Financial Landscape

FinTech startups and established banks are competing and collaborating to deliver faster, safer, and more personalized experiences. The strongest solutions must balance convenience with privacy, reliability, transparency, and appropriate safeguards.

As these technologies evolve, digital banking will continue to change how people manage money and how institutions deliver financial services.
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
      "Discover a modern spreadsheet workspace that combines familiar grids with formula assistance, data visualization, automation, and collaborative analysis.",
    content: `
# Sheet: Turn Raw Data into Clearer Decisions

Spreadsheets are essential tools for managing budgets, analyzing performance, organizing information, tracking projects, and making decisions.

As datasets and workflows grow, however, spreadsheets can become harder to maintain. Complex formulas, disconnected files, repetitive data entry, and difficult-to-read reports can turn straightforward tasks into time-consuming work.

**Sheet** is envisioned as a modern spreadsheet and data workspace that combines the flexibility of a familiar grid with intelligent assistance, automation, visualization, and collaborative workflows.

[**Try Sheet →**](https://senfile.com/sheet)

Learn more on the [official website](https://mouhamadougaye.com/).

## The Vision

Sheet aims to make working with data more powerful without making it unnecessarily complicated. It is intended for students, analysts, business owners, project managers, researchers, developers, and teams that need to organize information, identify trends, and turn raw data into useful decisions.

## Core Features

- **Familiar spreadsheet grid:** Work with rows, columns, cells, ranges, multiple sheets, formatting, sorting, filtering, and structured tables.
- **Powerful formula engine:** Support common functions for mathematics, statistics, text processing, dates, logical operations, lookups, and conditional calculations.
- **Intelligent formula assistance:** Build formulas from plain-language descriptions, understand existing calculations, spot common mistakes, and explore improvements.
- **Interactive data visualization:** Create charts and dashboards that respond to changing data, helping users identify trends and communicate findings.
- **Real-time collaboration:** Edit shared workbooks, follow changes, discuss specific cells, and work together without repeatedly exchanging files.
- **Data import and export:** Support common formats such as CSV and XLSX, with clear handling of imported values, formulas, formatting, and compatibility limits.
- **Automated workflows:** Support recurring calculations, scheduled updates, rule-based actions, and repeatable reporting processes.
- **Smart data cleaning:** Identify duplicates, inconsistent formatting, missing values, unexpected data types, and other data-quality issues.
- **Pivot-style analysis:** Summarize datasets by category, compare groups, aggregate metrics, and explore information without rebuilding reports manually.
- **Linked data and references:** Connect information across sheets and workbooks while making dependencies and formula relationships easier to follow.
- **Comments and change history:** Discuss individual cells or ranges, review edits, track important changes, and restore earlier versions when needed.
- **Interactive dashboards:** Combine charts, summary metrics, filters, and tables into reusable views for reporting and decision-making.
- **Access control:** Share workbooks with permissions that determine who can view, comment on, or edit data.
- **Performance at scale:** Use efficient recalculation, virtualized rendering, and optimized data structures to keep large workbooks responsive.

## How Could Sheet Differentiate Itself from Excel?

The goal is not to claim that Sheet already outperforms Microsoft Excel in every area. Excel is a mature product with extensive formulas, analysis tools, integrations, and enterprise capabilities.

Instead, Sheet could distinguish itself through a more coherent, approachable, and intelligent data workflow.

### 1. A Simpler Experience

Help beginners complete everyday tasks without requiring them to master complicated formulas or navigate overwhelming menus.

### 2. Built-In Intelligence

Offer contextual formula suggestions, explanations, anomaly detection, and natural-language assistance alongside the data.

### 3. Collaboration by Design

Make shared workbooks, comments, permissions, and change tracking natural parts of the experience rather than separate workflow steps.

### 4. Automation Without Complexity

Give users accessible ways to automate repetitive calculations, clean data, and produce reports, while retaining advanced options for technical users.

### 5. Data That Tells a Story

Connect spreadsheets to interactive dashboards and visual reports so users can move from raw values to meaningful insights.

### 6. Transparency and Trust

Make formulas, dependencies, data changes, and automated operations easier to inspect, helping users understand and verify how results were produced.

## Advanced Capabilities

A more ambitious version of Sheet could support reusable data connectors, custom functions, scripting, collaborative data models, scenario analysis, and advanced statistical tools.

Teams could build operational dashboards, forecast business performance, monitor project budgets, and generate recurring reports from shared data. Developers could extend the platform through APIs and integrations, while nontechnical users could rely on guided workflows and intelligent assistance.

## Technical Foundation

Building a competitive spreadsheet engine requires more than rendering a grid. A robust architecture needs a formula dependency graph, reliable recalculation, support for different value types, careful numerical handling, and clear rules for formula evaluation.

For large datasets, virtualized rows and columns, incremental calculations, worker-based computation, and efficient memory management can improve responsiveness.

Real-time collaborative editing requires conflict-resolution strategies. Import and export pipelines must also account for differences between spreadsheet formats and formula implementations.

A production system should consider permissions, data validation, audit history, backups, and compatibility with established spreadsheet workflows.

## Potential Use Cases

- **Small businesses** can manage expenses, invoices, and sales reports.
- **Students** can organize research and perform calculations.
- **Analysts** can clean datasets and build dashboards.
- **Project managers** can track milestones, budgets, and resource allocation.
- **Operations teams** can automate recurring reports and monitor key performance indicators.

## The Future of Spreadsheets

Sheet is built on the idea that spreadsheets should do more than store numbers. They should help people understand information, reduce repetitive work, collaborate effectively, and make better-informed decisions.

By combining the familiarity of a spreadsheet with intelligent assistance, flexible visualization, and connected workflows, Sheet aims to create a modern data workspace with a distinct place alongside established tools.
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
            src={post.image}
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
              <MarkdownRenderer content={post.content} />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
