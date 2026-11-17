interface SectionHeadingProps {
  eyebrow: string
  title: string
  description: string
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-violet-300">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-base text-zinc-300 sm:text-lg">{description}</p>
    </div>
  )
}
