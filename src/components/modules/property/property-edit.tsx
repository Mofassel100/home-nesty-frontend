

"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

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

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";

import { usePropertyEdit } from "@/hooks/property.hook";

import {

  PropertyType,
  PropertyStatus,
  PropertyCategory,
  FurnishedStatus,
} from "@/types/propert.type";

import type {
  IPropertyUpdated,
  IpropertyUpdatedPayload,
} from "@/types/propert.type";

type PropertyEditProps = {
  property: IPropertyUpdated;
};


export function PropertyEditDialog({
  property,
}: PropertyEditProps) {



  const [open, setOpen] = useState(false);

  // Basic information
   const PROPERTY_TYPES = Object.values(PropertyType);
 const PROPERTY_STATUSES = Object.values(PropertyStatus);
 const PROPERTY_CATEGORIES = Object.values(PropertyCategory);
 const FURNISHED_STATUSES = Object.values(FurnishedStatus);
  const [title, setTitle] = useState(property.title ?? "");
  const [description, setDescription] = useState(
    property.description ?? ""
  );

  const [rent, setRent] = useState(
    String(property.rent ?? "")
  );

  const [address, setAddress] = useState(
    property.address ?? ""
  );

  const [city, setCity] = useState(property.city ?? "");
  const [area, setArea] = useState(property.area ?? "");

  // Keep number input values as strings until submission.
  const [securityDeposit, setSecurityDeposit] = useState(
    property.securityDeposit == null
      ? ""
      : String(property.securityDeposit)
  );

  // Room information
  const [bedrooms, setBedrooms] = useState(
    String(property.bedrooms ?? 1)
  );

  const [bathrooms, setBathrooms] = useState(
    String(property.bathrooms ?? 1)
  );

  const [availableRooms, setAvailableRooms] = useState(
    String(property.availableRooms ?? 1)
  );

  // Enum dropdowns
  const [propertyType, setPropertyType] =
    useState<PropertyType>(
      property.propertyType ?? PropertyType.APARTMENT
    );

  const [category, setCategory] =
    useState<PropertyCategory | "">(
      property.category ?? ""
    );

  const [furnished, setFurnished] =
    useState<FurnishedStatus>(
      property.furnished ?? FurnishedStatus.UNFURNISHED
    );

  const [status, setStatus] = useState<PropertyStatus>(
    property.status ?? PropertyStatus.PENDING
  );

  // Contact information
  const [contactName, setContactName] = useState(
    property.contactName ?? ""
  );

  const [contactPhone, setContactPhone] = useState(
    property.contactPhone ?? ""
  );

  const [contactEmail, setContactEmail] = useState(
    property.contactEmail ?? ""
  );

  // Image upload
  const [propertyImage, setPropertyImage] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState(
    property.imageUrl ?? ""
  );

  const queryClient = useQueryClient();

  const {
    mutate: updateProperty,
    isPending,
  } = usePropertyEdit();

  // Reset form when opening the dialog.
  useEffect(() => {
    if (!open) return;

    setTitle(property.title ?? "");
    setDescription(property.description ?? "");
    setRent(String(property.rent ?? ""));
    setAddress(property.address ?? "");
    setCity(property.city ?? "");
    setArea(property.area ?? "");

    setSecurityDeposit(
      property.securityDeposit == null
        ? ""
        : String(property.securityDeposit)
    );

    setBedrooms(String(property.bedrooms ?? 1));
    setBathrooms(String(property.bathrooms ?? 1));

    setAvailableRooms(
      String(property.availableRooms ?? 1)
    );

    setPropertyType(
      property.propertyType ?? PropertyType.APARTMENT
    );

    setCategory(property.category ?? "");

    setFurnished(
      property.furnished ?? FurnishedStatus.UNFURNISHED
    );

    setStatus(property.status ?? PropertyStatus.PENDING);

    setContactName(property.contactName ?? "");
    setContactPhone(property.contactPhone ?? "");
    setContactEmail(property.contactEmail ?? "");

    setPropertyImage(null);
    setImagePreview(property.imageUrl ?? "");
  }, [open, property]);

  // Generate and release temporary image preview URLs.
  useEffect(() => {
    if (!propertyImage) return;

    const previewUrl = URL.createObjectURL(propertyImage);

    setImagePreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [propertyImage]);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Required field validation
    if (
      !title.trim() ||
      !description.trim() ||
      !address.trim() ||
      !city.trim() ||
      rent.trim() === ""
    ) {
      toast.add({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        type: "error",
      });

      return;
    }

    if (!category) {
      toast.add({
        title: "Validation Error",
        description: "Please select a property category.",
        type: "error",
      });

      return;
    }

    // Convert numeric fields.
    const rentNumber = Number(rent);

    const depositNumber =
      securityDeposit.trim() === ""
        ? null
        : Number(securityDeposit);

    const bedroomsNumber = Number(bedrooms);
    const bathroomsNumber = Number(bathrooms);
    const availableRoomsNumber = Number(availableRooms);

    // Validate numeric values.
    if (
      !Number.isFinite(rentNumber) ||
      rentNumber < 0 ||
      (depositNumber !== null &&
        (!Number.isFinite(depositNumber) ||
          depositNumber < 0)) ||
      !Number.isInteger(bedroomsNumber) ||
      bedroomsNumber < 0 ||
      !Number.isInteger(bathroomsNumber) ||
      bathroomsNumber < 0 ||
      !Number.isInteger(availableRoomsNumber) ||
      availableRoomsNumber < 0
    ) {
      toast.add({
        title: "Validation Error",
        description:
          "Enter valid rent, deposit, and room numbers.",
        type: "error",
      });

      return;
    }

    if (!property.id) {
      toast.add({
        title: "Error",
        description: "Property ID is missing.",
        type: "error",
      });

      return;
    }

    // Update payload
    const PropertyData = {
    
        title: title.trim(),
        description: description.trim(),

        rent: rentNumber,
        securityDeposit: depositNumber,

        address: address.trim(),
        city: city.trim(),
        area: area.trim() || null,

        propertyType,
        category,

        bedrooms: bedroomsNumber,
        bathrooms: bathroomsNumber,
        availableRooms: availableRoomsNumber,

        furnished,

        contactName: contactName.trim() || null,
        contactPhone: contactPhone.trim() || null,
        contactEmail: contactEmail.trim() || null,

        status,
      
    };

    updateProperty(
      {
        id: property.id,
        payload:{
            data:PropertyData,
            propertyImage
        },
      },
      {
        onSuccess: () => {
          toast.add({
            title: "Updated Successfully",
            description: "Property updated successfully.",
            type: "success",
          });

          queryClient.invalidateQueries({
            queryKey: ["property"],
          });

          queryClient.invalidateQueries({
            queryKey: ["property", property.id],
          });

          setOpen(false);
        },

        onError: (error) => {
          toast.add({
            title: "Update Failed",
            description:
              error instanceof Error
                ? error.message
                : "Something went wrong.",
            type: "error",
          });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button type="button" variant="outline">
            Edit Property
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] overflow-y-auto sm:max-w-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>

            <DialogDescription>
              Update your property details, category, rent,
              security deposit, and image.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-5">
            {/* Property image */}
            <Field>
              <Label htmlFor={`image-${property.id}`}>
                Property Image
              </Label>

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Property preview"
                  className="h-48 w-full rounded-lg border object-cover"
                />
              )}

              <Input
                id={`image-${property.id}`}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (!file) return;

                  if (!file.type.startsWith("image/")) {
                    toast.add({
                      title: "Invalid File",
                      description: "Please select an image.",
                      type: "error",
                    });

                    e.target.value = "";
                    return;
                  }

                  if (file.size > 5 * 1024 * 1024) {
                    toast.add({
                      title: "Image Too Large",
                      description:
                        "Please select an image smaller than 5 MB.",
                      type: "error",
                    });

                    e.target.value = "";
                    return;
                  }

                  setPropertyImage(file);
                }}
              />

              <p className="text-sm text-muted-foreground">
                Leave empty to keep the current image.
                Maximum file size: 5 MB.
              </p>
            </Field>

            {/* Title */}
            <Field>
              <Label htmlFor={`title-${property.id}`}>
                Title
              </Label>

              <Input
                id={`title-${property.id}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter property title"
                required
              />
            </Field>

            {/* Description */}
            <Field>
              <Label htmlFor={`description-${property.id}`}>
                Description
              </Label>

              <Textarea
                id={`description-${property.id}`}
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Enter property description"
                rows={4}
                required
              />
            </Field>

            {/* Monthly rent */}
            <Field>
              <Label htmlFor={`rent-${property.id}`}>
                Monthly Rent
              </Label>

              <Input
                id={`rent-${property.id}`}
                type="number"
                min="0"
                step="0.01"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                placeholder="Enter monthly rent"
                required
              />
            </Field>

            {/* Security deposit */}
            <Field>
              <Label
                htmlFor={`deposit-${property.id}`}
              >
                Security Deposit
              </Label>

              <Input
                id={`deposit-${property.id}`}
                type="number"
                min="0"
                step="0.01"
                value={securityDeposit}
                onChange={(e) =>
                  setSecurityDeposit(e.target.value)
                }
                placeholder="Enter security deposit"
              />
            </Field>

            {/* Address */}
            <Field>
              <Label htmlFor={`address-${property.id}`}>
                Address
              </Label>

              <Input
                id={`address-${property.id}`}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                required
              />
            </Field>

            {/* City */}
            <Field>
              <Label htmlFor={`city-${property.id}`}>
                City
              </Label>

              <Input
                id={`city-${property.id}`}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                required
              />
            </Field>

            {/* Area */}
            <Field>
              <Label htmlFor={`area-${property.id}`}>
                Area
              </Label>

              <Input
                id={`area-${property.id}`}
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Enter area (optional)"
              />
            </Field>

            {/* Property type */}
            <Field>
              <Label htmlFor={`type-${property.id}`}>
                Property Type
              </Label>

              <select
                id={`type-${property.id}`}
                value={propertyType}
                onChange={(e) =>
                  setPropertyType(
                    e.target.value as PropertyType
                  )
                }
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              >
                {PROPERTY_TYPES.map((item) => (
                  <option key={item} value={item}>
                    {item.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </Field>

            {/* Property category */}
            <Field>
              <Label htmlFor={`category-${property.id}`}>
                Property Category
              </Label>

              <select
                id={`category-${property.id}`}
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value as PropertyCategory | ""
                  )
                }
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                required
              >
                <option value="" disabled>
                  Select category
                </option>

                {PROPERTY_CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </Field>

            {/* Bedrooms */}
            <Field>
              <Label htmlFor={`bedrooms-${property.id}`}>
                Bedrooms
              </Label>

              <Input
                id={`bedrooms-${property.id}`}
                type="number"
                min="0"
                step="1"
                value={bedrooms}
                onChange={(e) =>
                  setBedrooms(e.target.value)
                }
              />
            </Field>

            {/* Bathrooms */}
            <Field>
              <Label htmlFor={`bathrooms-${property.id}`}>
                Bathrooms
              </Label>

              <Input
                id={`bathrooms-${property.id}`}
                type="number"
                min="0"
                step="1"
                value={bathrooms}
                onChange={(e) =>
                  setBathrooms(e.target.value)
                }
              />
            </Field>

            {/* Available rooms */}
            <Field>
              <Label
                htmlFor={`availableRooms-${property.id}`}
              >
                Available Rooms
              </Label>

              <Input
                id={`availableRooms-${property.id}`}
                type="number"
                min="0"
                step="1"
                value={availableRooms}
                onChange={(e) =>
                  setAvailableRooms(e.target.value)
                }
              />
            </Field>

            {/* Furnished status */}
            <Field>
              <Label htmlFor={`furnished-${property.id}`}>
                Furnished Status
              </Label>

              <select
                id={`furnished-${property.id}`}
                value={furnished}
                onChange={(e) =>
                  setFurnished(
                    e.target.value as FurnishedStatus
                  )
                }
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              >
                {FURNISHED_STATUSES.map((item) => (
                  <option key={item} value={item}>
                    {item.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </Field>

            {/* Contact name */}
            <Field>
              <Label htmlFor={`contactName-${property.id}`}>
                Contact Name
              </Label>

              <Input
                id={`contactName-${property.id}`}
                value={contactName}
                onChange={(e) =>
                  setContactName(e.target.value)
                }
                placeholder="Enter contact name"
              />
            </Field>

            {/* Contact phone */}
            <Field>
              <Label htmlFor={`contactPhone-${property.id}`}>
                Contact Phone
              </Label>

              <Input
                id={`contactPhone-${property.id}`}
                type="tel"
                value={contactPhone}
                onChange={(e) =>
                  setContactPhone(e.target.value)
                }
                placeholder="Enter contact phone"
              />
            </Field>

            {/* Contact email */}
            <Field>
              <Label htmlFor={`contactEmail-${property.id}`}>
                Contact Email
              </Label>

              <Input
                id={`contactEmail-${property.id}`}
                type="email"
                value={contactEmail}
                onChange={(e) =>
                  setContactEmail(e.target.value)
                }
                placeholder="Enter contact email"
              />
            </Field>

            {/* Property status */}
            <Field>
              <Label htmlFor={`status-${property.id}`}>
                Property Status
              </Label>

              <select
                id={`status-${property.id}`}
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as PropertyStatus
                  )
                }
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              >
                {PROPERTY_STATUSES.map((item) => (
                  <option key={item} value={item}>
                    {item.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </Field>
          </FieldGroup>

          {/* Form actions */}
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

            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Spinner />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useQueryClient } from "@tanstack/react-query";

// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { Button } from "@/components/ui/button";
// import { Field, FieldGroup } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Spinner } from "@/components/ui/spinner";
// import { toast } from "@/components/ui/toast";

// import { usePropertyEdit } from "@/hooks/property.hook";

// import type {
//   IProperty,
//   IPropertyUpdated,
//   IpropertyUpdatedPayload,
//   PropertyEditPayload,
// } from "@/types/propert.type";

// type PropertyEditProps = {
//   property: IPropertyUpdated;
// };

// export function PropertyEditDialog({
//   property,
// }: PropertyEditProps) {
//   const [open, setOpen] = useState(false);

//   const [title, setTitle] = useState(property.title ?? "");
//   const [description, setDescription] = useState(
//     property.description ?? ""
//   );
//   const [rent, setRent] = useState(
//     String(property.rent ?? "")
//   );
//   const [address, setAddress] = useState(
//     property.address ?? ""
//   );
//   const [city, setCity] = useState(property.city ?? "");
//   const [area, setArea] = useState(property.area ?? "");
//   const [securityDeposit, setSecurityDeposit] = useState(
//     Number(property.securityDeposit ?? 0)
//   );

//   const [bedrooms, setBedrooms] = useState(
//     String(property.bedrooms ?? 1)
//   );
//   const [bathrooms, setBathrooms] = useState(
//     String(property.bathrooms ?? 1)
//   );
//   const [availableRooms, setAvailableRooms] = useState(
//     String(property.availableRooms ?? 1)
//   );

//   const [propertyType, setPropertyType] = useState(
//     property.propertyType ?? "APARTMENT"
//   );

//   const [furnished, setFurnished] = useState(
//     property.furnished ?? "UNFURNISHED"
//   );

//   const [contactName, setContactName] = useState(
//     property.contactName ?? ""
//   );
//   const [contactPhone, setContactPhone] = useState(
//     property.contactPhone ?? ""
//   );
//   const [contactEmail, setContactEmail] = useState(
//     property.contactEmail ?? ""
//   );

//   const [status, setStatus] = useState(
//     property.status ?? "PENDING"
//   );

//   const [propertyImage, setPropertyImage] =
//     useState<File | null>(null);

//   const [imagePreview, setImagePreview] = useState(
//     property.imageUrl ?? ""
//   );

//   const queryClient = useQueryClient();

//   const {
//     mutate: updateProperty,
//     isPending,
//   } = usePropertyEdit();

//   useEffect(() => {
//     if (!open) return;

//     setTitle(property.title ?? "");
//     setDescription(property.description ?? "");
//     setRent(String(property.rent ?? ""));
//     setAddress(property.address ?? "");
//     setCity(property.city ?? "");
//     setArea(property.area ?? "");
//     setSecurityDeposit(
//       Number(property.securityDeposit ?? 0)
//     );
//     setBedrooms(String(property.bedrooms ?? 1));
//     setBathrooms(String(property.bathrooms ?? 1));
//     setAvailableRooms(
//       String(property.availableRooms ?? 1)
//     );
//     setPropertyType(
//       property.propertyType ?? "APARTMENT"
//     );
//     setFurnished(
//       property.furnished ?? "UNFURNISHED"
//     );
//     setContactName(property.contactName ?? "");
//     setContactPhone(property.contactPhone ?? "");
//     setContactEmail(property.contactEmail ?? "");
//     setStatus(property.status ?? "PENDING");

//     setPropertyImage(null);
//     setImagePreview(property.imageUrl ?? "");
//   }, [open, property]);

//   // Release the temporary preview URL when it changes.
//   useEffect(() => {
//     if (!propertyImage) return;

//     const previewUrl = URL.createObjectURL(propertyImage);
//     setImagePreview(previewUrl);

//     return () => URL.revokeObjectURL(previewUrl);
//   }, [propertyImage]);

//   const handleSubmit = (
//     e: React.FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();

//     if (
//       !title.trim() ||
//       !description.trim() ||
//       !address.trim() ||
//       !city.trim() ||
//       rent.trim() === ""
//     ) {
//       toast.add({
//         title: "Validation Error",
//         description: "Please fill in all required fields.",
//         type: "error",
//       });
//       return;
//     }

//     const rentNumber = Number(rent);
//     const depositNumber =
//       securityDeposit.trim() === ""
//         ? null
//         : Number(securityDeposit);

//     if (
//       !Number.isFinite(rentNumber) ||
//       rentNumber < 0 ||
//       (depositNumber !== null &&
//         (!Number.isFinite(depositNumber) ||
//           depositNumber < 0))
//     ) {
//       toast.add({
//         title: "Validation Error",
//         description: "Enter valid rent and deposit amounts.",
//         type: "error",
//       });
//       return;
//     }

//     if (!property.id) {
//       toast.add({
//         title: "Error",
//         description: "Property ID is missing.",
//         type: "error",
//       });
//       return;
//     }

//     const payload: IpropertyUpdatedPayload = {
//       propertyImage,
//       data: {
//         title: title.trim(),
//         description: description.trim(),
//         rent: rentNumber,
//         address: address.trim(),
//         city: city.trim(),
//         propertyType,

//         area: area.trim() || null,
//         securityDeposit: depositNumber,
//         bedrooms: Number(bedrooms),
//         bathrooms: Number(bathrooms),
//         availableRooms: Number(availableRooms),
//         furnished,

//         contactName: contactName.trim() || null,
//         contactPhone: contactPhone.trim() || null,
//         contactEmail: contactEmail.trim() || null,
//         status,
//       },
//     };

//     updateProperty(
//       {
//         id: property.id,
//         payload,
//       },
//       {
//         onSuccess: () => {
//           toast.add({
//             title: "Updated Successfully",
//             description: "Property updated successfully.",
//             type: "success",
//           });

//           queryClient.invalidateQueries({
//             queryKey: ["properties"],
//           });

//           queryClient.invalidateQueries({
//             queryKey: ["property", property.id],
//           });

//           setOpen(false);
//         },

//         onError: (error) => {
//           toast.add({
//             title: "Update Failed",
//             description:
//               error instanceof Error
//                 ? error.message
//                 : "Something went wrong.",
//             type: "error",
//           });
//         },
//       }
//     );
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger
//         render={
//           <Button type="button" variant="outline">
//             Edit Property
//           </Button>
//         }
//       />

//       <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] overflow-y-auto sm:max-w-2xl">
//         <form onSubmit={handleSubmit}>
//           <DialogHeader>
//             <DialogTitle>Edit Property</DialogTitle>
//             <DialogDescription>
//               Update property details and upload a new image
//               if needed.
//             </DialogDescription>
//           </DialogHeader>

//           <FieldGroup className="mt-5">
//             {/* Property image */}
//             <Field>
//               <Label htmlFor={`image-${property.id}`}>
//                 Property Image
//               </Label>

//               {imagePreview && (
//                 <img
//                   src={imagePreview}
//                   alt="Property preview"
//                   className="h-48 w-full rounded-lg border object-cover"
//                 />
//               )}

//               <Input
//                 id={`image-${property.id}`}
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   const file = e.target.files?.[0];

//                   if (!file) return;

//                   if (!file.type.startsWith("image/")) {
//                     toast.add({
//                       title: "Invalid File",
//                       description: "Please select an image.",
//                       type: "error",
//                     });
//                     e.target.value = "";
//                     return;
//                   }

//                   setPropertyImage(file);
//                 }}
//               />

//               <p className="text-sm text-muted-foreground">
//                 Leave empty to keep the current image.
//               </p>
//             </Field>

//             {/* Title */}
//             <Field>
//               <Label htmlFor={`title-${property.id}`}>
//                 Title
//               </Label>
//               <Input
//                 id={`title-${property.id}`}
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//               />
//             </Field>

//             {/* Description */}
//             <Field>
//               <Label htmlFor={`description-${property.id}`}>
//                 Description
//               </Label>
//               <Textarea
//                 id={`description-${property.id}`}
//                 value={description}
//                 onChange={(e) =>
//                   setDescription(e.target.value)
//                 }
//                 rows={4}
//                 required
//               />
//             </Field>

//             {/* Rent */}
//             <Field>
//               <Label htmlFor={`rent-${property.id}`}>
//                 Monthly Rent
//               </Label>
//               <Input
//                 id={`rent-${property.id}`}
//                 type="number"
//                 min="0"
//                 value={rent}
//                 onChange={(e) => setRent(e.target.value)}
//                 required
//               />
//             </Field>

//             {/* Security deposit */}
//             <Field>
//               <Label>Security Deposit</Label>
//               <Input
//                 type="number"
//                 min="0"
//                 value={securityDeposit}
//                 onChange={(e) =>
//                   setSecurityDeposit(e.target.value)
//                 }
//               />
//             </Field>

//             {/* Address */}
//             <Field>
//               <Label>Address</Label>
//               <Input
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 required
//               />
//             </Field>

//             {/* City */}
//             <Field>
//               <Label>City</Label>
//               <Input
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 required
//               />
//             </Field>

//             {/* Area */}
//             <Field>
//               <Label>Area</Label>
//               <Input
//                 value={area}
//                 onChange={(e) => setArea(e.target.value)}
//               />
//             </Field>

//             {/* Property type */}
//             <Field>
//               <Label>Property Type</Label>
//               <select
//                 value={propertyType}
//                 onChange={(e) =>
//                   setPropertyType(
//                     e.target.value as typeof propertyType
//                   )
//                 }
//                 className="h-10 w-full rounded-md border bg-background px-3 text-sm"
//               >
//                 <option value="APARTMENT">Apartment</option>
//                 <option value="HOUSE">House</option>
//                 <option value="SUBLET">Sublet</option>
//                 <option value="ROOM">Room</option>
//                 <option value="BACHELOR_ROOM">
//                   Bachelor Room
//                 </option>
//                 <option value="FAMILY_APARTMENT">
//                   Family Apartment
//                 </option>
//                 <option value="SHARED_APARTMENT">
//                   Shared Apartment
//                 </option>
//                 <option value="HOSTEL">Hostel</option>
//               </select>
//             </Field>

//             {/* Bedrooms */}
//             <Field>
//               <Label>Bedrooms</Label>
//               <Input
//                 type="number"
//                 min="0"
//                 value={bedrooms}
//                 onChange={(e) =>
//                   setBedrooms(e.target.value)
//                 }
//               />
//             </Field>

//             {/* Bathrooms */}
//             <Field>
//               <Label>Bathrooms</Label>
//               <Input
//                 type="number"
//                 min="0"
//                 value={bathrooms}
//                 onChange={(e) =>
//                   setBathrooms(e.target.value)
//                 }
//               />
//             </Field>

//             {/* Available rooms */}
//             <Field>
//               <Label>Available Rooms</Label>
//               <Input
//                 type="number"
//                 min="0"
//                 value={availableRooms}
//                 onChange={(e) =>
//                   setAvailableRooms(e.target.value)
//                 }
//               />
//             </Field>

//             {/* Furnished */}
//             <Field>
//               <Label>Furnished Status</Label>
//               <select
//                 value={furnished}
//                 onChange={(e) =>
//                   setFurnished(
//                     e.target.value as typeof furnished
//                   )
//                 }
//                 className="h-10 w-full rounded-md border bg-background px-3 text-sm"
//               >
//                 <option value="FURNISHED">Furnished</option>
//                 <option value="UNFURNISHED">
//                   Unfurnished
//                 </option>
//               </select>
//             </Field>

//             {/* Contact name */}
//             <Field>
//               <Label>Contact Name</Label>
//               <Input
//                 value={contactName}
//                 onChange={(e) =>
//                   setContactName(e.target.value)
//                 }
//               />
//             </Field>

//             {/* Contact phone */}
//             <Field>
//               <Label>Contact Phone</Label>
//               <Input
//                 type="tel"
//                 value={contactPhone}
//                 onChange={(e) =>
//                   setContactPhone(e.target.value)
//                 }
//               />
//             </Field>

//             {/* Contact email */}
//             <Field>
//               <Label>Contact Email</Label>
//               <Input
//                 type="email"
//                 value={contactEmail}
//                 onChange={(e) =>
//                   setContactEmail(e.target.value)
//                 }
//               />
//             </Field>

//             {/* Property status */}
//             <Field>
//               <Label>Property Status</Label>
//               <select
//                 value={status}
//                 onChange={(e) =>
//                   setStatus(e.target.value as typeof status)
//                 }
//                 className="h-10 w-full rounded-md border bg-background px-3 text-sm"
//               >
//                 <option value="DRAFT">Draft</option>
//                 <option value="PENDING">Pending</option>
//                 <option value="PUBLISHED">Published</option>
//                 <option value="RENTED">Rented</option>
//                 <option value="UNAVAILABLE">Unavailable</option>
//                 <option value="REJECTED">Rejected</option>
//               </select>
//             </Field>
//           </FieldGroup>

//           <DialogFooter className="mt-6">
//             <DialogClose
//               render={
//                 <Button
//                   type="button"
//                   variant="outline"
//                   disabled={isPending}
//                 >
//                   Cancel
//                 </Button>
//               }
//             />

//             <Button type="submit" disabled={isPending}>
//               {isPending ? (
//                 <>
//                   <Spinner />
//                   Updating...
//                 </>
//               ) : (
//                 "Save Changes"
//               )}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

// // "use client";

// // import { useEffect, useState } from "react";
// // import { useQueryClient } from "@tanstack/react-query";
// // import {
// //   Dialog,
// //   DialogClose,
// //   DialogContent,
// //   DialogDescription,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog";

// // import { Button } from "@/components/ui/button";
// // import { Field, FieldGroup } from "@/components/ui/field";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Textarea } from "@/components/ui/textarea";
// // import { Spinner } from "@/components/ui/spinner";
// // import { toast } from "@/components/ui/toast";
// // import { usePropertyEdit } from "@/hooks/property.hook";

// // import type { IProperty, IpropertyUpdatedPayload } from "@/types/propert.type";

// // type PropertyEditProps = {
// //   property: IProperty;
// // };

// // export function PropertyEditDialog({
// //   property,
// // }: PropertyEditProps) {
// //   const [open, setOpen] = useState(false);

// //   const [title, setTitle] = useState(property.title ?? "");
// //   const [description, setDescription] = useState(
// //     property.description ?? "",
// //   );
// //   const [rent, setRent] = useState(String(property.rent ?? ""));
// //   const [address, setAddress] = useState(property.address ?? "");
// //   const [city, setCity] = useState(property.city ?? "");
// //   const [propertyType, setPropertyType] = useState(
// //     property.propertyType ?? "APARTMENT",
// //   );

// //   const queryClient = useQueryClient();

// //   const { mutate: updateProperty, isPending } = usePropertyEdit();

// //   useEffect(() => {
// //     if (!open) return;

// //     setTitle(property.title ?? "");
// //     setDescription(property.description ?? "");
// //     setRent(String(property.rent ?? ""));
// //     setAddress(property.address ?? "");
// //     setCity(property.city ?? "");
// //     setPropertyType(property.propertyType ?? "APARTMENT");
// //   }, [open, property]);

// //   const handleSubmit = (
// //     e: React.FormEvent<HTMLFormElement>,
// //   ) => {
// //     e.preventDefault();

// //     if (
// //       !title.trim() ||
// //       !description.trim() ||
// //       !address.trim() ||
// //       !city.trim() ||
// //       rent.trim() === ""
// //     ) {
// //       toast.add({
// //         title: "Validation Error",
// //         description: "Please fill in all required fields.",
// //         type: "error",
// //       });
// //       return;
// //     }

// //     const rentNumber = Number(rent);

// //     if (!Number.isFinite(rentNumber) || rentNumber < 0) {
// //       toast.add({
// //         title: "Validation Error",
// //         description: "Please enter a valid rent amount.",
// //         type: "error",
// //       });
// //       return;
// //     }

// //     // const payload = {
// //     //   title: title.trim(),
// //     //   description: description.trim(),
// //     //   rent: rentNumber,
// //     //   address: address.trim(),
// //     //   city: city.trim(),
// //     //   propertyType,
// //     // };

// //     const payload:IpropertyUpdatedPayload = {
// //   , // image should be File | null
// //   data: {
// //     title: title.trim(),
// //     description: description.trim(),
// //     rent: Number(rent),
// //     address: address.trim(),
// //     city: city.trim(),
// //     propertyType,
// //   },
// // };
// // if (!property.id) {
// //   toast.add({
// //     title: "Error",
// //     description: "Property ID is missing.",
// //     type: "error",
// //   });

// //   return;
// // }
// //     updateProperty(
// //       {
// //         id: property.id,
// //         payload,
// //       },
// //       {
// //         onSuccess: () => {
// //           toast.add({
// //             title: "Updated Successfully",
// //             description: "Property updated successfully.",
// //             type: "success",
// //           });

// //           queryClient.invalidateQueries({
// //             queryKey: ["properties"],
// //           });

// //           queryClient.invalidateQueries({
// //             queryKey: ["property", property.id],
// //           });

// //           setOpen(false);
// //         },

// //         onError: (error) => {
// //           toast.add({
// //             title: "Update Failed",
// //             description:
// //               error instanceof Error
// //                 ? error.message
// //                 : "Something went wrong.",
// //             type: "error",
// //           });
// //         },
// //       },
// //     );
// //   };

// //   return (
// //     <Dialog open={open} onOpenChange={setOpen}>
// //       <DialogTrigger
// //         render={
// //           <Button type="button" variant="outline">
// //             Edit Property
// //           </Button>
// //         }
// //       />

// //       <DialogContent className="w-[calc(100%-2rem)] sm:max-w-lg">
// //         <form onSubmit={handleSubmit}>
// //           <DialogHeader>
// //             <DialogTitle>Edit Property</DialogTitle>
// //             <DialogDescription>
// //               Update the property information below.
// //             </DialogDescription>
// //           </DialogHeader>

// //           <FieldGroup className="mt-5">
// //             <Field>
// //               <Label htmlFor={`title-${property.id}`}>
// //                 Title
// //               </Label>
// //               <Input
// //                 id={`title-${property.id}`}
// //                 value={title}
// //                 onChange={(e) => setTitle(e.target.value)}
// //                 placeholder="Enter property title"
// //                 required
// //               />
// //             </Field>

// //             <Field>
// //               <Label htmlFor={`description-${property.id}`}>
// //                 Description
// //               </Label>
// //               <Textarea
// //                 id={`description-${property.id}`}
// //                 value={description}
// //                 onChange={(e) => setDescription(e.target.value)}
// //                 placeholder="Enter property description"
// //                 rows={4}
// //                 required
// //               />
// //             </Field>

// //             <Field>
// //               <Label htmlFor={`rent-${property.id}`}>
// //                 Monthly Rent
// //               </Label>
// //               <Input
// //                 id={`rent-${property.id}`}
// //                 type="number"
// //                 min="0"
// //                 value={rent}
// //                 onChange={(e) => setRent(e.target.value)}
// //                 required
// //               />
// //             </Field>

// //             <Field>
// //               <Label htmlFor={`address-${property.id}`}>
// //                 Address
// //               </Label>
// //               <Input
// //                 id={`address-${property.id}`}
// //                 value={address}
// //                 onChange={(e) => setAddress(e.target.value)}
// //                 required
// //               />
// //             </Field>

// //             <Field>
// //               <Label htmlFor={`city-${property.id}`}>
// //                 City
// //               </Label>
// //               <Input
// //                 id={`city-${property.id}`}
// //                 value={city}
// //                 onChange={(e) => setCity(e.target.value)}
// //                 required
// //               />
// //             </Field>

// //             <Field>
// //               <Label htmlFor={`property-type-${property.id}`}>
// //                 Property Type
// //               </Label>
// //               <select
// //                 id={`property-type-${property.id}`}
// //                 value={propertyType}
// //                 onChange={(e) => setPropertyType(e.target.value)}
// //                 className="h-10 w-full rounded-md border bg-background px-3 text-sm"
// //               >
// //                 <option value="APARTMENT">Apartment</option>
// //                 <option value="HOUSE">House</option>
// //                 <option value="SUBLET">Sublet</option>
// //                 <option value="ROOM">Room</option>
// //                 <option value="BACHELOR_ROOM">Bachelor Room</option>
// //                 <option value="FAMILY_APARTMENT">
// //                   Family Apartment
// //                 </option>
// //                 <option value="SHARED_APARTMENT">
// //                   Shared Apartment
// //                 </option>
// //                 <option value="HOSTEL">Hostel</option>
// //               </select>
// //             </Field>
// //           </FieldGroup>

// //           <DialogFooter className="mt-6">
// //             <DialogClose
// //               render={
// //                 <Button
// //                   type="button"
// //                   variant="outline"
// //                   disabled={isPending}
// //                 >
// //                   Cancel
// //                 </Button>
// //               }
// //             />

// //             <Button type="submit" disabled={isPending}>
// //               {isPending ? (
// //                 <>
// //                   <Spinner />
// //                   Updating...
// //                 </>
// //               ) : (
// //                 "Save Changes"
// //               )}
// //             </Button>
// //           </DialogFooter>
// //         </form>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // }
