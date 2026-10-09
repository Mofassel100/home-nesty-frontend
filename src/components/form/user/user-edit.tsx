"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { FileUp, X } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { IUpUser } from "@/types";
import { useUserEdit } from "@/hooks";


// Import UserRole and UserStatus from your actual enum file.
// Example:
// import { UserRole, UserStatus } from "@/types";

type UserData = IUpUser & {
  id: string;
};

type DialogUserDemoProps = {
  userData: UserData;
};

const roles = ["CUSTOMER", "PROVIDER",];
const statuses = ["ACTIVE", "BLOCKED", "DELETED"];

export function DialogUserDemo({
  userData,
}: DialogUserDemoProps) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(userData.name ?? "");
  const [email, setEmail] = useState(userData.email ?? "");
  const [role, setRole] = useState(userData.role ?? "CUSTOMER");
  const [status, setStatus] = useState(userData.status ?? "ACTIVE");

  const [emailVerified, setEmailVerified] = useState(
    userData.emailVerified ?? false,
  );
  const [needPasswordChange, setNeedPasswordChange] = useState(
    userData.needPasswordChange ?? false,
  );
  const [isDeleted, setIsDeleted] = useState(
    userData.isDeleted ?? false,
  );

  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    userData.imageUrl ?? null,
  );

  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending } = useUserEdit();

  // Reset the form whenever the dialog opens.
  useEffect(() => {
    if (!open) return;

    setName(userData.name ?? "");
    setEmail(userData.email ?? "");
    setRole(userData.role ?? "CUSTOMER");
    setStatus(userData.status ?? "ACTIVE");
    setEmailVerified(userData.emailVerified ?? false);
    setNeedPasswordChange(userData.needPasswordChange ?? false);
    setIsDeleted(userData.isDeleted ?? false);
    setImage(null);
    setPreviewImage(userData.imageUrl ?? null);
  }, [open, userData]);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.add({
        title: "Invalid image",
        description: "Please select a valid image file.",
        type: "error",
      });
      event.target.value = "";
      return;
    }

    // Release the previous preview URL to avoid memory leaks.
    setPreviewImage((previous) => {
      if (previous?.startsWith("blob:")) {
        URL.revokeObjectURL(previous);
      }

      return URL.createObjectURL(file);
    });

    setImage(file);
  };

  const handleRemoveImage = () => {
    setImage(null);

    setPreviewImage((previous) => {
      if (previous?.startsWith("blob:")) {
        URL.revokeObjectURL(previous);
      }

      return userData.imageUrl ?? null;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.add({
        title: "Validation Error",
        description: "Name is required.",
        type: "error",
      });
      return;
    }

    if (!email.trim()) {
      toast.add({
        title: "Validation Error",
        description: "Email is required.",
        type: "error",
      });
      return;
    }

    const data: IUpUser = {
      name: name,
      status: status as IUpUser["status"],
    //   emailVerified,
    //   needPasswordChange,
    //   isDeleted,
    };
    updateUser(
      {id: userData?.id,
        payload: {
          data,
          image,
    
        },
      },
      {
        onSuccess: () => {
          toast.add({
            title: "Updated Successfully",
            description: "User information has been updated.",
            type: "success",
          });

          // Update these keys to match your user queries.
          queryClient.invalidateQueries({ queryKey: ["user-all"] });
       

          setOpen(false);
        },

        onError: (error) => {
          toast.add({
            title: "Update Failed",
            description:
              error instanceof Error
                ? error.message
                : "Something went wrong. Please try again.",
            type: "error",
          });
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button type="button" variant="outline">
            Edit User
          </Button>
        }
      />

      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update the user's profile, role, status, and account settings.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-5">
            {/* Profile image */}
            <Field>
              <Label>Profile Image</Label>

              <div className="space-y-3">
                <div className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-lg border bg-muted">
                  {previewImage ? (
                    <Image
                      src={previewImage}
                      alt={`${name || "User"} profile`}
                      fill
                      sizes="(max-width: 640px) 100vw, 576px"
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      No profile image
                    </span>
                  )}

                  {image && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      aria-label="Remove selected image"
                      className="absolute right-2 top-2 z-10 rounded-full bg-black/70 p-2 text-white hover:bg-black"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>

                <Input
                  id={`user-image-${userData.id}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

                <Button
                  type="button"
                  variant="outline"
                  render={
                    <label
                      htmlFor={`user-image-${userData.id}`}
                      className="cursor-pointer"
                    />
                  }
                  nativeButton={false}
                >
                  <FileUp className="mr-2 size-4" />
                  Change Image
                </Button>

                {image && (
                  <p className="text-xs text-muted-foreground">
                    Selected: {image.name}
                  </p>
                )}
              </div>
            </Field>

            {/* Name */}
            <Field>
              <Label htmlFor={`user-name-${userData.id}`}>
                Name
              </Label>
              <Input
                id={`user-name-${userData.id}`}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter user name"
                required
              />
            </Field>

            {/* Email */}
            <Field>
              <Label htmlFor={`user-email-${userData.id}`}>
                Email
              </Label>
              <Input
                id={`user-email-${userData.id}`}
                type="email"
               readOnly
               defaultValue={userData?.email}
                // onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter email address"
                required
              />
            </Field>

            {/* Role */}
            <Field>
              <Label htmlFor={`user-role-${userData.id}`}>
                Role
              </Label>
              <select
                id={`user-role-${userData.id}`}
                value={role}
                onChange={(event) =>
                  setRole(event.target.value as typeof role)
                }
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              >
                {roles.map((item) => (
                  <option key={item} value={item}>
                    {item.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </Field>

            {/* Status */}
            <Field>
              <Label htmlFor={`user-status-${userData.id}`}>
                Account Status
              </Label>
              <select
                id={`user-status-${userData.id}`}
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as typeof status)
                }
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              >
                {statuses.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>

            {/* Account settings */}
            <div className="space-y-4 rounded-lg border p-4">
              <p className="text-sm font-medium">Account Settings</p>

              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={emailVerified}
                  onChange={(event) =>
                    setEmailVerified(event.target.checked)
                  }
                  className="size-4 accent-primary"
                />
                Email verified
              </label>

              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={needPasswordChange}
                  onChange={(event) =>
                    setNeedPasswordChange(event.target.checked)
                  }
                  className="size-4 accent-primary"
                />
                Require password change
              </label>

              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={isDeleted}
                  onChange={(event) =>
                    setIsDeleted(event.target.checked)
                  }
                  className="size-4 accent-primary"
                />
                Mark user as deleted
              </label>
            </div>
          </FieldGroup>

          <DialogFooter className="mt-6 gap-2">
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

