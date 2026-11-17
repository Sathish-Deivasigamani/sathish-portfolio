export type SectionId = 'home' | 'about' | 'skills' | 'experience' | 'projects' | 'contact'

export interface Profile {
  name: string
  title: string
  tagline: string
  description: string
  email: string
  github: string
  linkedin: string
  location: string
  availability: string
  resumeUrl: string
}

export interface Skill {
  name: string
  icon: string
}

export interface SkillGroup {
  title: string
  items: Skill[]
}

export interface ExperienceItem {
  role: string
  company: string
  period: string
  location: string
  technologies: string[]
  responsibilities: string[]
  achievements: string[]
}

export interface ProjectItem {
  title: string
  category: string
  description: string
  thumbnail: string
  technologies: string[]
  features: string[]
  githubUrl: string
  liveUrl: string
  isPlaceholder: boolean
}

export interface ServiceItem {
  title: string
  description: string
  highlights: string[]
}
