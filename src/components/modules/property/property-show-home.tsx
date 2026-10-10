"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Bath,
  BedDouble,
  DoorOpen,
  Home,
  MapPin,
  Phone,
  Mail,
  UserRound,
  Wallet,
  CalendarDays,
  Pencil,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IProperty } from "@/types";
import { CreateBookingDialog } from "@/components/form/booking/booking-form";

// Import your edit dialog if you have one.
// import PropertyEditDialog from "./PropertyEditDialog";

interface PropertyDetailsTableProps {
  property: IProperty;
}

export default function PropertyDetailsTable({
  property,
}: PropertyDetailsTableProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const formatPrice = (price: number | string | null | undefined) =>
    Number(price || 0).toLocaleString("en-BD");

  const address = [
    property.address,
    property.area,
    property.city,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen} >
        <DialogTrigger  >
        
       <div    
            className="group relative block aspect-video w-full overflow-hidden bg-muted text-left"
            aria-label={`View details for ${property.title}`}>
             {property.imageUrl ? (
              <Image
                src={property.imageUrl}
                alt={property.title || "Property"}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Home className="size-12 text-muted-foreground" />
              </div>
            )}
       </div>

            <span className="absolute bottom-3 right-3 rounded-md bg-black/75 px-3 py-1.5 text-xs font-medium text-white">
              View Details
            </span>
          
        </DialogTrigger>

        <DialogContent className="max-h-[90dvh] w-[calc(100%-1rem)] max-w-4xl overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="pr-6 text-xl sm:text-2xl">
              {property.title}
            </DialogTitle>

            <DialogDescription className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>{address || "Address not provided"}</span>
            </DialogDescription>
          </DialogHeader>

          {/* Property Image */}
          {property.imageUrl && (
            <div className="relative mt-2 aspect-video w-full overflow-hidden rounded-lg bg-muted">
              <Image
                src={property.imageUrl}
                alt={property.title || "Property"}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>
          )}

          {/* Rent */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">
                Monthly Rent
              </p>
              <p className="text-2xl font-bold text-primary">
                ৳{formatPrice(property.rent)}
                <span className="text-sm font-normal text-muted-foreground">
                  {" "}/ month
                </span>
              </p>
            </div>

            <span className="rounded-full bg-muted px-3 py-1 text-sm">
              {property.status || "N/A"}
            </span>
          </div>

          <Separator />

          {/* Description */}
          <section className="space-y-2">
            <h3 className="font-semibold">Description</h3>
            <p className="whitespace-pre-line text-sm leading-6 text-muted-foreground">
              {property.description || "No description available."}
            </p>
          </section>

          <Separator />

          {/* Property Features */}
          <section className="space-y-3">
            <h3 className="font-semibold">Property Features</h3>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Feature
                icon={<BedDouble className="size-5" />}
                label="Bedrooms"
                value={property.bedrooms ?? 0}
              />

              <Feature
                icon={<Bath className="size-5" />}
                label="Bathrooms"
                value={property.bathrooms ?? 0}
              />

              <Feature
                icon={<DoorOpen className="size-5" />}
                label="Available Rooms"
                value={property.availableRooms ?? 0}
              />

              <Feature
                icon={<Home className="size-5" />}
                label="Furnished"
                value={property.furnished || "N/A"}
              />
            </div>
          </section>

          <Separator />

          {/* Additional Details */}
          <section className="space-y-3">
            <h3 className="font-semibold">Additional Details</h3>

            <Detail
              label="Property Type"
              value={property.propertyType}
            />

            <Detail
              label="Category"
              value={property.category || "N/A"}
            />

            <Detail
              label="Security Deposit"
              value={`৳${formatPrice(property.securityDeposit)}`}
            />

            {/* <Detail
              label="Available From"
              value={
                property.availableFrom
                  ? new Date(property.availableFrom).toLocaleDateString(
                      "en-GB"
                    )
                  : "Not specified"
              }
            /> */}

            <Detail
              label="Created At"
              value={
                property.createdAt
                  ? new Date(property.createdAt).toLocaleDateString(
                      "en-GB"
                    )
                  : "N/A"
              }
            />
          </section>

          <Separator />

          {/* Contact Information */}
          <section className="space-y-3">
            <h3 className="font-semibold">Contact Information</h3>

            <ContactDetail
              icon={<UserRound className="size-4" />}
              label="Contact Name"
              value={property.contactName || "Not provided"}
            />

            <ContactDetail
              icon={<Phone className="size-4" />}
              label="Phone"
              value={property.contactPhone || "Not provided"}
            />

            <ContactDetail
              icon={<Mail className="size-4" />}
              label="Email"
              value={property.contactEmail || "Not provided"}
            />
          </section>

          <Separator />

          {/* Actions */}
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDetailsOpen(false)}
            >
              Close
            </Button>

            {/* Open the independent edit dialog here */}
            {/*
            <PropertyEditDialog
              property={property}
              onSuccess={() => setDetailsOpen(false)}
            />
            */}
            <CreateBookingDialog   property={property} key={property.id}></CreateBookingDialog>

            {/* <Button
              type="button"
             
            >
              Book Property
            </Button> */}
          </div>
        </DialogContent>

      </Dialog>
  );
}

/* Reusable feature component */
function Feature({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg border p-3">
      <div className="mb-2 text-primary">{icon}</div>
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

/* Reusable detail component */
function Detail({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-wrap justify-between gap-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

/* Reusable contact component */
function ContactDetail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-primary">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="break-words font-medium">{value}</p>
      </div>
    </div>
  );
}