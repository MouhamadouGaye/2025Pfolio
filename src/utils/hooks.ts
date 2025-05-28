import { useState, useEffect } from "react";

// Custom hook for dark mode toggle
export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check for saved theme or system preference
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      return savedTheme === "dark" || (!savedTheme && prefersDark);
    }

    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      // Update document class and localStorage
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };
  return { isDarkMode, toggleDarkMode };
}

// Custom hook for scroll position
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", updatePosition);

    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
}

// // Custom hook for intersection observer (animations on scroll)
// export function useIntersectionObserver(
//   elementRef: React.RefObject<Element>,
//   options: IntersectionObserverInit = {
//     threshold: 0.1,
//     root: null,
//     rootMargin: "0px",
//   }
// ) {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     if (!elementRef.current) return;

//     const observer = new IntersectionObserver(([entry]) => {
//       setIsVisible(entry.isIntersecting);
//     }, options);

//     observer.observe(elementRef.current);

//     return () => {
//       if (elementRef.current) {
//         observer.unobserve(elementRef.current);
//       }
//     };
//   }, [elementRef, options]);

//   return isVisible;
// }

// ✅ How to Make useIntersectionObserver SSR-Safe
// Here’s a modified version of your hook that supports SSR:

export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {
    threshold: 0.1,
    root: null,
    rootMargin: "0px",
  }
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // ✅ SSR check: only run if IntersectionObserver is available
    if (
      !elementRef.current ||
      typeof window === "undefined" ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef, options]);

  return isVisible;
}
