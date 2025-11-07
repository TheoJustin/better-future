interface LoginHeroProps {
  title?: string
  subtitle?: string
  stats?: Array<{ label: string; value: string }>
}

const defaultStats = [
  { label: 'Impact Driven', value: '120K+' },
  { label: 'Green Merchants', value: '8.2K' },
  { label: 'CO₂ Offset', value: '42K t' },
]

export function LoginHero({
  title = 'BetterFuture',
  subtitle = 'Where conscious spending meets transparent impact.',
  stats = defaultStats,
}: LoginHeroProps) {
  return (
    <div className="flex flex-col gap-10">
      <div className="space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium uppercase tracking-wide text-white/90 backdrop-blur">
          Join the movement
        </span>
        <h1 className="text-4xl font-semibold leading-tight text-white lg:text-5xl">
          {title}
        </h1>
        <p className="text-lg text-white/80 lg:text-xl">{subtitle}</p>
      </div>

      <dl className="grid grid-cols-3 gap-4 text-sm text-white/80">
        {stats.map((item) => (
          <div key={item.label} className="rounded-xl border border-white/20 bg-white/5 p-4 backdrop-blur">
            <dt className="text-xs uppercase tracking-wide text-white/60">
              {item.label}
            </dt>
            <dd className="text-2xl font-semibold text-white">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

