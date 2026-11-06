import React from 'react'
import Image from 'next/image'

const HeroRight = () => {
  return (
<>

{/* RIGHT HALF: Light Sage Green */}
      <section className="bg-[#98b688] relative flex flex-col justify-center items-center pt-28 pb-16 px-8 md:px-16">
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

</>  )
}

export default HeroRight