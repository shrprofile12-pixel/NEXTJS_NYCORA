"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { RiArrowLeftSFill } from "react-icons/ri"

const darkSideItems = [
  { name: "NEW IN", href: "/" },
  { name: "SHOP", href: "/shop" },
  { name: "JOURNAL", href: "/journal" },
]

const lightSideItems = [
  { name: "LOYALTY CLUB", href: "/loyalty" },
]

const ULIST = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  return (
    <ul className='flex flex-row items-center space-x-6 bg-transparent'>
      {/* Dark Side Links (White Text) */}
      {darkSideItems.map((item, index) => (
        <li key={item.name}>
          <Link
            href={item.href}
            onClick={() => setActiveIndex(index)}
            className='flex items-center gap-1 text-sm tracking-widest font-medium uppercase text-white hover:text-emerald-300 transition-colors whitespace-nowrap'
          >
            {activeIndex === index && (
              <RiArrowLeftSFill className="text-xl rotate-180 flex-shrink-0 text-emerald-400" />
            )}
            <span>{item.name}</span>
          </Link>
        </li>
      ))}

      {/* Light Side Links (Dark Text) */}
      {lightSideItems.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            className='flex items-center gap-1 text-sm tracking-widest font-medium uppercase text-slate-900 hover:text-emerald-950 transition-colors whitespace-nowrap ml-4'
          >
            <span>{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ULIST