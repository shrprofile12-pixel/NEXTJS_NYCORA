// src/components/home/CarouselOrientation.tsx
import * as React from "react"
import { prisma } from "@/lib/prisma"
import { HeroCarouselClient } from "../HeroComponents/HeroCrouselClient"

export async function CarouselOrientation() {
  const banners = await prisma.banner.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  })

  if (!banners || banners.length === 0) {
    return (
      <div className="w-full h-[350px] md:h-[600px] flex items-center justify-center bg-gray-100 text-gray-500">
        No active banners found.
      </div>
    )
  }

  return <HeroCarouselClient banners={banners} />
}