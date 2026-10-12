// import type { FC } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";
// import "./Markdown.css";

// interface Props {
//   content: string;
// }

// export const MarkdownRenderer: FC<Props> = ({ content }) => {
//   return (
//     <div className="md">
//       <ReactMarkdown
//         remarkPlugins={[remarkGfm]}
//         rehypePlugins={[rehypeHighlight]}
//         components={{
//           // Liens externes : nouvel onglet + sécurité
//           a: ({ node: _node, ...props }) => (
//             <a {...props} target="_blank" rel="noopener noreferrer" />
//           ),

//           // Bloc de code (déjà stylé par highlight.js)
//           pre: ({ node: _node, ...props }) => (
//             <pre className="md-pre" {...props} />
//           ),

//           // Code inline vs bloc : la classe language-* indique un bloc
//           code: ({ node: _node, className, children, ...props }) => {
//             const isBlock = /language-/.test(className ?? "");
//             if (isBlock) {
//               return (
//                 <code className={className} {...props}>
//                   {children}
//                 </code>
//               );
//             }
//             return (
//               <code className="md-inline-code" {...props}>
//                 {children}
//               </code>
//             );
//           },

//           // Tableaux avec scroll horizontal
//           table: ({ node: _node, ...props }) => (
//             <div className="md-table-wrap">
//               <table {...props} />
//             </div>
//           ),
//         }}
//       >
//         {content}
//       </ReactMarkdown>
//     </div>
//   );
// };
import type { FC, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { CodeBlock } from "./CodeBlock";
import "./Markdown.css";

interface Props {
  content: string;
}

/** Extrait le langage depuis une className ReactMarkdown : "language-tsx hljs" → "tsx" */
function extractLanguage(className?: string): string {
  if (!className) return "";
  const match = /language-([\w-]+)/.exec(className);
  return match?.[1] ?? "";
}

/** Extrait le texte brut depuis les children (string ou nœud React) */
function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return extractText(node.props?.children);
  }
  return "";
}

export const MarkdownRenderer: FC<Props> = ({ content }) => {
  return (
    <div className="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Liens externes
          a: ({ node: _node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),

          // Tableaux avec scroll horizontal
          table: ({ node: _node, ...props }) => (
            <div className="md-table-wrap">
              <table {...props} />
            </div>
          ),

          // ⚠️ On intercepte "pre" au lieu de "code" pour récupérer le bloc entier
          pre: ({ children }) => {
            // children est généralement un unique <code> avec className language-*
            const codeEl = Array.isArray(children) ? children[0] : children;

            if (codeEl && typeof codeEl === "object" && "props" in codeEl) {
              const codeChildren = codeEl.props?.children;
              const className = codeEl.props?.className as string | undefined;

              const language = extractLanguage(className);
              const rawCode = extractText(codeChildren);

              return (
                <CodeBlock language={language} code={rawCode}>
                  {codeChildren}
                </CodeBlock>
              );
            }

            // Fallback si structure inattendue
            return <pre className="md-pre">{children}</pre>;
          },

          // Code inline uniquement (les blocs passent par pre)
          code: ({ node: _node, className, children, ...props }) => {
            const isBlock = /language-/.test(className ?? "");
            if (isBlock) {
              // ce code ne sera jamais rendu directement — il est capté par "pre"
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className="md-inline-code" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
