import { useEffect } from "react";
import Cursor  from "./components/Cursor";
import Navbar  from "./components/Navbar";
import Hero    from "./components/Hero";
import Works   from "./components/Works";
import Contact from "./components/Contact";
import works   from "./data/works";

// Shared section layout styles (used by Works & Contact)
import "./components/Section.css";

export default function App() {
  // Scroll-triggered reveal for elements with class "reveal"
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Cursor />
      <Navbar />
      <Hero />
      <Works works={works} />
      <Contact />
    </>
  );
}
