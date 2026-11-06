import React from 'react'
import Navbar from '@/components/Navbar'
import HeroLeftContent from '@/components/HeroComponents.tsx/HeroLeftContent'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="relative min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      {/* OVERLAY NAVBAR ACROSS FULL WIDTH */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Navbar />
      </div>

      {/* LEFT HALF: Deep Dark Green */}
      <section className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#6ea36e] via-[#1b2b1b] to-[#162916] relative overflow-hidden flex flex-col justify-end pt-28 pb-16 px-8 md:px-16">
  {/* Your Hero Left Content */}
  <HeroLeftContent />
</section>
      {/* right side */}

      {/* RIGHT HALF: Light Sage Green */}
      <section className="bg-[#A7BD9B] relative flex flex-col justify-center items-center pt-28 pb-16 px-8 md:px-16">
        {/* Product Image */}
        <div className="relative w-full max-w-md h-[450px] flex items-center justify-center">
          <Image
            src="/hoodie.png" // Replace with your hoodie image path
            alt="Louthies Hoodie"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </section>
    </main>
  )
} 