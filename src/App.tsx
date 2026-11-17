import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Download,
  Globe,
  Mail,
  MapPin,
  Menu,
  MessageSquareText,
  Sparkles,
  X,
} from 'lucide-react'
import { type FormEvent, useEffect, useState } from 'react'
import './App.css'
import { SectionHeading } from './components/SectionHeading'
import { experienceItems, profile, projectItems, serviceItems, skillGroups } from './data/portfolio'
import type { SectionId } from './types/portfolio'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const

const currentYear = 2026
const isVerifiedProfileUrl = (url: string) => !/yourusername|your-linkedin/i.test(url)

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function ProjectArtifact({ index, title, features }: { index: number; title: string; features: string[] }) {
  const visualTypes = ['recruiting', 'learning', 'crm', 'expense', 'health'] as const
  const visualType = visualTypes[index % visualTypes.length]

  return (
    <div className={`project-artifact project-artifact--${visualType}`} aria-label={`Schematic interface study for ${title}`}>
      <div className="artifact-window">
        <div className="artifact-toolbar">
          <span className="artifact-mark" aria-hidden="true" />
          <span>{visualType === 'health' ? 'SERVICE FLOW' : `${visualType.toUpperCase()} / WORKSPACE`}</span>
          <span className="artifact-toolbar-end">SCHEMATIC</span>
        </div>
        <div className="artifact-content">
          {visualType === 'recruiting' && (
            <>
              <div className="artifact-title-line"><span>Candidate workflow</span><i /></div>
              <div className="artifact-workflow">
                {features.slice(0, 3).map((feature, featureIndex) => (
                  <div className="artifact-workflow-row" key={feature}>
                    <b>0{featureIndex + 1}</b><span>{feature}</span><i />
                  </div>
                ))}
              </div>
            </>
          )}
          {visualType === 'learning' && (
            <>
              <div className="artifact-title-line"><span>Learning path</span><i /></div>
              <div className="artifact-course">
                <div className="artifact-course-thumb"><span>01</span></div>
                <div><b>Course overview</b><span>Progress &amp; enrollment</span><i /></div>
              </div>
              <div className="artifact-course-line"><i /><i /><i /></div>
            </>
          )}
          {visualType === 'crm' && (
            <>
              <div className="artifact-title-line"><span>Pipeline overview</span><i /></div>
              <div className="artifact-pipeline">
                {['Leads', 'In review', 'Active'].map((column, columnIndex) => (
                  <div key={column}><b>{column}</b><i /><i className={columnIndex === 1 ? 'long' : ''} /><i /></div>
                ))}
              </div>
            </>
          )}
          {visualType === 'expense' && (
            <>
              <div className="artifact-title-line"><span>Spending overview</span><i /></div>
              <div className="artifact-chart"><i /><i /><i /><i /><i /><i /><i /></div>
              <div className="artifact-legend"><i /><span>Transactions</span><i /><span>Categories</span></div>
            </>
          )}
          {visualType === 'health' && (
            <>
              <div className="artifact-title-line"><span>Inquiry journey</span><i /></div>
              <div className="artifact-health-layout">
                <div className="artifact-health-block"><i /><i /><i /></div>
                <div className="artifact-health-copy"><i /><i /><i /><b>Appointment inquiry</b></div>
              </div>
            </>
          )}
        </div>
        <div className="artifact-feature-line">
          {features.slice(0, 2).map((feature) => <span key={feature}>{feature}</span>)}
        </div>
      </div>
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [formStatus, setFormStatus] = useState<{ type: 'info' | 'error' | 'idle'; message: string }>({
    type: 'idle',
    message: '',
  })

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id as SectionId)
        }
      },
      { threshold: [0.2, 0.5, 0.75], rootMargin: '-10% 0px -45% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { name, email, subject, message } = formState
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setFormStatus({ type: 'error', message: 'Please complete all required fields before sending.' })
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormStatus({ type: 'error', message: 'Please enter a valid email address.' })
      return
    }

    if (message.trim().length < 20) {
      setFormStatus({
        type: 'error',
        message: 'Please include a little more detail so the message is clear and actionable.',
      })
      return
    }

    const emailSubject = encodeURIComponent(subject.trim())
    const emailBody = encodeURIComponent(`From: ${name.trim()} <${email.trim()}>\n\n${message.trim()}`)
    setFormStatus({
      type: 'info',
      message: `Opening your email app to send this message to ${profile.email}. You will need to press Send in your email app.`,
    })
    window.location.href = `mailto:${profile.email}?subject=${emailSubject}&body=${emailBody}`
  }

  return (
    <div className="portfolio-app min-h-screen bg-[#09090b] text-zinc-100 antialiased">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090b]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3" aria-label="Go to home section">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/10 text-sm font-bold text-violet-200">
              SD
            </div>
            <p className="text-sm font-semibold text-white">{profile.name}</p>
          </a>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-sm transition ${
                  activeSection === item.id ? 'text-violet-200' : 'text-zinc-300 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={profile.resumeUrl}
            download
            className="hidden items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-100 transition hover:border-violet-300 hover:bg-violet-500/20 md:inline-flex"
          >
            <Download size={16} />
            Download Resume
          </a>

          <button
            type="button"
            className="inline-flex rounded-lg border border-white/10 p-2 text-zinc-100 md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mx-auto max-w-7xl border-t border-white/10 px-4 py-4 md:hidden"
            >
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href={profile.resumeUrl}
                  download
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-100"
                >
                  <Download size={16} />
                  Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section id="home" className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeInUp}
            className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]"
          >
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                {profile.availability}
              </div>

              <p className="text-sm font-medium uppercase tracking-[0.28em] text-violet-300">
                Hi, I’m {profile.name}
              </p>
              <h1 className="mt-6 max-w-xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                {profile.title}
              </h1>
              <p className="mt-5 max-w-xl text-2xl font-medium text-zinc-200 sm:text-3xl">{profile.tagline}</p>
              <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300">{profile.description}</p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
                >
                  View Projects <ArrowDown className="rotate-[-90deg]" size={16} />
                </a>
                <a
                  href={profile.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <Download size={16} /> Download Resume
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
                {isVerifiedProfileUrl(profile.github) && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 hover:border-violet-400/40 hover:text-white"
                  >
                    <Globe size={16} /> GitHub
                  </a>
                )}
                {isVerifiedProfileUrl(profile.linkedin) && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 hover:border-violet-400/40 hover:text-white"
                  >
                    <Briefcase size={16} /> LinkedIn
                  </a>
                )}
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 hover:border-violet-400/40 hover:text-white"
                >
                  <Mail size={16} /> {profile.email}
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-[2rem] bg-violet-500/10 blur-3xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/80 p-5 shadow-[0_20px_80px_rgba(79,70,229,0.25)]">
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <span>profile.ts</span>
                </div>
                <div className="space-y-4 font-mono text-sm text-zinc-200">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-zinc-400">
                    <span>Developer Profile</span>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-300">
                      active
                    </span>
                  </div>
                  <pre className="overflow-x-auto rounded-xl border border-white/10 bg-zinc-900 p-4 text-left leading-7 text-violet-200">{`const developer = {
  name: "${profile.name}",
  stack: ["React", "FastAPI", "Node.js"],
  focus: "Scalable web products",
  experience: "3+ years",
};`}</pre>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {['React', 'FastAPI', 'PostgreSQL'].map((technology) => (
                      <div
                        key={technology}
                        className="rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 text-center text-xs text-zinc-300"
                      >
                        {technology}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          <div className="delivery-ledger" aria-label="Selected delivery metrics">
            <div className="ledger-heading">
              <span>01 / DELIVERY NOTES</span>
              <p>Product work, in practice.</p>
            </div>
            <div className="ledger-metric">
              <strong>500<span>+</span></strong>
              <span>active users supported</span>
            </div>
            <div className="ledger-metric">
              <strong>~25<span>%</span></strong>
              <span>faster page loads</span>
            </div>
            <div className="ledger-metric">
              <strong>99.5<span>%</span></strong>
              <span>production uptime</span>
            </div>
            <div className="ledger-metric">
              <strong>10<span>+</span></strong>
              <span>third-party integrations</span>
            </div>
            <p className="ledger-source">Reported across SaaS platforms and production environments.</p>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="About"
            title="I build clean, reliable, user-centered digital products."
            description="I enjoy turning complex problems into polished interfaces and dependable product experiences that are easy to use and maintain."
          />
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="about-copy text-base leading-7 text-zinc-300">
              <p>
                I’m a Full Stack Developer with a strong focus on delivering thoughtful, scalable front-end
                experiences and dependable backend logic. I enjoy working across the stack to shape products that
                are functional, intuitive, and ready for real-world use.
              </p>
              <p>
                At WORKIY Technologies, I contribute across product interfaces, backend services, integrations, and
                delivery—balancing maintainable engineering with the needs of the people using each product.
              </p>
            </div>
            <div className="about-principles">
              <span>WORKING PRINCIPLES</span>
              <p><Sparkles size={16} /> Clear systems. Useful interfaces. Measurable delivery.</p>
            </div>
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Skills"
            title="Technologies I use to build reliable product experiences."
            description="A practical stack across interface, services, data, and delivery."
          />
          <div className="skills-bento">
            {skillGroups.map((group, index) => (
              <div className={`skill-dossier skill-dossier--${index + 1}`} key={group.title}>
                <span className="dossier-index">0{index + 1} / STACK</span>
                <h3 className="mb-4 text-lg font-semibold text-white">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill.name}
                      className="skill-token inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-2 text-sm text-violet-100"
                    >
                      <span>{skill.icon}</span>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Experience"
            title="A focused, product-driven development career."
            description="My experience centers on web application delivery, maintenance, and collaboration with designers and product teams."
          />
          <div className="relative ml-3 space-y-10 before:absolute before:left-[11px] before:top-0 before:h-full before:w-px before:bg-white/10">
            {experienceItems.map((item) => (
              <div key={`${item.role}-${item.company}`} className="relative pl-10">
                <div className="absolute left-0 top-2 h-6 w-6 rounded-full border-4 border-[#09090b] bg-violet-500 shadow-[0_0_0_6px_rgba(167,139,250,0.18)]" />
                <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xl font-semibold text-white">{item.role}</p>
                      <p className="mt-1 text-violet-200">{item.company}</p>
                    </div>
                    <div className="text-sm text-zinc-300">
                      <p>{item.period}</p>
                      <p className="mt-1 flex items-center gap-1 text-zinc-400">
                        <MapPin size={14} /> {item.location}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-200"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
                        Responsibilities
                      </h4>
                      <ul className="space-y-2 text-sm text-zinc-300">
                        {item.responsibilities.map((task) => (
                          <li key={task} className="flex gap-2">
                            <span className="mt-1 text-violet-300">•</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
                        Achievements
                      </h4>
                      <ul className="space-y-2 text-sm text-zinc-300">
                        {item.achievements.map((achievement) => (
                          <li key={achievement} className="flex gap-2">
                            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-300" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Projects"
            title="Product systems, drawn as work in progress."
            description="Five product builds, mapped as schematic interface studies—not screenshots."
          />
          <div className="project-bento">
            {projectItems.map((project, index) => (
              <motion.article
                key={project.title}
                className={`project-case project-case--${index + 1}`}
              >
                <div className="case-heading">
                  <p><span>CASE FILE 0{index + 1}</span><span>{project.category}</span></p>
                  <h3>{project.title}</h3>
                  <p className="case-description">{project.description}</p>
                </div>
                <ProjectArtifact index={index} title={project.title} features={project.features} />
                <div className="case-stack">
                  <span>BUILT WITH</span>
                  <p>{project.technologies.join(' · ')}</p>
                </div>
              </motion.article>
            ))}
          </div>
          <p className="project-disclosure">
            Interface studies are schematic visualizations, not product screenshots. Public repositories and demos are not available.
          </p>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What I do"
            title="End-to-end product development support."
            description="From interface decisions to backend service logic, I focus on the pieces that help products become consistent, scalable, and smoother to use."
          />
          <div className="service-ledger">
            {serviceItems.map((service, index) => (
              <div className="service-ledger-row" key={service.title}>
                <span>0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="service-tools">{service.highlights.join(' / ')}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Contact"
            title="Let’s build something meaningful."
            description="I’m open to product work, engineering roles, and collaborative opportunities where thoughtful execution matters."
          />
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-5 rounded-[1.5rem] border border-white/10 bg-zinc-900/80 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Contact Details</p>
              <div className="space-y-4 text-zinc-300">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:border-violet-400/40"
                >
                  <Mail size={18} className="text-violet-200" /> <span>{profile.email}</span>
                </a>
                {isVerifiedProfileUrl(profile.linkedin) && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:border-violet-400/40"
                  >
                    <Briefcase size={18} className="text-violet-200" /> <span>LinkedIn</span>
                  </a>
                )}
                {isVerifiedProfileUrl(profile.github) && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:border-violet-400/40"
                  >
                    <Globe size={18} className="text-violet-200" /> <span>GitHub</span>
                  </a>
                )}
              </div>
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                <div className="flex items-center gap-2">
                  <Briefcase size={16} /> <span>{profile.location}</span>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleFormSubmit}
              className="space-y-4 rounded-[1.5rem] border border-white/10 bg-zinc-900/80 p-6"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm text-zinc-300">
                  <span className="mb-2 block">Name</span>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(event) => setFormState((state) => ({ ...state, name: event.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-[#09090b] px-3 py-3 text-white outline-none transition focus:border-violet-400"
                    placeholder="Your name"
                  />
                </label>
                <label className="block text-sm text-zinc-300">
                  <span className="mb-2 block">Email</span>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(event) => setFormState((state) => ({ ...state, email: event.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-[#09090b] px-3 py-3 text-white outline-none transition focus:border-violet-400"
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <label className="block text-sm text-zinc-300">
                <span className="mb-2 block">Subject</span>
                <input
                  type="text"
                  required
                  value={formState.subject}
                  onChange={(event) => setFormState((state) => ({ ...state, subject: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-[#09090b] px-3 py-3 text-white outline-none transition focus:border-violet-400"
                  placeholder="Project inquiry or collaboration"
                />
              </label>
              <label className="block text-sm text-zinc-300">
                <span className="mb-2 block">Message</span>
                <textarea
                  required
                  minLength={20}
                  value={formState.message}
                  onChange={(event) => setFormState((state) => ({ ...state, message: event.target.value }))}
                  rows={6}
                  className="w-full rounded-xl border border-white/10 bg-[#09090b] px-3 py-3 text-white outline-none transition focus:border-violet-400"
                  placeholder="Tell me about the opportunity, your team, or the idea you’d like to build."
                />
              </label>
              {formStatus.message && (
                <div
                  role="status"
                  className={`rounded-xl border px-4 py-3 text-sm ${
                    formStatus.type === 'info'
                      ? 'border-sky-400/30 bg-sky-500/10 text-sky-100'
                      : 'border-rose-400/30 bg-rose-500/10 text-rose-100'
                  }`}
                >
                  {formStatus.message}
                </div>
              )}
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
              >
                <MessageSquareText size={16} /> Send Message
              </button>
              <p className="text-xs text-zinc-400">
                Submitting opens your email app with a prefilled message. You’ll need to press Send there.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-zinc-950/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-zinc-300 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="font-semibold text-white">{profile.name}</p>
            <p className="mt-1">© {currentYear} All rights reserved.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="hover:text-white">
                {item.label}
              </a>
            ))}
            {isVerifiedProfileUrl(profile.github) && (
              <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-white">
                GitHub
              </a>
            )}
            {isVerifiedProfileUrl(profile.linkedin) && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">
                LinkedIn
              </a>
            )}
            <a href="#home" className="inline-flex items-center gap-1 hover:text-white">
              Back to top <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
