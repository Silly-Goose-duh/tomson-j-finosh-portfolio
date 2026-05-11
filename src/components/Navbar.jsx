import "./Navbar.css";

export default function Navbar() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav>
      <div className="nav-logo">
        YOUR<span>.</span>NAME
      </div>
      <ul className="nav-links">
        <li><a href="#works"   onClick={(e) => { e.preventDefault(); scrollTo("works");   }}>Works</a></li>
        <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Contact</a></li>
        <li><a href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a></li>
      </ul>
    </nav>
  );
}
