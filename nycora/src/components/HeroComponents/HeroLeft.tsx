import React from 'react'
import Image from 'next/image'
import Asim from "../../../public/Asim Jofa _ Luxury Designer Clothing & Fashion Brand in Pakistan.png"

const HeroLeft = () => {
  return (
    <section className="relative w-full h-[500px] md:h-[650px] -mt-20 md:-mt-28">
  <div className="relative w-full h-full">
    <Image 
      src={Asim} 
      alt="Hero Banner" 
      fill
      priority
      quality={100}
      className="object-cover object-center"
    />
  </div>
</section>
  )
}

export default HeroLeft