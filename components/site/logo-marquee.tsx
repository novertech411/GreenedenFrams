const partners = [
  'FAO',
  'IFAD',
  'CGIAR',
  'IITA',
  'USAID',
  'UNDP',
  'AfDB',
  'World Bank',
]

export function LogoMarquee() {
  const row = [...partners, ...partners]
  return (
    <section className="border-b border-border bg-background py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-sm font-medium tracking-wide text-muted-foreground">
          Trusted by leading agricultural &amp; development organizations
        </p>
        <div className="marquee-pause relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
          <div className="flex w-max animate-marquee items-center gap-14">
            {row.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap text-2xl font-bold tracking-tight text-muted-foreground/40 grayscale transition-colors hover:text-muted-foreground"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
