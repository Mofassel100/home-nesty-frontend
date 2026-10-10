
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Users } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";

import { useBookingCreate } from "@/hooks";
import type { ICreateBookingPayload } from "@/types/booking.type";
import type { IProperty } from "@/types";

interface CreateBookingDialogProps {
  property: IProperty;
}

export function CreateBookingDialog({
  property,
}: CreateBookingDialogProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState("1");

  const { mutate: createBooking, isPending } = useBookingCreate();

  // First day of next month, formatted as YYYY-MM-DD.
  const today = new Date();
  const nextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    1,
  );

  const minStartDate = [
    nextMonth.getFullYear(),
    String(nextMonth.getMonth() + 1).padStart(2, "0"),
    "01",
  ].join("-");

  const resetForm = () => {
    setStartDate("");
    setEndDate("");
    setGuests("1");
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!property?.id) {
      toast.add({
        title: "Validation Error",
        description: "Property information is missing.",
        type: "error",
      });
      return;
    }

    if (!startDate || startDate < minStartDate) {
      toast.add({
        title: "Invalid Start Date",
        description: `Choose a date on or after ${minStartDate}.`,
        type: "error",
      });
      return;
    }

    if (endDate && endDate < startDate) {
      toast.add({
        title: "Invalid End Date",
        description: "End date must be on or after the start date.",
        type: "error",
      });
      return;
    }

    const guestCount = Number(guests);

    if (
      !Number.isInteger(guestCount) ||
      guestCount < 1 ||
      guestCount > 20
    ) {
      toast.add({
        title: "Invalid Guest Count",
        description: "Enter a number of guests between 1 and 20.",
        type: "error",
      });
      return;
    }

    const payload: ICreateBookingPayload = {
      propertyId: property.id,
      startDate,
      endDate: endDate || undefined,
      guests: guestCount,
    };

    createBooking(payload, {
      onSuccess: () => {
        toast.add({
          title: "Booking Created",
          description: "Your booking request was submitted.",
          type: "success",
        });

        setOpen(false);
        resetForm();

        router.push("/customer/booking");
      },

      onError: (error: Error) => {
        toast.add({
          title: "Booking Failed",
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong.",
          type: "error",
        });
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        render={
          <Button type="button">
            Book Now
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] overflow-y-auto sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              Create Property Booking
            </DialogTitle>

            <DialogDescription>
              Enter your preferred booking dates and guest count.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-5">
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

            <Field>
              <Label>Property Name</Label>
              <p className="font-semibold">
                {property.title}
              </p>
            </Field>

            <Field>
              <Label htmlFor="startDate">
                <CalendarDays className="mr-2 inline size-4" />
                Start Date
              </Label>

              <Input
                id="startDate"
                type="date"
                value={startDate}
                min={minStartDate}
                onChange={(e) => {
                  const value = e.target.value;

                  setStartDate(value);

                  if (endDate && endDate < value) {
                    setEndDate("");
                  }
                }}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="endDate">
                End Date (Optional)
              </Label>

              <Input
                id="endDate"
                type="date"
                value={endDate}
                min={startDate || minStartDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Field>

            <Field>
              <Label htmlFor="guests">
                <Users className="mr-2 inline size-4" />
                Number of Guests
              </Label>

              <Input
                id="guests"
                type="number"
                min={1}
                max={20}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                required
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending}
                >
                  Cancel
                </Button>
              }
            />

            <Button
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Spinner />
                  Creating...
                </>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
