import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  ArrowDownToLine,
  ArrowUpRight,
  AtSign,
  Copy,
  GitBranch,
  Link as LinkIcon,
  MapPin,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import duckAvatar from './assets/duck-avatar.jpg'
import './App.css'

const contact = {
  name: 'Tomson J. Finosh',
  short: 'Tom',
  place: 'Trivandrum',
  github: 'https://github.com/Silly-Goose-duh',
  email: 'tjj5279@gmail.com',
  linkedin: 'https://www.linkedin.com/in/tomson-j-finosh/',
  instagram: 'https://www.instagram.com/me_nosmot/',
  phone: '+91 9895329319',
  portfolio: 'https://i-wanna-make-a-portfolio-that.vercel.app/',
}

const quotes = [
  ['Marcus Aurelius', 'Waste no more time arguing what a good person should be. Be one.'],
  ['Sun Tzu', 'In the midst of chaos, there is also opportunity.'],
  ['Franz Kafka', 'Anyone who keeps the ability to see beauty never grows old.'],
  ['Fyodor Dostoevsky', 'To live without hope is to cease to live.'],
  ['Seneca', 'Luck is what happens when preparation meets opportunity.'],
]

const skillBuckets = [
  {
    id: 'build',
    label: 'Full-stack build',
    color: '#6ba4ff',
    items: [
      { name: 'React / TypeScript', level: 'daily driver', projectId: 'campuspass' },
      { name: 'Supabase', level: 'daily driver', projectId: 'campuspass' },
      { name: 'Tailwind CSS', level: 'daily driver', projectId: 'campuspass' },
      { name: 'Next.js', level: 'comfortable', projectId: 'echonexus' },
      { name: 'Vercel (deploy/CI)', level: 'daily driver', projectId: 'campuspass' },
      { name: 'React Native / Expo', level: 'learning', projectId: 'echonexus' },
    ],
  },
  {
    id: 'ai',
    label: 'Agentic / AI tooling',
    color: '#6fcf97',
    items: [
      { name: 'OpenCode (custom agent building)', level: 'daily driver', projectId: 'echonexus' },
      { name: 'MCP (Model Context Protocol)', level: 'comfortable', projectId: 'echonexus' },
      { name: 'Anthropic API', level: 'comfortable', projectId: 'echonexus' },
      { name: 'Ollama / local LLMs', level: 'learning', projectId: 'echonexus' },
      { name: 'Vector memory (ChromaDB, pgvector)', level: 'learning', projectId: 'echonexus' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend / infra',
    color: '#f2c94c',
    items: [
      { name: 'PostgreSQL', level: 'comfortable', projectId: 'campuspass' },
      { name: 'Fastify', level: 'learning', projectId: 'echonexus' },
      { name: 'Redis / BullMQ', level: 'learning', projectId: null },
      { name: 'Railway', level: 'learning', projectId: null },
      { name: 'Prisma', level: 'comfortable', projectId: 'campuspass' },
    ],
  },
  {
    id: 'lead',
    label: 'Leadership / ops',
    color: '#bb86fc',
    items: [
      { name: 'Event ops & sponsorship', level: 'daily driver', projectId: null },
      { name: 'Community building', level: 'daily driver', projectId: null },
      { name: 'Branding & marketing', level: 'comfortable', projectId: null },
      { name: 'Partner negotiation (ICFOSS, HARDWIRED)', level: 'comfortable', projectId: null },
    ],
  },
]

const levelColors: Record<string, string> = {
  'daily driver': '#6fcf97',
  comfortable: '#f2c94c',
  learning: '#e0e0e0',
}

const graphNodes = [
  { id: 'tom', label: 'Tomson', size: 'xl', x: 50, y: 50, bucket: 'center' },
  { id: 'react', label: 'React/TS', size: 'md', x: 76, y: 30, bucket: 'build' },
  { id: 'code', label: 'full-stack', size: 'lg', x: 82, y: 42, bucket: 'build' },
  { id: 'ai', label: 'agentic AI', size: 'lg', x: 28, y: 26, bucket: 'ai' },
  { id: 'opencode', label: 'OpenCode', size: 'sm', x: 16, y: 38, bucket: 'ai' },
  { id: 'brand', label: 'branding', size: 'lg', x: 20, y: 68, bucket: 'lead' },
  { id: 'lead', label: 'leadership', size: 'lg', x: 50, y: 82, bucket: 'lead' },
  { id: 'events', label: 'events', size: 'md', x: 36, y: 76, bucket: 'lead' },
  { id: 'photo', label: 'photography', size: 'md', x: 75, y: 76, bucket: 'creative' },
  { id: 'postgres', label: 'PostgreSQL', size: 'sm', x: 64, y: 20, bucket: 'backend' },
  { id: 'foss', label: 'FOSS Club', size: 'sm', x: 8, y: 52, bucket: 'lead' },
  { id: 'cse', label: 'CSE B.Tech', size: 'sm', x: 42, y: 12, bucket: 'build' },
]

const edges: [string, string, string][] = [
  ['tom', 'react', 'builds with'],
  ['tom', 'code', 'shapes through'],
  ['tom', 'ai', 'explores through'],
  ['tom', 'brand', 'thinks in'],
  ['tom', 'lead', 'practices'],
  ['tom', 'photo', 'sees through'],
  ['code', 'react', ''], ['code', 'postgres', ''], ['code', 'cse', ''],
  ['ai', 'opencode', ''], ['ai', 'cse', ''],
  ['brand', 'foss', ''], ['brand', 'events', ''],
  ['lead', 'events', ''], ['lead', 'foss', ''],
  ['photo', 'events', ''],
]

const bucketColors: Record<string, string> = {
  build: '#6ba4ff',
  ai: '#6fcf97',
  backend: '#f2c94c',
  lead: '#bb86fc',
  creative: '#888',
  center: '#f4f4f0',
}

const projects = [
  {
    id: 'campuspass',
    hook: 'Event platform for 3,000+ students at MEC, cut sign-up friction by replacing spreadsheets with real-time registration.',
    name: 'CampusPass',
    problem: 'MEC ran event sign-ups through Google Forms + WhatsApp — no real-time headcount, no way to track repeat attendees, leads flying blind on turnout. Students missed events buried in group chats.',
    build: 'Built a full registration + discovery platform with Supabase for real-time data and row-level security per event. Caught and fixed an RLS bug that would\'ve let any signed-in user edit other clubs\' events before it shipped.',
    proof: 'Live and in active use for MEC events. Superadmin panel provides oversight across all clubs.',
    stack: 'React · TypeScript · Supabase · Tailwind · Framer Motion · Vercel',
    links: [
      { label: 'Live Site', url: 'https://mec-campuspass.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/Silly-Goose-duh/MakeYourPass' },
    ],
  },
  {
    id: 'echonexus',
    hook: 'Personal AI command center with direct filesystem access — no cloud, no context loss between sessions.',
    name: 'ECHO Nexus',
    problem: 'Cloud AI assistants can\'t see what\'s on your screen and forget everything between sessions — no ambient awareness, no continuity across your workflow.',
    build: 'Built a fully local AI engineering hub with Fastify backend + Next.js glassmorphism UI. Password-gated auth, project/agent/task CRUD, and remote mobile connectivity via React Native (coming). Key decision: ran everything locally for privacy and zero latency cost.',
    proof: 'In active development, currently running with full CRUD workflows and terminal-connected agent orchestration.',
    stack: 'Fastify · Next.js · React Native · TypeScript · Ollama · ChromaDB',
    links: [
      { label: 'GitHub', url: 'https://github.com/Silly-Goose-duh/Dot' },
    ],
  },
  {
    id: 'passwordgen',
    hook: 'Password generator with slot-machine animation and real-time strength analysis — one-click copy, zero bullshit.',
    name: 'Password Generator',
    problem: 'Most password generators are either boring text fields or sketchy websites you don\'t trust. No reason a utility can\'t feel premium.',
    build: 'Built with Tailwind v4 and Framer Motion — slot-machine spin animation where characters settle from left to right with staggered timing. Strength meter estimates crack time using modern GPU benchmarks. All client-side, zero data leaves the browser.',
    proof: 'Live at password-generator-virid-two.vercel.app — ships as a single static page, 364 KB gzipped.',
    stack: 'React · TypeScript · Vite · Tailwind v4 · Framer Motion · Vercel',
    links: [
      { label: 'Live Site', url: 'https://password-generator-virid-two.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/Silly-Goose-duh/password-generator' },
    ],
  },
  {
    id: 'wedding',
    hook: 'Wedding RSVP site with Supabase — 100+ guests confirmed without a single spreadsheet.',
    name: 'Sharon + Amala',
    problem: 'Wedding guest lists devolve into WhatsApp chains, phone tag, and lost plus-ones. The couple needed a single source of truth for invites and meal counts.',
    build: 'Built a no-fuss RSVP flow with Supabase for real-time guest tracking and a password-protected admin view. Deployed on Vercel with a custom domain. Took one weekend from idea to live.',
    proof: 'Used for Sharon and Amala\'s wedding — live RSVPs, guest count tracking, and dietary preference collection in one place.',
    stack: 'React · Supabase · Vercel · Tailwind',
    links: [
      { label: 'Live Site', url: 'https://sharonwedsamala.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/Silly-Goose-duh/sharon-weds-amala' },
    ],
  },
  {
    id: 'portfolio',
    hook: 'This portfolio — dark, editorial, zero-template. Built to prove I can ship a complete frontend with no boilerplate.',
    name: 'tomson-j-finosh',
    problem: 'Most developer portfolios look identical — same Tailwind template, same bento grid, same tech stack badges. Wanted something that felt like a product, not a resume page.',
    build: 'Built from scratch with plain CSS (no Tailwind), React Router, and Framer Motion. The memory mesh on the skills page is SVG, not canvas — readable, accessible, and animatable without a heavy 3D library. Key decision: monochrome palette forces hierarchy through typography and spacing, not color.',
    proof: 'Live at tomson-j-finosh.vercel.app. Lighthouse scores: 98 Performance, 100 Accessibility.',
    stack: 'React · Vite · Framer Motion · CSS (no framework) · Vercel',
    links: [
      { label: 'Live Site', url: 'https://tomson-j-finosh.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/Silly-Goose-duh/tomson-j-finosh-portfolio' },
    ],
  },
]

const storyText = [
  'He was the kind of person who felt everything deeply but rarely showed all of it.',
  'To most people, he looked calm. But inside, his mind never stayed quiet, constantly thinking, overanalyzing, dreaming, questioning life, people, and himself.',
  'He cared more than he admitted. About people. About meaning. About not becoming ordinary.',
  'Some days he felt unstoppable. Other days completely lost.',
  'He hid emotions behind humor, silence, and distractions, yet remembered the smallest details about people and moments others forgot.',
  'He wanted real connections, real freedom, and a life that felt genuine, not just impressive.',
  'There was always a quiet loneliness in him, not because nobody was around, but because nobody fully understood him.',
  'Still, he kept going. Still hoping. Still dreaming. Still becoming.',
  'And maybe that was the most human thing about him.',
]

function Nav() {
  const [navExpanded, setNavExpanded] = useState(false)

  return (
    <>
      <header className="site-nav">
        <Link className="brand" to="/" aria-label="home">
          Tomson J. Finosh
        </Link>
      </header>
      <aside className="side-nav">
        <Link className="side-avatar" to="/" aria-label="home" onClick={() => setNavExpanded(false)}>
          <img src={duckAvatar} alt="" />
        </Link>
        <motion.nav
          className="side-nav-links"
          aria-label="primary navigation"
          onHoverStart={() => setNavExpanded(true)}
          onHoverEnd={() => setNavExpanded(false)}
          animate={{ width: navExpanded ? 130 : 52 }}
          transition={{ type: 'spring', stiffness: 350, damping: 26, mass: 0.7 }}
        >
          <NavLink to="/contact">
            <span className="nav-emoji">📬</span>
            <motion.span
              className="nav-label"
              animate={{ opacity: navExpanded ? 1 : 0, x: navExpanded ? 0 : -6 }}
              transition={{ duration: 0.18, delay: navExpanded ? 0.03 : 0 }}
            >
              contact
            </motion.span>
          </NavLink>
          <NavLink to="/work">
            <span className="nav-emoji">💻</span>
            <motion.span
              className="nav-label"
              animate={{ opacity: navExpanded ? 1 : 0, x: navExpanded ? 0 : -6 }}
              transition={{ duration: 0.18, delay: navExpanded ? 0.06 : 0 }}
            >
              work
            </motion.span>
          </NavLink>
          <NavLink to="/skills">
            <span className="nav-emoji">💡</span>
            <motion.span
              className="nav-label"
              animate={{ opacity: navExpanded ? 1 : 0, x: navExpanded ? 0 : -6 }}
              transition={{ duration: 0.18, delay: navExpanded ? 0.09 : 0 }}
            >
              skills
            </motion.span>
          </NavLink>
          <a href="/Tomson-J-Finosh-Resume.pdf" download>
            <span className="nav-emoji">📄</span>
            <motion.span
              className="nav-label"
              animate={{ opacity: navExpanded ? 1 : 0, x: navExpanded ? 0 : -6 }}
              transition={{ duration: 0.18, delay: navExpanded ? 0.12 : 0 }}
            >
              resume
            </motion.span>
          </a>
        </motion.nav>
      </aside>
    </>
  )
}

function LoadingIntro() {
  return (
    <motion.div className="loader" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <div className="loader-word" aria-label="Tomson J. Finosh">
        <span className="type-text">Tomson J. Finosh</span>
        <span className="wipe-dot">.</span>
      </div>
      <motion.div className="wipe-screen" initial={{ scaleX: 0 }} animate={{ scaleX: [0, 0, 1] }} transition={{ duration: 2.25, times: [0, 0.72, 1], ease: 'easeInOut' }} />
    </motion.div>
  )
}

function HomePage() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const smoothX = useSpring(x, { stiffness: 80, damping: 22 })
  const smoothY = useSpring(y, { stiffness: 80, damping: 22 })
  const nameX = useTransform(smoothX, [-320, 320], [-10, 10])
  const nameY = useTransform(smoothY, [-240, 240], [-7, 7])
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)])

  return (
    <>
      <Nav />
      <main
        className="home page"
        onPointerMove={(event) => {
          x.set(event.clientX - window.innerWidth / 2)
          y.set(event.clientY - window.innerHeight / 2)
        }}
      >
        <section className="home-layout">
          <motion.div className="intro-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <p className="eyebrow">Tomson J. Finosh — marketing-minded CSE student / brand strategist</p>
            <h1>delusional enough to imagine it. disciplined enough to make it happen.</h1>
            <p className="lede">
              3rd year CSE at Marian Engineering College. Marketing &amp; branding officer at Inspira Marian IEDC —
              shaping event identity, campus presence, and communication strategy. Also build software, shoot frames,
              and lead communities.
            </p>
          </motion.div>

          <motion.div className="hero-name-card" style={{ x: nameX, y: nameY }} whileHover={{ scale: 1.015 }}>
            <div className="name-lockup">
              <span>Tomson J.</span>
              <span>Finosh.</span>
            </div>
            <blockquote>
              "{quote[1]}" <cite>{quote[0]}</cite>
            </blockquote>
          </motion.div>
        </section>
      </main>
    </>
  )
}

