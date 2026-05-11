import "./Contact.css";

const LINKS = [
  { label: "Email",      val: "hello@yourname.com",          icon: "✉",  href: "mailto:hello@yourname.com"       },
  { label: "LinkedIn",   val: "linkedin.com/in/yourname",    icon: "in", href: "https://linkedin.com/in/yourname" },
  { label: "GitHub",     val: "github.com/yourname",         icon: "</>",href: "https://github.com/yourname"     },
  { label: "Twitter / X",val: "@yourhandle",                 icon: "𝕏",  href: "https://twitter.com/yourhandle"  },
];

export default function Contact() {
  return (
    <>
      <section id="contact" className="contact-section">
        <div className="contact-inner">

          {/* ── Left ── */}
          <div className="contact-left reveal">
            <div className="section-tag">Contact</div>

            <h2 className="contact-heading">
              Let's<br />
              <span className="accent">Work</span><br />
              Together.
            </h2>

            <p className="contact-sub">
              [ Have a project in mind or just want to say hello? Drop me a
              line — I'm always open to interesting collaborations. ]
            </p>

            <div className="contact-links">
              {LINKS.map((l) => (
                <a key={l.label} href={l.href} className="contact-link"
                   target={l.href.startsWith("http") ? "_blank" : undefined}
                   rel="noreferrer">
                  <div className="link-icon">{l.icon}</div>
                  <div className="link-text">
                    <div className="link-label">{l.label}</div>
                    <div className="link-val">{l.val}</div>
                  </div>
                  <span className="link-arrow">→</span>
                </a>
              ))}
            </div>
          </div>

          {/* ── Right – ghost watermark ── */}
          <div className="contact-right reveal" style={{ transitionDelay: "0.2s" }}>
            <div className="big-email-wrap">hello@yourname.com</div>
          </div>

        </div>
      </section>

      <footer>
        <span>© 2025 Your Name. All rights reserved.</span>
        <span>Designed &amp; Built by You</span>
        <span>v1.0.0</span>
      </footer>
    </>
  );
}
