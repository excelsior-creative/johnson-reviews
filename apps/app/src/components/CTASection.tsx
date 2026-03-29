'use client'

import React, { useState } from 'react'

export const CTASection = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: wire up to email provider
    setEmail('')
  }

  return (
    <section className="py-32 px-8 md:px-16 relative overflow-hidden" style={{ backgroundColor: '#131313' }}>
      {/* Radial gold gradient background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#f2ca50_0%,_transparent_70%)]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-8 text-white">
          ACCESS THE{' '}
          <span className="italic" style={{ color: '#f2ca50' }}>
            PRIVATE COLLECTION
          </span>
        </h2>
        <p className="text-lg mb-12 leading-relaxed max-w-2xl mx-auto italic" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Join our inner circle for exclusive access to rare vintage reviews, private dining invites, and the editor&apos;s personal black book.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ENTER YOUR EMAIL"
            required
            className="px-8 py-4 text-xs uppercase tracking-widest focus:outline-none w-full sm:w-80"
            style={{
              backgroundColor: 'var(--color-surface-container, #1e1e1e)',
              border: '1px solid var(--color-outline-variant, #444)',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#f2ca50')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-outline-variant, #444)')}
          />
          <button
            type="submit"
            className="px-10 py-4 text-xs uppercase tracking-[0.2em] font-bold transition-colors flex-shrink-0"
            style={{
              backgroundColor: '#f2ca50',
              color: '#131313',
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d4af37')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f2ca50')}
          >
            Request Invite
          </button>
        </form>
      </div>
    </section>
  )
}
