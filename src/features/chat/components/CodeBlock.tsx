import { Check, Copy, Download } from "lucide-react";
import { useState, type FC, type ReactNode } from "react";

interface Props {
  language: string;
  code: string;
  children: ReactNode;
}

const EXTENSIONS: Record<string, string> = {
  tsx: "tsx",
  ts: "ts",
  jsx: "jsx",
  js: "js",
  typescript: "ts",
  javascript: "js",
  python: "py",
  py: "py",
  rust: "rs",
  go: "go",
  java: "java",
  kotlin: "kt",
  swift: "swift",
  c: "c",
  cpp: "cpp",
  csharp: "cs",
  css: "css",
  scss: "scss",
  html: "html",
  json: "json",
  yaml: "yml",
  yml: "yml",
  toml: "toml",
  sql: "sql",
  bash: "sh",
  sh: "sh",
  shell: "sh",
  zsh: "sh",
  powershell: "ps1",
  ps1: "ps1",
  markdown: "md",
  md: "md",
  dockerfile: "dockerfile",
  graphql: "graphql",
  xml: "xml",
};

function getExtension(language: string): string {
  return EXTENSIONS[language.toLowerCase()] ?? "txt";
}

export const CodeBlock: FC<Props> = ({ language, code, children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleDownload = () => {
    const ext = getExtension(language);
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `snippet-${Date.now()}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="code-block">
      <div className="code-block__header">
        <span className="code-block__lang">{language || "text"}</span>
        <div className="code-block__actions">
          <button
            type="button"
            className={`code-block__btn ${copied ? "code-block__btn--copied" : ""}`}
            onClick={handleCopy}
            aria-label="Copier le code"
            title="Copier"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span>{copied ? "Copié !" : "Copier"}</span>
          </button>
          <button
            type="button"
            className="code-block__btn"
            onClick={handleDownload}
            aria-label="Télécharger le code"
            title="Télécharger"
          >
            <Download size={13} />
            <span>Télécharger</span>
          </button>
        </div>
      </div>

      <pre className="md-pre">
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </div>
  );
};
