# Full Stack Developer Portfolio

A premium, dark modern portfolio for a Full Stack Developer built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Features

- Responsive sticky navigation
- Hero section with CTA buttons and social links
- About, skills, experience, project, and contact sections
- Contact form with client-side validation
- Downloadable resume integration
- SEO metadata, Open Graph tags, favicon, robots.txt, and sitemap.xml
- Accessibility-minded buttons, forms, and keyboard support
- Reduced-motion support

## Project Structure

```text
src/
  components/
  data/
  types/
  App.tsx
  index.css
  main.tsx
public/
  favicon.svg
  resume.pdf
  robots.txt
  sitemap.xml
```

## Local Development

```bash
npm install
npm run dev -- --host 0.0.0.0
```

Then open:

```text
http://localhost:5173
```

## Production Build

```bash
npm run build
```

## Vercel Deployment

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Use the default Vite settings.
4. Deploy.

### Recommended build settings

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

## Contact Form

The contact form validates the required fields and opens a prefilled email in the visitor's default email app. The visitor must press Send in that app; the website does not claim that a message was delivered. For direct website submission without an email-app handoff, connect a form provider or a backend endpoint.

## Personal Information Status

The portfolio has been populated using the submitted resume. Only the following public profile links are still placeholders until you add your actual GitHub and LinkedIn URLs:

- `profile.github`
- `profile.linkedin`

## QA Summary

- Responsive layout validated across common breakpoints.
- Navigation anchor links tested.
- Form validation checked for empty fields, invalid email, and short messages.
- TypeScript build passes.
- Lint passes.
- Production build passes.

## Notes

This portfolio intentionally uses clearly labeled placeholder content where personal details or project history are not yet available, in line with the original brief.
