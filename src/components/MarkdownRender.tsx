import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
  image?: string;
  className?: string;
  compact?: boolean;
}

export default function MarkdownRenderer({
  content,
  image,
  className = "",
  compact = false,
}: MarkdownRendererProps) {
  return (
    <div
      className={`markdown-content min-w-0 break-words ${
        compact ? "markdown-compact" : "markdown-article"
      } ${className}`}
    >
      {image && (
        <img
          src={image}
          alt=""
          loading="lazy"
          className={`h-auto w-full rounded-xl object-cover ${
            compact ? "mb-3 max-h-40" : "my-6 max-h-[450px]"
          }`}
        />
      )}

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline underline-offset-4 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt ?? ""}
              loading="lazy"
              className="my-6 h-auto max-w-full rounded-xl"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
