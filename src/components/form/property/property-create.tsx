"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { FileUp, Home, MapPin, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
Field,
FieldError,
FieldGroup,
FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";

import { usePropertyCreate } from "@/hooks/property.hook";
import {
  IProperty,
  PropertyType,
  PropertyStatus,
  PropertyCategory,
  FurnishedStatus,
} from "@/types";

// Keep these enums aligned with your backend Prisma enums.
export const PROPERTY_TYPES = Object.values(PropertyType);
export const PROPERTY_STATUSES = Object.values(PropertyStatus);
export const PROPERTY_CATEGORIES = Object.values(PropertyCategory);
export const FURNISHED_STATUSES = Object.values(FurnishedStatus);

const propertySchema = z.object({
title: z.string().trim().min(5, "Title must be at least 5 characters").max(200),
description: z
.string()
.trim()
.min(20, "Description must be at least 20 characters")
.max(2000),

propertyType: z.nativeEnum(PropertyType),
category: z.nativeEnum(PropertyCategory),
status: z.nativeEnum(PropertyStatus),

address: z.string().trim().min(5, "Enter a valid address"),
city: z.string().trim().min(2, "Enter a valid city"),
area: z.string(),

rent: z.string().refine(
(value) =>
value.trim() !== "" &&
Number.isFinite(Number(value)) &&
Number(value) > 0,
"Enter a valid monthly rent.",
),

securityDeposit: z.string().refine(
(value) =>
value.trim() === "" ||
(Number.isFinite(Number(value)) && Number(value) >= 0),
"Enter a valid security deposit.",
),

bedrooms: z.string().refine(
(value) =>
Number.isInteger(Number(value)) && Number(value) >= 0,
"Enter a valid bedroom count.",
),

bathrooms: z.string().refine(
(value) =>
Number.isInteger(Number(value)) && Number(value) >= 0,
"Enter a valid bathroom count.",
),

availableRooms: z.string().refine(
(value) =>
Number.isInteger(Number(value)) && Number(value) >= 1,
"At least one available room is required.",
),

furnished: z.nativeEnum(FurnishedStatus),
contactName: z.string(),
contactPhone: z.string(),

contactEmail: z.string().email().optional().or(z.literal("")),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

export default function PropertyCreateForm() {
const router = useRouter();

const { mutate: propertyCreate, isPending } = usePropertyCreate();

const form = useForm({
defaultValues: {
title: "",
description: "",
propertyType: PropertyType.APARTMENT,
category: PropertyCategory.BACHELOR,
status: PropertyStatus.PENDING,


  address: "",
  city: "",
  area: "",
  rent: "",
  securityDeposit: "",
  bedrooms: "1",
  bathrooms: "1",
  availableRooms: "1",
  furnished: FurnishedStatus.FURNISHED,

  contactName: "",
  contactPhone: "",
  contactEmail: "",
  image: null as File | null,
},

validators: {
  onSubmit: ({ value }) => {
    const result = propertySchema.safeParse(value);
    return result.success ? undefined : result.error;
  },
},

onSubmit: async ({ value }) => {
  const parsed = propertySchema.safeParse(value);

  if (!parsed.success) {
    toast.add({
      title: "Validation Error",
      description: "Please check the property information.",
      type: "error",
    });
    return;
  }

  const fields = parsed.data;
const propertyData: IProperty = {
  title: fields.title,
  description: fields.description,
  propertyType: fields.propertyType ,
  category: fields.category,
  status: fields.status,

  address: fields.address,
  city: fields.city,
  area: fields.area.trim() || null,

  rent: Number(fields.rent),
  securityDeposit:
    fields.securityDeposit.trim() === ""
      ? null
      : Number(fields.securityDeposit),

  bedrooms: Number(fields.bedrooms),
  bathrooms: Number(fields.bathrooms),
  availableRooms: Number(fields.availableRooms),

  furnished: fields.furnished,

  contactName: fields.contactName.trim() || null,
  contactPhone: fields.contactPhone.trim() || null,
  contactEmail: fields.contactEmail
};
  propertyCreate(
    {
      data: propertyData,
      propertyImage: value.image,
    },
    {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Creation Failed",
            description: "Could not create the property.",
            type: "error",
          });
          return;
        }

        toast.add({
          title: "Property Created",
          description: "Your property was created successfully.",
          type: "success",
        });

        router.push("/provider/property/property-details");
      },

      onError: (error: Error) => {
        toast.add({
          title: "Creation Failed",
          description: error.message || "Something went wrong.",
          type: "error",
        });
      },
    },
  );
},


});

const inputClass = "w-full";

