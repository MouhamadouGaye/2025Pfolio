import { ReactNode, useState } from "react";
import styles from "./preview-link.module.css";

interface Props {
  href: string;
  children: ReactNode;
  darkMode: boolean;
  variant: string;
}

export default function PreviewLink({
  href,
  children,
  variant = "default",
  darkMode,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const PREVIEW_WIDTH = 300;
  const DESKTOP_WIDTH = 1920;

  const scale = PREVIEW_WIDTH / DESKTOP_WIDTH;

  return (
    <div
      className={styles.previewWrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.link} ${styles[variant]} ${darkMode ? "" : "text-gray-800"}`}
      >
        <span>{children}</span>
        <span className={styles.arrow}>↗</span>
      </a>
      {isHovered && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.previewContainer}
        >
          <div className={styles.previewViewport}>
            <iframe
              src={href}
              title={`${children} preview`}
              className={styles.previewIframe}
              style={{
                transform: `scale(${scale})`,
              }}
            />
          </div>
        </a>
      )}
    </div>
  );
}
