import React from 'react'

const destinations = [
  {
    number: '01',
    name: 'San Sebastián',
    description: 'An exploration of Basque fire and coastal heritage.',
  },
  {
    number: '02',
    name: 'Kyoto',
    description: 'Where silence becomes the most vital ingredient.',
  },
  {
    number: '03',
    name: 'Copenhagen',
    description: 'Redefining the relationship between earth and plate.',
  },
  {
    number: '04',
    name: 'Oaxaca',
    description: 'The soul of smoke and the alchemy of corn.',
  },
]

export const TrendingDestinations = () => {
  return (
    <section className="py-32 px-8 md:px-16">
      <div className="text-center mb-24">
        <span className="text-[10px] font-label uppercase tracking-[0.4em] text-primary mb-4 block">
          Cartography
        </span>
        <h2 className="text-5xl font-headline font-bold tracking-tighter">
          TRENDING DESTINATIONS
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-outline-variant/30">
        {destinations.map((dest) => (
          <div
            key={dest.name}
            className="p-10 border-r border-b border-outline-variant/30 group hover:bg-surface-container transition-colors cursor-pointer last:border-r-0"
          >
            <span className="text-4xl font-headline font-bold text-outline-variant/30 group-hover:text-primary/30 transition-colors mb-8 block">
              {dest.number}
            </span>
            <h3 className="text-2xl font-headline font-bold mb-4 group-hover:text-primary transition-colors">
              {dest.name}
            </h3>
            <p className="text-sm text-on-surface/50 leading-relaxed italic">
              {dest.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
