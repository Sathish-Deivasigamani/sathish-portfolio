import type { ExperienceItem, Profile, ProjectItem, ServiceItem, SkillGroup } from '../types/portfolio'

export const profile: Profile = {
  name: 'Sathish D',
  title: 'Full Stack Developer',
  tagline: 'Building AI-Driven, Scalable Digital Experiences.',
  description:
    'Results-driven Full Stack Developer with 3+ years of experience architecting and delivering scalable SaaS applications, CRM platforms, and AI-integrated web solutions across the full development lifecycle.',
  email: 'dksathish2714@gmail.com',
  github: 'https://github.com/Sathish-Deivasigamani',
  linkedin: 'https://www.linkedin.com/in/sathish-d-21205a249',
  location: 'Chennai, Tamil Nadu, India',
  availability: 'Open to opportunities',
  resumeUrl: '/Sathish_D_Full_Stack_Developer_Resume.pdf',
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    items: [
      { name: 'React.js', icon: '⚛️' },
      { name: 'JavaScript', icon: '🟨' },
      { name: 'TypeScript', icon: '🔷' },
      { name: 'Vite', icon: '⚡' },
      { name: 'Material UI', icon: '🎨' },
      { name: 'HTML5', icon: '🧩' },
      { name: 'CSS3', icon: '💠' },
      { name: 'Responsive Design', icon: '📱' },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Node.js', icon: '🟢' },
      { name: 'Express.js', icon: '🚀' },
      { name: 'FastAPI', icon: '🐍' },
      { name: 'Python', icon: '🐍' },
      { name: 'REST APIs', icon: '🛰️' },
    ],
  },
  {
    title: 'Database',
    items: [
      { name: 'PostgreSQL', icon: '🗄️' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'MySQL', icon: '🗃️' },
      { name: 'Database Optimization', icon: '⚙️' },
    ],
  },
  {
    title: 'Tools & AI',
    items: [
      { name: 'Git', icon: '🧰' },
      { name: 'GitHub', icon: '🐙' },
      { name: 'Postman', icon: '🧪' },
      { name: 'VS Code', icon: '💻' },
      { name: 'AWS S3', icon: '☁️' },
      { name: 'GitHub Copilot', icon: '🤖' },
      { name: 'Claude Code', icon: '🧠' },
      { name: 'Cursor AI', icon: '✨' },
    ],
  },
]

export const experienceItems: ExperienceItem[] = [
  {
    role: 'Full Stack Developer',
    company: 'WORKIY Technologies Pvt Ltd',
    period: 'March 2023 — Present',
    location: 'Chennai, India',
    technologies: ['React.js', 'FastAPI', 'Node.js', 'PostgreSQL', 'MongoDB', 'AWS S3', 'JWT'],
    responsibilities: [
      'Architect and deliver full stack web applications using React.js, FastAPI, Node.js, and PostgreSQL, supporting 500+ active users across SaaS platforms.',
      'Design and develop responsive, accessible frontend UIs with React.js, Vite, and Material UI, reducing page load times by approximately 25% through code splitting and lazy loading.',
      'Build and maintain high-performance REST APIs and backend services using FastAPI and Express.js, achieving 99.5% uptime across production environments.',
      'Implement enterprise-grade security including JWT authentication, role-based access control, OAuth 2.0, and multi-tenant user management.',
      'Integrate AWS S3, SMTP email automation, and 10+ third-party APIs for payments and communication workflows.',
    ],
    achievements: [
      'Pioneered AI-assisted development workflows using GitHub Copilot, Claude Code, Cursor AI, OpenAI Codex, and Antigravity AI, reducing feature delivery time by 30–40%.',
      'Recognized as Rising Star of the Year (2023) and Team of the Year (2023) for exceptional contribution and project delivery.',
      'Led Agile sprint planning, peer code reviews, and technical documentation while mentoring two junior developers.',
    ],
  },
]

export const projectItems: ProjectItem[] = [
  {
    title: 'CASCEN AI Recruiting Platform',
    category: 'AI SaaS',
    description:
      'AI-powered SaaS recruiting platform for candidate matching and automated screening workflows, built with React.js, FastAPI, and PostgreSQL.',
    thumbnail: '',
    technologies: ['React.js', 'FastAPI', 'PostgreSQL', 'OpenAI', 'Anthropic', 'MUI'],
    features: ['AI resume parsing', 'Candidate ranking', 'Recruiter dashboards'],
    githubUrl: '',
    liveUrl: '',
    isPlaceholder: true,
  },
  {
    title: 'WORKIY Academy',
    category: 'Learning Management System',
    description:
      'Responsive learning portal serving 200+ students and interns with course tracking, enrollment, and progress dashboards.',
    thumbnail: '',
    technologies: ['React.js', 'Vite', 'FastAPI', 'MySQL', 'SMTP'],
    features: ['Course dashboards', 'Internship applications', 'Automated email notifications'],
    githubUrl: '',
    liveUrl: '',
    isPlaceholder: true,
  },
  {
    title: 'WORKIY CRM',
    category: 'CRM Platform',
    description:
      'Full-featured CRM platform built from scratch for sales pipelines, lead management, and secure role-based operations.',
    thumbnail: '',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'AWS S3'],
    features: ['Lead and contact management', 'RBAC permissions', 'Secure S3 uploads'],
    githubUrl: '',
    liveUrl: '',
    isPlaceholder: true,
  },
  {
    title: 'Expense Tracker Mobile App',
    category: 'Mobile Application',
    description:
      'Kotlin expense tracker with SMS transaction parsing, secure local storage, and a spending insights dashboard.',
    thumbnail: '',
    technologies: ['Kotlin', 'Room Database', 'Android'],
    features: ['Automatic SMS parsing', 'Encrypted local storage', 'Budget insights'],
    githubUrl: '',
    liveUrl: '',
    isPlaceholder: true,
  },
  {
    title: 'Fountain of Health',
    category: 'Drupal CMS',
    description:
      'Healthcare-focused web platform with responsive frontend pages, custom Drupal themes, and automated inquiry workflows.',
    thumbnail: '',
    technologies: ['Drupal', 'HTML5', 'CSS3', 'JavaScript', 'SMTP'],
    features: ['Responsive pages', 'Dynamic form validation', 'Appointment email workflows'],
    githubUrl: '',
    liveUrl: '',
    isPlaceholder: true,
  },
]

export const serviceItems: ServiceItem[] = [
  {
    title: 'Frontend Development',
    description: 'Crafting performant, accessible interfaces using React.js, Vite, and Material UI for business-critical SaaS products.',
    highlights: ['React.js', 'TypeScript', 'Responsive UX'],
  },
  {
    title: 'Backend Development',
    description: 'Designing dependable services and APIs with FastAPI and Node.js to support production-ready application workflows.',
    highlights: ['FastAPI', 'Node.js', 'REST APIs'],
  },
  {
    title: 'Database Integration',
    description: 'Optimizing schema design, query performance, and data layer architecture across PostgreSQL, MongoDB, and MySQL.',
    highlights: ['PostgreSQL', 'MongoDB', 'MySQL'],
  },
  {
    title: 'AI-Assisted Product Delivery',
    description: 'Using AI tooling to ship features faster while keeping code quality, documentation, and maintainability high.',
    highlights: ['GitHub Copilot', 'Claude Code', 'Cursor AI'],
  },
]
