import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  ArrowDownToLine,
  ArrowUpRight,
  AtSign,
  Camera,
  Copy,
  Cpu,
  GitBranch,
  Link as LinkIcon,
  MapPin,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import duckAvatar from './assets/duck-avatar.jpg'
import './App.css'

type CategoryDef = {
  id: string
  label: string
  icon: string
  subpoints: string[]
}

type ProjectStatus = 'live' | 'in-development' | 'recurring' | 'archived'

type Project = {
  id: string
  category: string
  title: string
  hook: string
  description: string
  status: ProjectStatus
  statusLabel: string
  stack: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

type GitHubLabItem = {
  id: string
  title: string
  tag: string
  githubUrl: string
  liveUrl?: string
}

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  TrendingUp,
  Users,
  Camera,
}

const statusColors: Record<ProjectStatus, string> = {
  live: '#6fcf97',
  'in-development': '#f2c94c',
  recurring: '#6ba4ff',
  archived: '#888',
}

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
      { name: 'Next.js', level: 'comfortable', projectId: 'dot' },
      { name: 'Vercel (deploy/CI)', level: 'daily driver', projectId: 'campuspass' },
      { name: 'React Native / Expo', level: 'learning', projectId: 'dot' },
    ],
  },
  {
    id: 'ai',
    label: 'Agentic / AI tooling',
    color: '#6fcf97',
    items: [
      { name: 'OpenCode (custom agent building)', level: 'daily driver', projectId: 'dot' },
      { name: 'MCP (Model Context Protocol)', level: 'comfortable', projectId: 'dot' },
      { name: 'Anthropic API', level: 'comfortable', projectId: 'dot' },
      { name: 'Ollama / local LLMs', level: 'learning', projectId: 'dot' },
      { name: 'Vector memory (ChromaDB, pgvector)', level: 'learning', projectId: 'dot' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend / infra',
    color: '#f2c94c',
    items: [
      { name: 'PostgreSQL', level: 'comfortable', projectId: 'campuspass' },
      { name: 'Fastify', level: 'learning', projectId: 'dot' },
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

const categories: CategoryDef[] = [
  {
    id: 'ai-product',
    label: 'AI & Product Development',
    icon: 'Cpu',
    subpoints: ['AI & Machine Learning', 'Software Development', 'Product Development', 'Product Management', 'Innovation & Ideation'],
  },
  {
    id: 'marketing-growth',
    label: 'Marketing & Growth',
    icon: 'TrendingUp',
    subpoints: ['Marketing', 'Branding', 'Digital Marketing', 'Content Marketing'],
  },
  {
    id: 'community-business',
    label: 'Community & Business',
    icon: 'Users',
    subpoints: ['Community Building', 'Open Source', 'Sponsorship & Business Development', 'Public Speaking', 'Cross-functional Leadership', 'Project Ownership'],
  },
  {
    id: 'creative-media',
    label: 'Creative Media',
    icon: 'Camera',
    subpoints: ['Photography', 'Photo Editing', 'Video Editing', 'Creative Writing', 'Literature & Philosophy'],
  },
]

const projects: Project[] = [
  // AI & PRODUCT DEVELOPMENT
  {
    id: 'campuspass',
    category: 'ai-product',
    title: 'CampusPass',
    hook: 'Event platform live for 2,000+ students at MEC',
    description: "MEC ran event sign-ups through Google Forms and WhatsApp broadcasts — no real-time headcount, no unified view across clubs. Built a full event hub where club admins create custom registration forms, students browse and register in one place, and a superadmin panel gives oversight across all clubs. Used Supabase row-level security to isolate each club's data.",
    status: 'live',
    statusLabel: 'LIVE · PRODUCTION',
    stack: ['React', 'TypeScript', 'Supabase', 'Tailwind', 'Framer Motion'],
    liveUrl: 'https://mec-campuspass.vercel.app',
    githubUrl: 'https://github.com/Silly-Goose-duh/MakeYourPass',
    featured: true,
  },
  {
    id: 'dot',
    category: 'ai-product',
    title: 'Dot',
    hook: 'Personal AI engineering command center — direct filesystem/terminal access from your phone',
    description: 'A password-gated command center for working with AI agents on real projects — live terminal access over WebSocket, git status/diff/commit operations, and secure filesystem read/write, all reachable remotely from a mobile client. Built as a monorepo: Fastify API, Next.js dashboard, Expo mobile app in progress. The core decision was giving remote AI-agent workflows the same file and git access a local dev session has, without opening it up beyond a single authenticated user.',
    status: 'in-development',
    statusLabel: 'IN DEVELOPMENT',
    stack: ['Fastify', 'TypeScript', 'Next.js', 'Expo', 'WebSocket'],
    githubUrl: 'https://github.com/Silly-Goose-duh/Dot',
    featured: false,
  },
  {
    id: 'portfolio-system',
    category: 'ai-product',
    title: 'Personal portfolio',
    hook: 'The site you\'re on — dark, animated, built with React and a very suspicious duck',
    description: 'The portfolio itself: React, Framer Motion, fully responsive, built and iterated entirely through prompt-driven development with a custom OpenCode agent.',
    status: 'live',
    statusLabel: 'LIVE',
    stack: ['React', 'TypeScript', 'Framer Motion', 'CSS'],
    liveUrl: 'https://tomson-j-finosh.vercel.app',
    githubUrl: 'https://github.com/Silly-Goose-duh/tomson-j-finosh-portfolio',
    featured: false,
  },

  // MARKETING & GROWTH
  {
    id: 'iedc-branding',
    category: 'marketing-growth',
    title: 'Brand & campaign strategy — Inspira Marian IEDC',
    hook: 'Marketing and Branding Officer, 3 years running',
    description: 'Own visual identity, messaging, and campaign strategy across Inspira Marian IEDC\'s events and initiatives — from social campaigns to on-ground brand presence at large-scale events like Eden and TPT.',
    status: 'recurring',
    statusLabel: 'ONGOING · 3 YEARS',
    stack: ['Brand strategy', 'Content', 'Campaign design'],
    featured: true,
  },

  // COMMUNITY & BUSINESS
  {
    id: 'foss-lead',
    category: 'community-business',
    title: 'FOSS Club Lead — Marian Engineering College',
    hook: 'Leading MEC\'s open-source community, 2025–2026',
    description: 'Run the campus open-source community: organizing events, driving member engagement, and building the bridge between student developers and the wider open-source ecosystem.',
    status: 'recurring',
    statusLabel: '2025–2026',
    stack: ['Community building', 'Open source', 'Event ops'],
    featured: true,
  },
  {
    id: 'eden',
    category: 'community-business',
    title: 'Eden 3.0 & 4.0',
    hook: 'State-level hackathon hosted by MEC, IEDC, and µLearn MCE',
    description: 'A 2-day state-level hackathon — 24-hour build on day one, judging and winners on day two — challenging students to solve real industry problems. Ran across two editions, coordinating with Inspira Marian IEDC and µLearn MCE as co-hosts.',
    status: 'recurring',
    statusLabel: '2 EDITIONS RUN',
    stack: ['Event strategy', 'Sponsorship', 'Cross-team coordination'],
    liveUrl: 'https://eden.marian.ac.in/',
    featured: false,
  },
  {
    id: 'tpt',
    category: 'community-business',
    title: 'TPT 3.0 & 4.0 — The Perfect Trajectory',
    hook: 'Kerala-wide orientation camp for newly-elected IEDC leads',
    description: 'A two-day onboarding program for newly-elected IEDC team leads from across Kerala — aligning new leadership on strategy, execution, and what running an IEDC chapter actually takes. Organized sponsorship structure and statewide outreach across two editions.',
    status: 'recurring',
    statusLabel: '2 EDITIONS RUN',
    stack: ['Event strategy', 'Sponsorship', 'Statewide outreach'],
    liveUrl: 'https://tpt-4.vercel.app/',
    featured: false,
  },

  // CREATIVE MEDIA
  {
    id: 'photography',
    category: 'creative-media',
    title: 'Photography & Video',
    hook: 'The person people remember with a camera at every event — 3 years',
    description: 'Event and portrait photography plus photo/video editing across IEDC and campus media work. [TODO: swap this card for a photo gallery grid component.]',
    status: 'recurring',
    statusLabel: '3 YEARS',
    stack: ['Photography', 'Photo editing', 'Video editing'],
    featured: true,
  },
  {
    id: 'sharon-wedding',
    category: 'ai-product',
    title: 'Sharon & Amala — Wedding site',
    hook: 'Custom wedding website and digital invitation',
    description: 'A wedding website with animated overlays and a matching 9:16 digital invitation card, built end-to-end for a friend\'s wedding.',
    status: 'live',
    statusLabel: 'LIVE',
    stack: ['React', 'AOS', 'tsParticles', 'canvas-confetti'],
    liveUrl: 'https://sharonwedsamala.vercel.app',
    githubUrl: 'https://github.com/Silly-Goose-duh/sharon-weds-amala',
    featured: false,
  },
]

const githubLab: GitHubLabItem[] = [
  {
    id: 'password-generator',
    title: 'password-generator',
    tag: 'LEARNING',
    githubUrl: 'https://github.com/Silly-Goose-duh/password-generator',
    liveUrl: 'https://password-generator-virid-two.vercel.app',
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
  const [selected, setSelected] = useState<typeof graphNodes[0] | null>(null)
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

  // Initialize simulation — all nodes start at center, burst outward
  const initialized = useRef(false)
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    const xs: number[] = []
    const ys: number[] = []
    const vxs: number[] = []
    const vys: number[] = []
    graphNodes.forEach((_, i) => {
      // All nodes start at center
      xs[i] = 50
      ys[i] = 50
      // Random kick to break symmetry — each node gets a unique direction
      const angle = (Math.PI * 2 * i) / graphNodes.length + (Math.random() - 0.5) * 0.5
      const speed = 0.3 + Math.random() * 0.4
      vxs[i] = Math.cos(angle) * speed
      vys[i] = Math.sin(angle) * speed
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
      const repulsion = 0.008
      const attraction = 0.002
      const gravity = 0
      const damping = 0.9
      const minDist = 0.5
      const boundary = 8 // padding from edge = 8%

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

        // Very mild center gravity — prevents drift but doesn't pull nodes in
        fx += (50 - s.x[i]) * gravity * 0.08
        fy += (50 - s.y[i]) * gravity * 0.08

        // Boundary force — push away from edges
        const edgeRepel = 0.004
        if (s.x[i] < boundary) fx += edgeRepel * (boundary - s.x[i])
        if (s.x[i] > 100 - boundary) fx -= edgeRepel * (s.x[i] - (100 - boundary))
        if (s.y[i] < boundary) fy += edgeRepel * (boundary - s.y[i])
        if (s.y[i] > 100 - boundary) fy -= edgeRepel * (s.y[i] - (100 - boundary))

        s.vx[i] = (s.vx[i] + fx) * damping
        s.vy[i] = (s.vy[i] + fy) * damping

        const speed = Math.sqrt(s.vx[i] * s.vx[i] + s.vy[i] * s.vy[i])
        if (speed > 1.5) {
          s.vx[i] = (s.vx[i] / speed) * 1.5
          s.vy[i] = (s.vy[i] / speed) * 1.5
        }

        s.x[i] += s.vx[i]
        s.y[i] += s.vy[i]

        // Hard clamp to boundary
        s.x[i] = Math.max(boundary, Math.min(100 - boundary, s.x[i]))
        s.y[i] = Math.max(boundary, Math.min(100 - boundary, s.y[i]))

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
    const idx = selected ? graphNodes.findIndex((n) => n.id === selected.id) : -1
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
    const s = simRef.current!
    const startX = s.x[i]
    const startY = s.y[i]
    const container = e.currentTarget.parentElement!
    const rect = container.getBoundingClientRect()
    const boundary = 8

    function onMove(ev: PointerEvent) {
      const dx = ((ev.clientX - e.clientX) / rect.width) * 100
      const dy = ((ev.clientY - e.clientY) / rect.height) * 100
      s.x[i] = Math.max(boundary, Math.min(100 - boundary, startX + dx))
      s.y[i] = Math.max(boundary, Math.min(100 - boundary, startY + dy))
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

  const sim = simRef.current

  return (
    <>
      <Nav />
      <main className="skills-page-layout">
        {/* LEFT COLUMN: heading + buckets + node detail */}
        <div className="skills-left">
          <div className="skills-left-inner">
            <section className="skills-header">
              <p className="eyebrow">skills</p>
              <h1 className="skills-title">memory mesh</h1>
              <p className="skills-sub">Everything connects: AI curiosity, branding instincts, coding, photography, events, and leadership.</p>
            </section>

            {/* Skill buckets — compact single column */}
            <section className="skills-buckets-col">
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
                        {item.projectId && <ArrowUpRight size={10} className="skill-arrow" />}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Node detail panel — docked at bottom of left column, never occludes graph */}
          <aside className="mesh-readout-docked">
            {selected ? (
              <>
                <div className="docked-head">
                  <span className="eyebrow">selected node</span>
                  <button
                    type="button"
                    className="docked-close"
                    onClick={() => setSelected(null)}
                    aria-label="deselect"
                  >
                    ✕
                  </button>
                </div>
                <strong className="docked-title" style={{ color: bucketColors[selected.bucket] ?? '#f4f4f0' }}>
                  {selected.label}
                </strong>
                <p className="docked-desc">{meshCopy(selected.id)}</p>
                {selected.id !== 'tom' && (
                  <p className="mesh-relation">
                    {edges
                      .filter((edge) => (edge[0] === selected.id || edge[1] === selected.id) && (edge[0] === 'tom' || edge[1] === 'tom'))
                      .map((edge) => edge[2] ? `relation: ${edge[2]} tom` : '')
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                )}
              </>
            ) : (
              <p className="docked-idle">click a node in the graph to explore how skills connect.</p>
            )}
          </aside>
        </div>

        {/* RIGHT COLUMN: memory mesh graph */}
        <div className="skills-right">
          <div className="skill-mesh-container">
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
                        y={`${(graphNodes[a].y + graphNodes[b].y) / 2 - 2}%`}
                        fill={bucketColors[graphNodes.find((n) => n.id === from)?.bucket ?? 'center'] ?? '#888'}
                        fontSize="2.2"
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
                className={`mesh-node ${node.size} ${selected?.id === node.id ? 'active' : ''}`}
                style={{
                  left: `${sim ? sim.x[i] : graphNodes[i].x}%`,
                  top: `${sim ? sim.y[i] : graphNodes[i].y}%`,
                  borderColor: selected?.id === node.id
                    ? (bucketColors[node.bucket] ?? '#f4f4f0')
                    : 'var(--line-strong)',
                  boxShadow: selected?.id === node.id
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
          </div>
        </div>
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

  // Derive initial category from focusProject, default to 'ai-product'
  const focusProject = focusFromState ? projects.find((p) => p.id === focusFromState) : null
  const [activeCategory, setActiveCategory] = useState(focusProject?.category ?? 'ai-product')
  const [activeProjectId, setActiveProjectId] = useState<string | null>(focusFromState)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Clear route state on mount
  useEffect(() => {
    if (focusFromState) {
      window.history.replaceState({}, document.title)
    }
  }, [focusFromState])

  // Filter projects for active category
  const categoryProjects = projects.filter((p) => p.category === activeCategory)
  const featured = categoryProjects.find((p) => p.id === activeProjectId)
    ?? categoryProjects.find((p) => p.featured)
    ?? categoryProjects[0]

  function switchCategory(id: string) {
    setActiveCategory(id)
    const firstFeatured = projects.filter((p) => p.category === id).find((p) => p.featured)
    setActiveProjectId(firstFeatured?.id ?? null)
  }

  function handlePrev() {
    const idx = categoryProjects.findIndex((p) => p.id === activeProjectId)
    const prev = (idx - 1 + categoryProjects.length) % categoryProjects.length
    setActiveProjectId(categoryProjects[prev].id)
  }

  function handleNext() {
    const idx = categoryProjects.findIndex((p) => p.id === activeProjectId)
    const next = (idx + 1) % categoryProjects.length
    setActiveProjectId(categoryProjects[next].id)
  }

  const category = categories.find((c) => c.id === activeCategory)!

  return (
    <>
      <Nav />
      <main className="page compact-page work-page">

        {/* Category nav — 4 pill tabs */}
        <nav className="category-nav">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon]
            return (
              <button
                key={cat.id}
                type="button"
                className={`cat-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => switchCategory(cat.id)}
              >
                <Icon size={16} />
                <span>{cat.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Things I Do — subpoints strip */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="things-strip"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
          >
            {category.subpoints.map((point) => (
              <span key={point} className="things-chip">{point}</span>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Featured project — large detail card */}
        <AnimatePresence mode="wait">
          <motion.section
            key={activeProjectId}
            className="featured-project"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {featured && <FeaturedProjectCard project={featured} />}
          </motion.section>
        </AnimatePresence>

        {/* Project carousel — circular thumbnails */}
        {categoryProjects.length > 1 && (
          <section className="project-carousel-wrap">
            <div className="carousel-nav-line">
              <button type="button" className="carousel-arrow" onClick={handlePrev} aria-label="previous">
                <ArrowUpRight size={18} style={{ rotate: '-135deg' }} />
              </button>
            </div>
            <div className="project-carousel" ref={carouselRef}>
              {categoryProjects.map((p) => {
                const isActive = p.id === activeProjectId
                const statusColor = statusColors[p.status] ?? '#888'
                return (
                  <button
                    key={p.id}
                    type="button"
                    className={`carousel-thumb ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveProjectId(p.id)}
                  >
                    <div
                      className="carousel-circle"
                      style={{
                        borderColor: isActive ? statusColor : 'var(--line-strong)',
                        boxShadow: isActive ? `0 0 12px ${statusColor}44` : 'none',
                        opacity: isActive ? 1 : 0.55,
                        width: isActive ? 72 : 52,
                        height: isActive ? 72 : 52,
                      }}
                    >
                      <span className="carousel-circle-letter">{p.title[0]}</span>
                    </div>
                    <span className={`carousel-label ${isActive ? 'active' : ''}`}>
                      {p.title}
                    </span>
                  </button>
                )
              })}
            </div>
            <div className="carousel-nav-line right">
              <button type="button" className="carousel-arrow" onClick={handleNext} aria-label="next">
                <ArrowUpRight size={18} style={{ rotate: '45deg' }} />
              </button>
            </div>
          </section>
        )}

        {/* GitHub lab strip — learning/fun projects */}
        <section className="github-lab">
          <p className="eyebrow" style={{ marginBottom: 14 }}>more on github</p>
          <div className="github-lab-grid">
            {githubLab.map((item) => (
              <div key={item.id} className="gl-card">
                <div className="gl-card-top">
                  <span className="gl-tag">{item.tag}</span>
                  <strong>{item.title}</strong>
                </div>
                <div className="gl-card-links">
                  {item.liveUrl && (
                    <a href={item.liveUrl} target="_blank" rel="noreferrer" className="gl-link">
                      live <ArrowUpRight size={12} />
                    </a>
                  )}
                  <a href={item.githubUrl} target="_blank" rel="noreferrer" className="gl-link">
                    github <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <div className="fp-card">
      <div className="fp-card-main">
        <span className="fp-status" style={{ color: statusColors[project.status] }}>
          {project.statusLabel}
        </span>
        <h2 className="fp-title">{project.title}</h2>
        <p className="fp-hook">{project.hook}</p>
        <p className="fp-desc">{project.description}</p>
        <div className="fp-stack">
          {project.stack.map((s) => (
            <span key={s} className="fp-stack-tag">{s}</span>
          ))}
        </div>
        <div className="fp-card-links">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="fp-link">
              view project <ArrowUpRight size={14} />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="fp-link">
              github <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
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
