# Portfolio — Project Structure

## Quick Start
```bash
npm install
npm start
```

---

## Complete File Tree

```
portfolio/
│
├── public/
│   └── index.html              ← Root HTML shell (fonts imported here)
│
├── src/
│   ├── index.js                ← React entry point (mounts App into #root)
│   ├── App.jsx                 ← Root component; wires all sections + runs scroll observer
│   │
│   ├── components/             ← One file per UI component
│   │   ├── Cursor.jsx          ← Custom animated cursor + trailing ring
│   │   ├── Navbar.jsx          ← Fixed top navigation bar
│   │   ├── Hero.jsx            ← Landing section (name, tagline, avatar)
│   │   ├── Stats.jsx           ← Stats bar (projects / clients / years / tech)
│   │   ├── Works.jsx           ← Works section shell + grid layout
│   │   ├── WorkCard.jsx        ← Individual expandable project card
│   │   ├── Contact.jsx         ← Contact section with link rows
│   │   └── Footer.jsx          ← Bottom footer bar
│   │
│   ├── data/
│   │   └── works.js            ← All project data (title, desc, tech, links…)
│   │
│   └── styles/                 ← One CSS file per component
│       ├── global.css          ← CSS variables, reset, .reveal animation, shared classes
│       ├── cursor.css          ← Cursor dot + ring styles
│       ├── navbar.css          ← Navbar styles
│       ├── hero.css            ← Hero section + avatar rings + buttons
│       ├── stats.css           ← Stats bar
│       ├── works.css           ← Works grid + card + expanded details
│       ├── contact.css         ← Contact section + link rows
│       └── footer.css          ← Footer
│
├── package.json
└── README.md
```

---

## What to Fill In

| File | What to change |
|------|---------------|
| `public/index.html` | Page `<title>` |
| `src/components/Navbar.jsx` | Your logo text |
| `src/components/Hero.jsx` | Your name, tagline, photo (swap avatar placeholder with `<img>`) |
| `src/components/Stats.jsx` | Real numbers for projects / clients / years / tech |
| `src/data/works.js` | Your actual projects (add `previewImg` field per card) |
| `src/components/Contact.jsx` | Your email, LinkedIn, GitHub, Twitter |
| `src/components/Footer.jsx` | Your name, year |
| `src/styles/global.css` | Tweak `--accent` / `--accent2` colors if desired |

---

## Adding Your Photo
In `Hero.jsx`, replace the `<div className="avatar-placeholder">` block with:
```jsx
<img
  src="/your-photo.jpg"
  alt="Your Name"
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>
```
Put `your-photo.jpg` inside the `public/` folder.

## Adding Project Previews
In `data/works.js`, add a `previewImg` field to each project:
```js
previewImg: '/previews/project-alpha.png',
```
Then in `WorkCard.jsx`, replace the `<span className="mock-label">` with:
```jsx
<img src={work.previewImg} alt={work.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
```