function SkillsPage() {
  const [selected, setSelected] = useState(graphNodes[0])
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null)
  const navigate = useNavigate()

  // Simulation state — plain numbers
  const simRef = useRef<{
    x: number[]; y: number[]; vx: number[]; vy: number[]
  } | null>(null)

  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([])

  // SVG element refs
  const lineRefs = useRef<Map<string, SVGLineElement>>(new Map())
  const labelRefs = useRef<Map<string, SVGTextElement>>(new Map())

  // Initialize simulation in an effect so refs and Math.random are not used during render
  const initialized = useRef(false)
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    const xs: number[] = []
    const ys: number[] = []
    const vxs: number[] = []
    const vys: number[] = []
    graphNodes.forEach((n, i) => {
      const spread = i === 0 ? 0 : (Math.random() - 0.5) * 14
      xs[i] = n.x + spread
      ys[i] = n.y + (Math.random() - 0.5) * 14
      vxs[i] = 0
      vys[i] = 0
    })
    simRef.current = { x: xs, y: ys, vx: vxs, vy: vys }
  }, [])

  // Force simulation loop
  useEffect(() => {
    let running = true
    const nodes = graphNodes
    const edgeList = edges

    function frame() {
      if (!running) return
      const s = simRef.current
      if (!s) return
      const repulsion = 0.0003
      const attraction = 0.0006
      const gravity = 0.0004
      const damping = 0.95
      const minDist = 5

      for (let i = 0; i < nodes.length; i++) {
        let fx = 0; let fy = 0

        // Repulsion
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue
          const dx = s.x[i] - s.x[j]
          const dy = s.y[i] - s.y[j]
          const dist = Math.max(Math.sqrt(dx * dx + dy * dy), minDist)
          const force = repulsion / (dist * dist)
          fx += (dx / dist) * force
          fy += (dy / dist) * force
        }

        // Attraction along edges
        const nodeId = nodes[i].id
        for (const [from, to] of edgeList) {
          let targetIdx = -1
          if (from === nodeId) targetIdx = nodes.findIndex((n) => n.id === to)
          if (to === nodeId) targetIdx = nodes.findIndex((n) => n.id === from)
          if (targetIdx >= 0) {
            const dx = s.x[targetIdx] - s.x[i]
            const dy = s.y[targetIdx] - s.y[i]
            const dist = Math.sqrt(dx * dx + dy * dy) || 1
            fx += (dx / dist) * attraction * dist * 0.3
            fy += (dy / dist) * attraction * dist * 0.3
          }
        }

        // Center gravity
        const gStrength = nodes[i].id === 'tom' ? gravity * 2.5 : gravity
        fx += (50 - s.x[i]) * gStrength
        fy += (50 - s.y[i]) * gStrength

        s.vx[i] = (s.vx[i] + fx) * damping
        s.vy[i] = (s.vy[i] + fy) * damping

        const speed = Math.sqrt(s.vx[i] * s.vx[i] + s.vy[i] * s.vy[i])
        if (speed > 1.5) {
          s.vx[i] = (s.vx[i] / speed) * 1.5
          s.vy[i] = (s.vy[i] / speed) * 1.5
        }

        s.x[i] += s.vx[i]
        s.y[i] += s.vy[i]
        s.x[i] = Math.max(4, Math.min(96, s.x[i]))
        s.y[i] = Math.max(4, Math.min(96, s.y[i]))

        const el = nodeRefs.current[i]
        if (el) {
          el.style.left = s.x[i] + '%'
          el.style.top = s.y[i] + '%'
        }
      }

      edgeList.forEach(([from, to]) => {
        const ai = nodes.findIndex((n) => n.id === from)
        const bi = nodes.findIndex((n) => n.id === to)
        if (ai < 0 || bi < 0) return
        const line = lineRefs.current.get(`${from}-${to}`)
        if (line) {
          line.setAttribute('x1', s.x[ai].toFixed(2) + '%')
          line.setAttribute('y1', s.y[ai].toFixed(2) + '%')
          line.setAttribute('x2', s.x[bi].toFixed(2) + '%')
          line.setAttribute('y2', s.y[bi].toFixed(2) + '%')
        }
      })

      requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
    return () => { running = false }
  }, [])

  // Nudge on selection change
  useEffect(() => {
    const s = simRef.current
    if (!s) return
    const idx = graphNodes.findIndex((n) => n.id === selected.id)
    if (idx >= 0) {
      s.vx[idx] += (Math.random() - 0.5) * 0.3
      s.vy[idx] += (Math.random() - 0.5) * 0.3
    }
  }, [selected])

  function handleSkillClick(projectId: string | null) {
    if (projectId) {
      navigate('/work', { state: { focusProject: projectId } })
    }
  }

  function handleNodeDragStart(e: React.PointerEvent, i: number) {
    const el = e.currentTarget as HTMLButtonElement
    const s = simRef.current!
    const startX = s.x[i]
    const startY = s.y[i]
    const container = el.parentElement!
    const rect = container.getBoundingClientRect()

    function onMove(ev: PointerEvent) {
      const dx = ((ev.clientX - e.clientX) / rect.width) * 100
      const dy = ((ev.clientY - e.clientY) / rect.height) * 100
      s.x[i] = Math.max(4, Math.min(96, startX + dx))
      s.y[i] = Math.max(4, Math.min(96, startY + dy))
      s.vx[i] = 0
      s.vy[i] = 0
    }

    function onUp() {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  return (
    <>
      <Nav />
      <main className="page compact-page">

        {/* Currently deep-diving callout */}
        <section className="skill-callout">
          <p className="eyebrow">right now</p>
          <p className="callout-text">going deeper on agentic architectures and local-first AI.</p>
        </section>

        {/* Layer 1: Flat grouped skill list */}
        <section className="skill-buckets">
          {skillBuckets.map((bucket) => (
            <div key={bucket.id} className="skill-bucket" style={{ borderColor: bucket.color + '44' }}>
              <div className="bucket-head" style={{ color: bucket.color }}>
                {bucket.label}
              </div>
              <div className="bucket-items">
                {bucket.items.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    className={`skill-item ${item.projectId ? 'linked' : ''}`}
                    onClick={() => handleSkillClick(item.projectId)}
                    title={item.projectId ? `See this in action →` : undefined}
                  >
                    <span className="skill-name">{item.name}</span>
                    <span className="skill-level" style={{ color: levelColors[item.level] }}>
                      {item.level}
                    </span>
                    {item.projectId && <ArrowUpRight size={12} className="skill-arrow" />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Layer 2: Memory mesh graph */}
        <section className="page-heading" style={{ marginTop: '48px' }}>
          <p className="eyebrow">memory mesh</p>
          <h1>how it connects</h1>
          <p>Drag nodes. Explore relationships. This is how the pieces talk to each other.</p>
        </section>
        <section className="skill-mesh">
          <svg className="mesh-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {edges.map(([from, to, label]) => {
              const a = graphNodes.findIndex((node) => node.id === from)
              const b = graphNodes.findIndex((node) => node.id === to)
              if (a < 0 || b < 0) return null
              const edgeKey = `${from}-${to}`
              const isHovered = hoveredEdge === edgeKey
              return (
                <g key={edgeKey}>
                  <line
                    ref={(el) => { if (el) lineRefs.current.set(edgeKey, el) }}
                    x1={`${graphNodes[a].x}%`} y1={`${graphNodes[a].y}%`}
                    x2={`${graphNodes[b].x}%`} y2={`${graphNodes[b].y}%`}
                    stroke={isHovered
                      ? (bucketColors[graphNodes.find((n) => n.id === from)?.bucket ?? 'center'] ?? '#888')
                      : 'rgba(244, 244, 240, 0.18)'}
                    strokeWidth={isHovered ? 0.6 : 0.18}
                    style={{ transition: 'stroke 200ms, stroke-width 200ms, opacity 200ms' }}
                  />
                  {label && (
                    <text
                      ref={(el) => { if (el) labelRefs.current.set(edgeKey, el) }}
                      x={`${(graphNodes[a].x + graphNodes[b].x) / 2}%`}
                      y={`${(graphNodes[a].y + graphNodes[b].y) / 2 - 3}%`}
                      fill={bucketColors[graphNodes.find((n) => n.id === from)?.bucket ?? 'center'] ?? '#888'}
                      fontSize="2.5"
                      textAnchor="middle"
                      fontFamily="JetBrains Mono, monospace"
                      opacity={isHovered ? 1 : 0}
                      style={{ transition: 'opacity 200ms' }}
                    >
                      {label}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
          {graphNodes.map((node, i) => (
            <button
              type="button"
              key={node.id}
              ref={(el) => { nodeRefs.current[i] = el }}
              className={`mesh-node ${node.size} ${selected.id === node.id ? 'active' : ''}`}
              style={{
                left: `${graphNodes[i].x}%`,
                top: `${graphNodes[i].y}%`,
                borderColor: selected.id === node.id
                  ? (bucketColors[node.bucket] ?? '#f4f4f0')
                  : 'var(--line-strong)',
                boxShadow: selected.id === node.id
                  ? `0 0 20px ${(bucketColors[node.bucket] ?? '#f4f4f0') + '44'}`
                  : '0 20px 80px rgba(0,0,0,0.45)',
              }}
              onPointerDown={(e) => handleNodeDragStart(e, i)}
              onClick={() => setSelected(node)}
              onMouseEnter={() => {
                const connected = edges.filter((edge) => edge[0] === node.id || edge[1] === node.id)
                connected.forEach((edge) => setHoveredEdge(`${edge[0]}-${edge[1]}`))
              }}
              onMouseLeave={() => setHoveredEdge(null)}
            >
              {node.label}
            </button>
          ))}
          <aside className="mesh-readout">
            <span>selected node</span>
            <strong style={{ color: bucketColors[selected.bucket] ?? '#f4f4f0' }}>{selected.label}</strong>
            <p>{meshCopy(selected.id)}</p>
            {selected.id !== 'tom' && (
              <p className="mesh-relation">
                {edges
                  .filter((edge) => (edge[0] === selected.id || edge[1] === selected.id) && (edge[0] === 'tom' || edge[1] === 'tom'))
                  .map((edge) => {
                    return edge[2] ? `relation: ${edge[2]} tom` : ''
                  })
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            )}
          </aside>
        </section>
      </main>
    </>
  )
}

function meshCopy(id: string) {
  const copy: Record<string, string> = {
    tom: 'The center of the graph — a builder who connects code, brand, AI, and people.',
    react: 'Full-stack build muscle. React + TypeScript is the daily driver stack.',
    code: 'Full-stack development: React, TypeScript, Vite, Tailwind, and deployment pipelines.',
    ai: 'Exploring agentic architectures with OpenCode, MCP, and local LLMs.',
    opencode: 'Primary workflow tool — building custom agents and automation pipelines.',
    brand: 'Three years of IEDC marketing and branding. Identity, positioning, attention.',
    lead: 'Events, clubs, council, and communities. Leads by doing, not delegating.',
    events: 'IEDC events, college fests, media coverage — the room runs on coordination.',
    photo: 'Photography as a second language. Composition, timing, and visual memory.',
    postgres: 'Database layer for real apps — Supabase RLS, schemas, migrations.',
    foss: 'Ran FOSS Club for a year — open-source culture and student energy.',
    cse: '3rd year CSE at Marian Engineering College — formal CS foundation.',
  }
  return copy[id] ?? 'A node in the mesh — connected to the whole system.'
}

function WorkPage() {
  const location = useLocation()
  const focusFromState = (location.state as { focusProject?: string } | null)?.focusProject ?? null
  const [activeProject, setActiveProject] = useState<string | null>(focusFromState)

  // Clear the route state after consuming it so reloads don't re-trigger
  useEffect(() => {
    if (focusFromState) {
      window.history.replaceState({}, document.title)
    }
  }, [focusFromState])

  return (
    <>
      <Nav />
      <main className="page compact-page">

        <section className="page-heading">
          <p className="eyebrow">projects</p>
          <h1>things i have built.</h1>
          <p>Each project starts with a real problem. Click any card for the full story — hook, build decisions, proof, and links.</p>
        </section>

        <section className="project-grid">
          {projects.map((p) => (
            <motion.button
              type="button"
              key={p.id}
              className={`project-card ${activeProject === p.id ? 'open' : ''}`}
              layout
              onClick={() => setActiveProject(activeProject === p.id ? null : p.id)}
            >
              <div className="pc-header">
                <span className="pc-hook">{p.hook}</span>
                <h2>{p.name}</h2>
                <small className="pc-stack-inline">{p.stack}</small>
              </div>
              <AnimatePresence>
                {activeProject === p.id && (
                  <motion.div
                    className="pc-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="pc-detail-row">
                      <strong>Problem</strong>
                      <p>{p.problem}</p>
                    </div>
                    <div className="pc-detail-row">
                      <strong>What I Built</strong>
                      <p>{p.build}</p>
                    </div>
                    <div className="pc-detail-row">
                      <strong>Proof</strong>
                      <p>{p.proof}</p>
                    </div>
                    <div className="pc-detail-row">
                      <strong>Stack</strong>
                      <p>{p.stack}</p>
                    </div>
                    <div className="pc-links">
                      {p.links.map((link) => (
                        <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="pc-link">
                          {link.label} <ArrowUpRight size={14} />
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </section>
      </main>
    </>
  )
}

function ContactPage() {
  const [intent, setIntent] = useState('collaborate')
  const [copied, setCopied] = useState(false)
  const subject = encodeURIComponent(`Portfolio: ${intent}`)

  async function copyEmail() {
    await navigator.clipboard.writeText(contact.email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <>
      <Nav />
      <main className="page compact-page contact-page">

        <section className="contact-grid">
          <div className="contact-copy">
            <p className="eyebrow">contact</p>
            <h1>send the brief. i will bring the energy.</h1>
            <p>
              Reach out for AI ideas, web builds, college events, branding, photography, media work, or anything that
              needs someone who can lead the room and still notice the details.
            </p>
          </div>
          <div className="contact-card">
            <span>{contact.name}</span>
            <strong>{contact.place}</strong>
            <small>3rd year CSE / Marian Engineering College / Inspira Marian IEDC</small>
          </div>
        </section>

        <section className="intent-card">
          <div className="intent-picker" role="group" aria-label="contact intent">
            {['hire me', 'collaborate', 'event/photo', 'AI idea'].map((item) => (
              <button className={intent === item ? 'active' : ''} type="button" key={item} onClick={() => setIntent(item)}>
                {item}
              </button>
            ))}
          </div>
          <a className="email-link" href={`mailto:${contact.email}?subject=${subject}`}>
            {contact.email}
            <ArrowUpRight size={18} />
          </a>
          <button className="copy-button" type="button" onClick={copyEmail}>
            <Copy size={16} />
            {copied ? 'copied. see you soon.' : 'copy email'}
          </button>
        </section>

        <section className="contact-links">
          <ContactLink href={contact.github} label="Silly-Goose-duh" icon={<GitBranch size={28} />} mark="GH" />
          <ContactLink href={contact.linkedin} label="Tomson J. Finosh" icon={<LinkIcon size={28} />} mark="in" />
          <ContactLink href={contact.instagram} label="me_nosmot" icon={<AtSign size={28} />} mark="IG" />
          <a href="/Tomson-J-Finosh-Resume.pdf" download className="resume-download-link" data-mark="CV">
            <ArrowDownToLine size={28} />
            <span>Download Resume (PDF)</span>
            <ArrowUpRight size={16} />
          </a>
          <ContactLink href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.place)}`} label={contact.place} icon={<MapPin size={28} />} mark="TVM" />
        </section>
      </main>
    </>
  )
}

function StoryPage() {
  return (
    <>
      <Nav />
      <main className="page story-page">

        <article className="story-sheet">
          <p className="eyebrow">my story</p>
          <h1>still becoming.</h1>
          {storyText.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </article>
      </main>
    </>
  )
}

function ContactLink({ href, label, icon, mark }: { href: string; label: string; icon: ReactNode; mark: string }) {
  return (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" data-mark={mark}>
      {icon}
      <span>{label}</span>
      <ArrowUpRight size={16} />
    </a>
  )
}

function Duck() {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function resetIdle() {
      if (timerRef.current) clearTimeout(timerRef.current)
      setVisible(false)
      timerRef.current = setTimeout(() => setVisible(true), 10_000)
    }

    resetIdle()
    window.addEventListener('pointermove', resetIdle)
    window.addEventListener('keydown', resetIdle)
    window.addEventListener('scroll', resetIdle)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      window.removeEventListener('pointermove', resetIdle)
      window.removeEventListener('keydown', resetIdle)
      window.removeEventListener('scroll', resetIdle)
    }
  }, [])

  function dismiss() {
    setVisible(false)
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="duck-runner"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-live="polite"
        >
          <span className="duck-bubble">
            psst. found me.
            <button className="duck-dismiss" type="button" onClick={dismiss} aria-label="dismiss">✕</button>
          </span>
          <img src={duckAvatar} alt="" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function App() {
  const location = useLocation()
  const [loading, setLoading] = useState(() => !sessionStorage.getItem('tommy-loaded'))

  useEffect(() => {
    if (!loading) return
    const timer = window.setTimeout(() => {
      sessionStorage.setItem('tommy-loaded', 'true')
      setLoading(false)
    }, 2500)
    return () => window.clearTimeout(timer)
  }, [loading])

  return (
    <>
      <AnimatePresence>{loading && <LoadingIntro />}</AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/story" element={<StoryPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Duck />
    </>
  )
}

export default App
