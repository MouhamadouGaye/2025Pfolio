import React from "react";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useDarkMode } from "./utils/hooks";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PostPage from "./blog/PostPage";
import Animation from "./components/Animation";
import PostList from "./blog/PostList";
import ChatPage from "./features/pages/ChatPage";

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <BrowserRouter>
      <div className={isDarkMode ? "dark" : ""}>
        {" "}
        {/* <ScrollToAnchor /> */}
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Header
                  isDarkMode={isDarkMode}
                  toggleDarkMode={toggleDarkMode}
                />

                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience
                  isDarkMode={isDarkMode}
                  toggleDarkMode={toggleDarkMode}
                />
                <Blog />
                <Animation />
                <Contact />
                <Footer />
              </main>
            }
          />
          <Route path="/blog" element={<PostList isDarkMode={isDarkMode} />} />
          <Route path="/posts/:id" element={<PostPage />} />

          <Route path="/mgaye-ai" element={<ChatPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
