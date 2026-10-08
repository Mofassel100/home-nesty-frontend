"use client";

import { useState } from "react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
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
import { Textarea } from "@/components/ui/textarea";



import { FileUp, X } from "lucide-react";

import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { useHomeTopeEdit } from "@/hooks/home.banner";

type HomeBanner = {
  id: string;
  image: string;
  title: string;
  description: string;
};

type DialogDemoProps = {
  homeData: HomeBanner;
};

export function DialogDemo({ homeData }: DialogDemoProps) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(homeData.title);
  const [description, setDescription] = useState(homeData.description);

  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(homeData.image);

  const { mutate: updateHomeBanner, isPending } = useHomeTopeEdit();
  const queryClient = useQueryClient();

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);

    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewImage(homeData.image);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.add({
        title: "Validation Error",
        description: "Title is required.",
        type: "error",
      });

      return;
    }

    if (!description.trim()) {
      toast.add({
        title: "Validation Error",
        description: "Description is required.",
        type: "error",
      });

      return;
    }

    const payload = {
      data: {
        title: title.trim(),
        description: description.trim(),
      },

      homeBanner: image,
    };

    updateHomeBanner(
      {
        id: homeData.id,
        payload,
      },
      {
        onSuccess: (res) => {
          console.log("Update response:", res);

          toast.add({
            title: "Updated Successfully",
            description: "Home banner has been updated successfully.",
            type: "success",
          })
    queryClient.invalidateQueries({ queryKey: ["homeBanner"] });
        
          setOpen(false);
        },

        onError: (error) => {
          console.error(error);

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

  const handleOpenChange = (value: boolean) => {
    setOpen(value);

    if (value) {
      setTitle(homeData.title);
      setDescription(homeData.description);
      setImage(null);
      setPreviewImage(homeData.image);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button type="button" variant="outline">
            Edit
          </Button>
        }
      />

      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              Edit Home Banner
            </DialogTitle>

            <DialogDescription>
              Update your home banner image, title and description.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-5">
            {/* IMAGE */}
            <Field>
              <Label>Home Banner Image</Label>

              <div className="space-y-3">
                <div className="relative overflow-hidden rounded-lg border">
                  <Image
                    src={previewImage}
                    alt={title || "Home banner"}
                    width={800}
                    height={400}
                    className="h-48 w-full object-cover"
                  />

                  {image && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute right-2 top-2 rounded-full bg-black/70 p-2 text-white hover:bg-black"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>

                <div>
                  <input
                    id={`banner-image-${homeData.id}`}
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
                        htmlFor={`banner-image-${homeData.id}`}
                        className="cursor-pointer"
                      />
                    }
                    nativeButton={false}
                  >
                    <FileUp className="mr-2 size-4" />
                    Change Image
                  </Button>
                </div>

                {image && (
                  <p className="text-xs text-muted-foreground">
                    Selected: {image.name}
                  </p>
                )}
              </div>
            </Field>

            {/* TITLE */}
            <Field>
              <Label htmlFor={`title-${homeData.id}`}>
                Title
              </Label>

              <Input
                id={`title-${homeData.id}`}
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter banner title"
              />
            </Field>

            {/* DESCRIPTION */}
            <Field>
              <Label htmlFor={`description-${homeData.id}`}>
                Description
              </Label>

              <Textarea
                id={`description-${homeData.id}`}
                name="description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Enter banner description"
                rows={5}
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