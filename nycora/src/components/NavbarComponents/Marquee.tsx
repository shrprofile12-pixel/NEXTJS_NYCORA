"use client"

import React, { useState, useEffect } from "react"

const messages = [
  "11.11 Sale is live now",
  "Free shipping on all orders across Pakistan",
  "Use code SAVE20 for an extra discount!",
]

export function Marquee() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false) // Fade out effect ke liye
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length)
        setFade(true) // Fade in effect
      }, 300) // 300ms transition delay
    }, 4000) // Har 4 seconds baad change hoga

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full bg-[#e5e5e5] text-neutral-800 text-xs md:text-sm py-2 px-4 text-center font-medium tracking-wide overflow-hidden">
      <div
        className={`transition-opacity duration-300 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {messages[currentIndex]}
      </div>
    </div>
  )
}