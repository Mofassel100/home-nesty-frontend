"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, MapPin, BedDouble, Bath, DoorOpen } from "lucide-react";
import { useGetProperty } from "@/hooks";
import { IProperty } from "@/types";
import { PropertyEditDialog } from "./property-edit";

// Pass properties and loading state from your API hook.
export default function PropertyDetailsTable({

}) {
    const {data:properties,isLoading}= useGetProperty()


  const [expandedIds, setExpandedIds] = useState([]);

//   const toggleExpanded = (id: string) => {
//   setExpandedIds((previous: string[]) =>
//     previous.includes(id)
//       ? previous.filter((item) => item !== id)
//       : [...previous, id]
//   );
// };

  const limitWords = (text = "", limit = 12) => {
    const words = String(text).trim().split(/\s+/).filter(Boolean);

    return {
      text:
        words.length > limit
          ? words.slice(0, limit).join(" ") + "..."
          : String(text),
      hasMore: words.length > limit,
    };
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        Loading properties...
      </div>
    );
  }

  if (!properties?.data.length) {
    return (
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        No properties found. Create your first property.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          All Properties ({properties.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {properties?.data.map((property:IProperty) => {
//          const isExpanded = property?.id
//   ? expandedIds.includes(property.id)
//   : false;

          const title = limitWords(property.title, 5);
          const description = limitWords(property.description, 12);

          return (
            <article
              key={property.id}
              className="group flex h-full flex-col overflow-hidden rounded-xl border bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Property Image */}
              <Dialog>
                <DialogTrigger
                  type="button"
                  className="relative block aspect-video w-full overflow-hidden bg-muted"
                >
                  {property.imageUrl  ? (
                    <Image
                      src={property.imageUrl }
                      alt={property.title || "Property"}
                      fill
                      unoptimized
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      No property image
                    </div>
                  )}
                </DialogTrigger>

                <DialogContent className="w-[calc(100%-2rem)] max-w-4xl p-3">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                    {property.imageUrl ? (
                      <Image
                        src={property.imageUrl}
                        alt={property.title || "Property"}
                        fill
                        unoptimized
                        sizes="90vw"
                        className="object-contain"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        No property image
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              {/* Property Details */}
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div>
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="break-words text-base font-bold">
                     { property.title }

                      {/* {title.hasMore && (
                        <button
                          type="button"
                          onClick={() => toggleExpanded(property.id)}
                          className="ml-1 text-xs font-semibold text-blue-600"
                        >
                          {isExpanded ? "See Less" : "See More"}
                        </button>
                      )} */}
                    </h3>

                    <span className="shrink-0 rounded-full bg-muted px-2 py-1 text-xs">
                      {property.status || "N/A"}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {property.description}
                    {/* {isExpanded
                      ? 
                      : description.text}

                    {description.hasMore && (
                      <button
                        type="button"
                        onClick={() => toggleExpanded(property.id)}
                        className="ml-1 font-semibold text-blue-600"
                      >
                        {isExpanded ? "See Less" : "See More"}
                      </button>
                    )} */}
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <span>
                    {property.address || "N/A"}
                    {property.area ? `, ${property.area}` : ""}
                    {property.city ? `, ${property.city}` : ""}
                  </span>
                </div>

                {/* Property Type and Category */}
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-muted px-2 py-1 text-xs">
                    {property.propertyType || "N/A"}
                  </span>

                  <span className="rounded-md bg-muted px-2 py-1 text-xs">
                    {property.category || "N/A"}
                  </span>

                  <span className="rounded-md bg-muted px-2 py-1 text-xs">
                    {property.furnished || "N/A"}
                  </span>
                </div>

                {/* Rent */}
                <div className="border-y py-3">
                  <p className="text-lg font-bold text-primary">
                    ৳{Number(property.rent || 0).toLocaleString("en-BD")}
                    <span className="text-xs font-normal text-muted-foreground">
                      {" "}/ month
                    </span>
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Security Deposit: ৳
                    {Number(
                      property.securityDeposit || 0
                    ).toLocaleString("en-BD")}
                  </p>
                </div>

                {/* Rooms */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-md bg-muted/50 p-2">
                    <BedDouble className="mx-auto mb-1 size-4" />
                    <p className="text-sm font-semibold">
                      {property.bedrooms ?? 0}
                    </p>
                    <p className="text-xs text-muted-foreground">Bedrooms</p>
                  </div>

                  <div className="rounded-md bg-muted/50 p-2">
                    <Bath className="mx-auto mb-1 size-4" />
                    <p className="text-sm font-semibold">
                      {property.bathrooms ?? 0}
                    </p>
                    <p className="text-xs text-muted-foreground">Bathrooms</p>
                  </div>

                  <div className="rounded-md bg-muted/50 p-2">
                    <DoorOpen className="mx-auto mb-1 size-4" />
                    <p className="text-sm font-semibold">
                      {property.availableRooms ?? 0}
                    </p>
                    <p className="text-xs text-muted-foreground">Rooms</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-semibold">Contact:</span>{" "}
                    {property.contactName || "N/A"}
                  </p>

                  <p className="break-all text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Phone:
                    </span>{" "}
                    {property.contactPhone || "N/A"}
                  </p>

                  <p className="break-all text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Email:
                    </span>{" "}
                    {property.contactEmail || "N/A"}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-auto border-t pt-3">
             
                    <Edit className="mr-2 size-4" />
                   <PropertyEditDialog property={property} key={property.id}></PropertyEditDialog>
                  
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}