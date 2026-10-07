
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
import { useGetProperty } from "@/hooks/property.hook";
import Image from "next/image";
import { CardProperty } from "./card-home-property";

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
// id: '8e5720ae-12eb-43bb-a988-1957c7076129',
//         ownerId: 'ed16a81b-a72d-4797-addf-4b8de0146a56',
//         title: 'Beautiful 3 Bedroom Apartment',
//         description: 
//           'A spacious and modern apartment available for rent in a convenient location.',
//         propertyType: 'SUBLET',
//         address: 'House 25, Road 5, Mirpur 10',
//         city: 'Dhaka',
//         area: 'Mirpur',
//         rent: '25000',
//         securityDeposit: '50000',
//         bedrooms: 3,
//         bathrooms: 2,
  const {data,isLoading}= useGetProperty()
  const propertyData = data?.data || []
  console.log(data)
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
              {propertyData.map((property:any) => (
                <CarouselItem
                  key={property.id}
                  className="
                    pl-4

                    basis-full
                    sm:basis-1/2
                    md:basis-1/3
                    lg:basis-1/3
                    xl:basis-1/4
                  "
                >
                 <CardProperty property={property}/>
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

