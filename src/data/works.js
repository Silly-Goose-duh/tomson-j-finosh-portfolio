// src/data/works.js
// Add / edit your projects here — the grid renders from this array.

const works = [
  {
    id: "01",
    title: "Project Alpha",
    tag: "Web App",
    featured: true,                // spans both columns
    desc: "A full-stack platform for managing creative workflows and team collaboration at scale.",
    tech: ["React", "Node.js", "PostgreSQL"],
    role: "Full-stack development, UI/UX design",
    year: "2024",
    outcome: "Improved team efficiency by 40% across 200+ users.",
    link: "#",
  },
  {
    id: "02",
    title: "Nebula UI",
    tag: "Design System",
    featured: false,
    desc: "A component library built for dark-first interfaces with a focus on accessibility.",
    tech: ["Storybook", "TypeScript", "Figma"],
    role: "Lead designer & developer",
    year: "2024",
    outcome: "Adopted by 3 internal teams within 2 months.",
    link: "#",
  },
  {
    id: "03",
    title: "Pulse Analytics",
    tag: "Dashboard",
    featured: false,
    desc: "Real-time data visualization dashboard with customizable widgets and live feeds.",
    tech: ["Vue.js", "D3.js", "WebSocket"],
    role: "Frontend engineering, data viz",
    year: "2023",
    outcome: "Handles 50 k events per second in real-time.",
    link: "#",
  },
  {
    id: "04",
    title: "Void Commerce",
    tag: "E-commerce",
    featured: false,
    desc: "Minimalist storefront with a focus on performance and conversion optimization.",
    tech: ["Next.js", "Stripe", "Tailwind"],
    role: "End-to-end development",
    year: "2023",
    outcome: "30 % increase in checkout completion rate.",
    link: "#",
  },
];

export default works;
