"use client"

import * as React from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useGetHomeBanner } from "@/hooks/home.banner"

const slides = [
  {
    id: 1,
    image: "/tope-image--.jpg",
    title: "Find Your Perfect Home",
    description:
      "Discover comfortable and affordable homes that match your lifestyle.",
  },
  {
    id: 2,
    image: "/tope-image-2-2.jpg",
    title: "Your Dream Home Awaits",
    description:
      "Explore beautiful properties in the location you love.",
  },
  {
    id: 3,
    image: "/tope-image-3.jpg",
    title: "Live Better, Live Happier",
    description:
      "Find a place where comfort meets your everyday lifestyle.",
  },
  {
    id: 4,
    image: "/tope-image-4.jpg",
    title: "Live Better, Live Happier",
    description:
      "Find a place where comfort meets your everyday lifestyle.",
  },
  {
    id: 5,
    image: "/tope-image-5.jpg",
    title: "Live Better, Live Happier",
    description:
      "Find a place where comfort meets your everyday lifestyle.",
  },
  {
    id: 6,
    image: "/tope-image-6.jpg",
    title: "Live Better, Live Happier",
    description:
      "Find a place where comfort meets your everyday lifestyle.",
  },
 

]

export default function HomeHero() {

  const { data, isLoading }  = useGetHomeBanner()
  const homeData = data?.data || []
  console.log(data?.data)
     const plugin = React.useRef(
    Autoplay({
      delay: 2000, // 3 seconds
      stopOnInteraction: false,
    })
  )
  return (
    <section className="w-full p-5">
      <Carousel
        plugins={[plugin.current]}
      opts={{
        loop: true,
      }}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {homeData?.map((slide:any) => (
            <CarouselItem key={slide.id} className="pl-0">
              <div className="relative h-[500px] w-full overflow-hidden sm:h-[550px] md:h-[600px] lg:h-[650px] xl:h-[700px]">
                {/* Background Image */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={slide.id === 1}
                  className="object-cover"
                  sizes="100vw"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl text-white">
                      <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                        {slide.title}
                      </h1>

                      <p className="mt-4 max-w-xl text-sm text-white/90 sm:text-base md:text-lg">
                        {slide.description}
                      </p>

                      <button className="mt-6 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:text-base">
                        Find Your Home
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation */}
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </section>
  )
}