
"use client";

import Image from "next/image";
import {
  Bath,
  BedDouble,
  DoorOpen,
  MapPin,
  Heart,
  Sofa,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import PropertyDetailsTable from "./property/property-show-home";
import type { IProperty } from "@/types";

interface CardPropertyProps {
  property: IProperty;
}

function formatLabel(value?: string | null): string {
  if (!value) return "";

  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatRent(value: number): string {
  return new Intl.NumberFormat("en-BD", {
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

export function CardProperty({ property }: CardPropertyProps) {
  const isAvailable = property.status === "PUBLISHED";

  const location = [property.area, property.city]
    .filter(Boolean)
    .join(", ");

  return (
    <Card className="group relative mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-border/70 bg-card p-0 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl">
      {/* Property Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {property.imageUrl ? (
          <Image
            src={property.imageUrl}
            alt={property.title || "Rental property"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Property image unavailable
          </div>
        )}

        {/* Image Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

        {/* Category and Status */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge className="border-0 bg-white text-gray-900 shadow-sm hover:bg-white">
            {formatLabel(property.category)}
          </Badge>

          <Badge
            variant="secondary"
            className={
              isAvailable
                ? "border-0 bg-emerald-600 text-white hover:bg-emerald-600"
                : "border-0 bg-white/95 text-gray-900"
            }
          >
            {isAvailable ? "Available" : formatLabel(property.status)}
          </Badge>
        </div>

        {/* Favorite Button */}
        <Button
          type="button"
          size="icon"
          variant="secondary"
          aria-label="Add property to favorites"
          className="absolute right-3 top-3 size-9 rounded-full bg-white/95 text-gray-800 shadow-sm transition-transform hover:scale-110 hover:bg-white"
        >
          <Heart className="size-4" />
        </Button>

        {/* Rent on Image */}
        <div className="absolute bottom-3 left-4 text-white">
          <p className="text-2xl font-bold tracking-tight drop-shadow-md">
            ৳{formatRent(property.rent)}
            <span className="ml-1 text-sm font-normal">/ month</span>
          </p>
        </div>
      </div>

      {/* Main Property Information */}
      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        {/* Property Type */}
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          {formatLabel(property.propertyType)}
        </p>

        {/* Title */}
        <h3 className="line-clamp-1 text-lg font-bold leading-tight transition-colors group-hover:text-primary">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-primary" />
          <span className="line-clamp-1">
            {location || property.address || "Location not provided"}
          </span>
        </div>

        {/* Description */}
        <p className="line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
          {property.description ||
            "Contact us to learn more about this property."}
        </p>

        {/* Property Features */}
        <div className="grid grid-cols-3 gap-2 border-t pt-3">
          <div className="flex flex-col items-center gap-1 rounded-lg bg-muted/50 px-1 py-2.5">
            <BedDouble className="size-5 text-primary" />
            <span className="text-sm font-semibold">
              {property.bedrooms} Beds
            </span>
          </div>

          <div className="flex flex-col items-center gap-1 rounded-lg bg-muted/50 px-1 py-2.5">
            <Bath className="size-5 text-primary" />
            <span className="text-sm font-semibold">
              {property.bathrooms} Baths
            </span>
          </div>

          <div className="flex flex-col items-center gap-1 rounded-lg bg-muted/50 px-1 py-2.5">
            <DoorOpen className="size-5 text-primary" />
            <span className="text-sm font-semibold">
              {property.availableRooms} Rooms
            </span>
          </div>
        </div>

        {/* Furnishing and Security Deposit */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Sofa className="size-4 text-primary" />
            {formatLabel(property.furnished)}
          </span>

          {property.securityDeposit != null && (
            <span className="flex items-center gap-1">
              <ShieldCheck className="size-4 text-primary" />
              Deposit: ৳{formatRent(Number(property.securityDeposit))}
            </span>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between gap-3 border-t bg-muted/20 p-4">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">
            Monthly rent
          </p>

          <p className="truncate text-base font-bold">
            ৳{formatRent(property.rent)}
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              /mo
            </span>
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <PropertyDetailsTable property={property} />

          <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
      </CardFooter>
    </Card>
  );
}

export default CardProperty;
