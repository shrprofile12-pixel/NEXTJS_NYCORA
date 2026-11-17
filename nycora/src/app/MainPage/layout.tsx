import Navbar from "@/components/Navbar"
import { Marquee } from "@/components/NavbarComponents/Marquee"
import React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <div className=" ">
        <Marquee/>
        <Navbar/>
      {children}
    </div>
  )
}