import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <BrowserRouter>
      <div className={isDarkMode ? "dark" : ""}>
        {" "}
        {/* <ScrollToAnchor /> */}
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Blog />
                <Animation />
                <Contact />
              </main>
            }
          />
          <Route path="/posts/:id" element={<PostPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;