return ( <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8 sm:px-6"> <div className="space-y-2"> <h1 className="flex items-center gap-2 text-2xl font-bold sm:text-3xl"> <Home className="size-6" />
Create Property </h1> <p className="text-sm text-muted-foreground">
Add your property details to Home Nesty. </p> </div>


  <form
    onSubmit={(event) => {
      event.preventDefault();
      event.stopPropagation();
      void form.handleSubmit();
    }}
    noValidate
    className="space-y-8"
  >
    <FieldGroup className="gap-6">
      {/* Basic Information */}
      <section className="space-y-4 rounded-xl border p-4 sm:p-6">
        <h2 className="font-semibold">Basic Information</h2>

        <form.Field name="title">
          {(field) => (
            <Field>
              <FieldLabel>Property Title *</FieldLabel>
              <Input
                className={inputClass}
                placeholder="e.g. Modern 2-bedroom apartment"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.isTouched &&
                !field.state.meta.isValid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
            </Field>
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <Field>
              <FieldLabel>Description *</FieldLabel>
              <Textarea
                placeholder="Describe the property, facilities, and rental conditions..."
                className="min-h-32 resize-y"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.isTouched &&
                !field.state.meta.isValid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
            </Field>
          )}
        </form.Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <form.Field name="propertyType">
            {(field) => (
              <Field>
                <FieldLabel>Property Type *</FieldLabel>
                <select
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(
                      e.target.value as PropertyFormValues["propertyType"],
                    )
                  }
                >
                  {PROPERTY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </Field>
            )}
          </form.Field>

          <form.Field name="category">
            {(field) => (
              <Field>
                <FieldLabel>Property Category *</FieldLabel>
                <select
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(
                      e.target.value as PropertyFormValues["category"],
                    )
                  }
                >
                  {PROPERTY_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </Field>
            )}
          </form.Field>

          <form.Field name="furnished">
            {(field) => (
              <Field>
                <FieldLabel>Furnished Status *</FieldLabel>
                <select
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(
                      e.target.value as PropertyFormValues["furnished"],
                    )
                  }
                >
                  {FURNISHED_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </Field>
            )}
          </form.Field>

          <form.Field name="status">
            {(field) => (
              <Field>
                <FieldLabel>Property Status *</FieldLabel>
                <select
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(
                      e.target.value as PropertyFormValues["status"],
                    )
                  }
                >
                  {PROPERTY_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </Field>
            )}
          </form.Field>
        </div>
      </section>

      {/* Property Location */}
      <section className="space-y-4 rounded-xl border p-4 sm:p-6">
        <h2 className="flex items-center gap-2 font-semibold">
          <MapPin className="size-4" />
          Property Location
        </h2>

        <form.Field name="address">
          {(field) => (
            <Field>
              <FieldLabel>Full Address *</FieldLabel>
              <Input
                placeholder="House, road, and area"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.isTouched &&
                !field.state.meta.isValid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
            </Field>
          )}
        </form.Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <form.Field name="city">
            {(field) => (
              <Field>
                <FieldLabel>City *</FieldLabel>
                <Input
                  placeholder="e.g. Dhaka"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched &&
                  !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
              </Field>
            )}
          </form.Field>

          <form.Field name="area">
            {(field) => (
              <Field>
                <FieldLabel>Area (Optional)</FieldLabel>
                <Input
                  placeholder="e.g. Uttara"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.Field>
        </div>
      </section>

      {/* Rental Details */}
      <section className="space-y-4 rounded-xl border p-4 sm:p-6">
        <h2 className="font-semibold">Rental Details</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <form.Field name="rent">
            {(field) => (
              <Field>
                <FieldLabel>Monthly Rent (৳) *</FieldLabel>
                <Input
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="25000"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched &&
                  !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
              </Field>
            )}
          </form.Field>

          <form.Field name="securityDeposit">
            {(field) => (
              <Field>
                <FieldLabel>Security Deposit (৳)</FieldLabel>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Optional"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched &&
                  !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
              </Field>
            )}
          </form.Field>

          <form.Field name="bedrooms">
            {(field) => (
              <Field>
                <FieldLabel>Bedrooms *</FieldLabel>
                <Input
                  type="number"
                  min="0"
                  step="1"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched &&
                  !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
              </Field>
            )}
          </form.Field>

          <form.Field name="bathrooms">
            {(field) => (
              <Field>
                <FieldLabel>Bathrooms *</FieldLabel>
                <Input
                  type="number"
                  min="0"
                  step="1"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched &&
                  !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
              </Field>
            )}
          </form.Field>

          <form.Field name="availableRooms">
            {(field) => (
              <Field>
                <FieldLabel>Available Rooms *</FieldLabel>
                <Input
                  type="number"
                  min="1"
                  step="1"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched &&
                  !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
              </Field>
            )}
          </form.Field>
        </div>
      </section>

      {/* Contact Information */}
      <section className="space-y-4 rounded-xl border p-4 sm:p-6">
        <h2 className="font-semibold">Contact Information</h2>

        <form.Field name="contactName">
          {(field) => (
            <Field>
              <FieldLabel>Contact Name</FieldLabel>
              <Input
                placeholder="Contact person's name"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        </form.Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <form.Field name="contactPhone">
            {(field) => (
              <Field>
                <FieldLabel>Phone Number</FieldLabel>
                <Input
                  type="tel"
                  placeholder="+880..."
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="contactEmail">
            {(field) => (
              <Field>
                <FieldLabel>Contact Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="contact@example.com"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched &&
                  !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
              </Field>
            )}
          </form.Field>
        </div>
      </section>

      {/* Property Image */}
      <section className="space-y-4 rounded-xl border p-4 sm:p-6">
        <h2 className="font-semibold">Property Image</h2>

        <form.Field name="image">
          {(field) => (
            <Field>
              <FieldLabel>Upload Image</FieldLabel>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  render={
                    <label className="cursor-pointer">
                      <FileUp className="mr-2 inline size-4" />
                      Choose Image
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          field.handleChange(file);
                          e.target.value = "";
                        }}
                      />
                    </label>
                  }
                  nativeButton={false}
                />

                {field.state.value && (
                  <div className="flex max-w-full items-center gap-2 text-sm">
                    <span className="max-w-48 truncate">
                      {field.state.value.name}
                    </span>

                    <button
                      type="button"
                      aria-label="Remove image"
                      onClick={() => field.handleChange(null)}
                    >
                      <X className="size-4 text-destructive" />
                    </button>
                  </div>
                )}
              </div>

              <p className="text-xs text-muted-foreground">
                Select an image of your property.
              </p>
            </Field>
          )}
        </form.Field>
      </section>
    </FieldGroup>

    {/* Actions */}
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={() => router.back()}
      >
        Cancel
      </Button>

      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Spinner />
            Creating Property...
          </>
        ) : (
          "Create Property"
        )}
      </Button>
    </div>
  </form>
</div>


);
}
