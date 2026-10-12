import type { FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "./Markdown.css";

interface Props {
  content: string;
}

export const MarkdownRenderer: FC<Props> = ({ content }) => {
  return (
    <div className="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Liens externes : nouvel onglet + sécurité
          a: ({ node: _node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),

          // Bloc de code (déjà stylé par highlight.js)
          pre: ({ node: _node, ...props }) => (
            <pre className="md-pre" {...props} />
          ),

          // Code inline vs bloc : la classe language-* indique un bloc
          code: ({ node: _node, className, children, ...props }) => {
            const isBlock = /language-/.test(className ?? "");
            if (isBlock) {
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

          // Tableaux avec scroll horizontal
          table: ({ node: _node, ...props }) => (
            <div className="md-table-wrap">
              <table {...props} />
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
