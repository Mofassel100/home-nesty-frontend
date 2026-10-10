"use client";

import {
  CalendarDays,
  CreditCard,
  House,
  Users,
  Clock,
  ReceiptText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetBooking } from "@/hooks";



export interface IBooking {
  id: string;
  propertyId: string;
  customerId: string;
  bookingNumber: string;
  startDate: string;
  endDate: string | null;
  guests: number;
  totalAmount: string | number;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "CANCELLED"
    | "ONGOING"
    | "COMPLETED";
  createdAt: string;
  updatedAt: string;
}

interface BookingListProps {
  bookingData: IBooking[];
 
}

const statusStyles: Record<string, string> = {
  PENDING:
    "bg-amber-100 text-amber-800 border-amber-200",
  CONFIRMED:
    "bg-emerald-100 text-emerald-800 border-emerald-200",
  CANCELLED:
    "bg-red-100 text-red-800 border-red-200",
  ONGOING:
    "bg-blue-100 text-blue-800 border-blue-200",
  COMPLETED:
    "bg-gray-100 text-gray-700 border-gray-200",
};

function formatDate(date: string | null) {
  if (!date) return "Not specified";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

function formatMoney(amount: string | number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

function getNights(
  startDate: string,
  endDate: string | null,
) {
  if (!endDate) return null;

  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();

  return Math.max(
    0,
    Math.round((end - start) / (1000 * 60 * 60 * 24)),
  );
}

export default function BookingList() {
    const {data:bookings,isLoading} = useGetBooking()

      if (isLoading) {
    return (
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        Loading properties...
      </div>
    );
  }

  if (!bookings?.data.length) {
    return (
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        No properties found. Create your first property.
      </div>
    );
  }
    console.log(bookings)









  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {bookings?.data.map((booking:any) => {
        const nights = getNights(
          booking.startDate,
          booking.endDate,
        );

        const canPay = booking.status === "PENDING";

        return (
          <Card
            key={booking.id}
            className="overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md"
          >
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <House className="size-5 text-primary" />
                  </div>

                  <div className="min-w-0">
                    <CardTitle className="text-base">
                      Property Booking
                    </CardTitle>

                    <p className="mt-1 break-all text-xs text-muted-foreground">
                      {booking.bookingNumber}
                    </p>
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className={
                    statusStyles[booking.status] ??
                    "bg-muted text-muted-foreground"
                  }
                >
                  {booking.status}
                </Badge>
              </div>

              <div className="rounded-xl bg-muted/50 p-3">
                <p className="text-xs text-muted-foreground">
                  Total booking amount
                </p>

                <p className="mt-1 text-2xl font-bold tracking-tight">
                  {formatMoney(booking.totalAmount)}
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="size-4" />
                    Check-in
                  </p>

                  <p className="text-sm font-semibold">
                    {formatDate(booking.startDate)}
                  </p>
                </div>

                <div>
                  <p className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="size-4" />
                    Check-out
                  </p>

                  <p className="text-sm font-semibold">
                    {formatDate(booking.endDate)}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="size-4" />
                  Guests
                </div>

                <span className="text-sm font-medium">
                  {booking.guests}{" "}
                  {booking.guests === 1 ? "Guest" : "Guests"}
                </span>
              </div>

              {nights !== null && (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="size-4" />
                    Duration
                  </div>

                  <span className="text-sm font-medium">
                    {nights} {nights === 1 ? "night" : "nights"}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ReceiptText className="size-4" />
                  Booked on
                </div>

                <span className="text-sm">
                  {formatDate(booking.createdAt)}
                </span>
              </div>
            </CardContent>

            <CardFooter className="flex-col gap-3">
              {canPay ? (
                <Button
                  className="w-full"
                  onClick={() => ""}
                >
                  <CreditCard className="mr-2 size-4" />
                  Pay Now
                </Button>
              ) : (
                <Button
                  className="w-full"
                  variant="outline"
                  disabled
                >
                  {booking.status === "CONFIRMED"
                    ? "Booking Confirmed"
                    : booking.status === "CANCELLED"
                      ? "Booking Cancelled"
                      : booking.status === "COMPLETED"
                        ? "Booking Completed"
                        : "Booking In Progress"}
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
