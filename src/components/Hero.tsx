import React from 'react'
import HeroLeftContent from './HeroComponents.tsx/HeroLeftContent'
import HeroRight from './HeroComponents.tsx/HeroRight'

const Hero = () => {
  return (
    <>
    <section className='w-full max-h-screen bg-hero-pattern bg-cover bg-center bg-no-repeat flex items-center justify-center'>
<div className="w-1/2 flex  justify-center items-start max-w-xl p-6">
<HeroLeftContent />
<HeroRight/>

</div>
    </section>
    
    
    </>
  )
}

export default Hero