"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"
import { FaSquare, FaRegSquare } from "react-icons/fa6"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

interface Banner {
  id: string
  imageUrl: string
  heading: string | null
  description: string | null
  buttonText: string | null
  buttonLink: string | null
}

export function HeroCarouselClient({ banners }: { banners: Banner[] }) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  // Har 4.5 seconds baad automatic slide change karega
  const plugin = React.useRef(
    Autoplay({ delay: 4500, stopOnInteraction: false })
  )

  React.useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="w-full relative z-0">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative"
      >
        <CarouselContent className="-ml-0">
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id} className="pl-0 basis-full">
              <div className="relative w-full h-[450px] md:h-[700px]">
                <Image
                  src={banner.imageUrl}
                  alt={banner.heading || "Banner Image"}
                  fill
                  priority={index === 0}
                  className="object-cover brightness-[0.8]"
                />

                {/* Overlay Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-12 text-white z-10 bg-black/25">
                  {banner.heading && (
                    <h1 className="text-3xl md:text-6xl font-extrabold tracking-wider mb-4 drop-shadow-lg">
                      {banner.heading}
                    </h1>
                  )}

                  {banner.description && (
                    <p className="text-sm md:text-xl max-w-xl mb-8 font-medium drop-shadow-md text-gray-100">
                      {banner.description}
                    </p>
                  )}

                  {banner.buttonText && banner.buttonLink && (
                    <Link href={banner.buttonLink}>
                      <Button className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-3 rounded-full transition-all shadow-xl cursor-pointer">
                        {banner.buttonText}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Bottom Center Square Controls (100% Visible) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {banners.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="text-white hover:scale-110 transition-transform cursor-pointer p-1"
            >
              {current === index ? (
                <FaSquare className="h-3.5 w-3.5 text-white drop-shadow" />
              ) : (
                <FaRegSquare className="h-3.5 w-3.5 text-white/80 drop-shadow" />
              )}
            </button>
          ))}
        </div>
      </Carousel>
    </div>
  )
}