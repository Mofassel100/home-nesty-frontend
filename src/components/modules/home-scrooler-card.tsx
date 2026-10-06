
"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";

const properties = [
  {
    id: 1,
    title: "Modern Family Apartment",
    location: "Dhaka, Bangladesh",
    price: "৳25,000",
  },
  {
    id: 2,
    title: "Cozy Single Room",
    location: "Sylhet, Bangladesh",
    price: "৳8,000",
  },
  {
    id: 3,
    title: "Luxury City Apartment",
    location: "Chattogram, Bangladesh",
    price: "৳32,000",
  },
  {
    id: 4,
    title: "Beautiful Family Home",
    location: "Rajshahi, Bangladesh",
    price: "৳20,000",
  },
  {
    id: 5,
    title: "Affordable Bachelor Room",
    location: "Dhaka, Bangladesh",
    price: "৳6,500",
  },
  {
    id: 6,
    title: "Premium Shared Apartment",
    location: "Sylhet, Bangladesh",
    price: "৳15,000",
  },
];

export function PropertyCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (!api || isHovered) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [api, isHovered]);

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-primary">
            Featured Properties
          </p>

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Find Your Perfect Home
          </h2>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Discover comfortable homes, rooms and apartments
            that match your lifestyle and budget.
          </p>
        </div>

        {/* Carousel */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative"
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {properties.map((property) => (
                <CarouselItem
                  key={property.id}
                  className="
                    pl-4

                    basis-full
                    sm:basis-1/2
                    md:basis-1/3
                    lg:basis-1/4
                    xl:basis-1/5
                  "
                >
                  <Card className="h-full overflow-hidden rounded-2xl">
                    <CardContent className="p-5">

                      {/* Property Image Placeholder */}
                      <div className="mb-4 aspect-[4/3] rounded-xl bg-muted" />

                      <h3 className="line-clamp-1 text-lg font-semibold">
                        {property.title}
                      </h3>

                      <p className="mt-2 text-sm text-muted-foreground">
                        {property.location}
                      </p>

                      <p className="mt-3 font-semibold text-primary">
                        {property.price}
                        <span className="ml-1 text-sm font-normal text-muted-foreground">
                          /month
                        </span>
                      </p>

                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation */}
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

