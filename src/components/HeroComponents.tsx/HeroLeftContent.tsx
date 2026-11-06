import React from 'react'

const HeroLeftContent = () => {
  return (
    <section className="hero-left-content bg-gradient-to-br from-white via-emerald-100 to-emerald-600 text-slate-900 flex flex-col justify-center items-start max-w-xl p-8 rounded-2xl shadow-xl gap-6">
      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-200/60 px-3.5 py-1.5 rounded-full border border-emerald-300">
        Welcome
      </span>
      
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
        Grow your vision with sustainable design
      </h1>
      
      <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
        Empower your workflow with clean, high-performance components designed to elevate your next big project.
      </p>

      <div className=""></div>
    </section>
  )
}

export default HeroLeftContent