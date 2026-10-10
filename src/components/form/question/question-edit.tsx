"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";

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
import { QuestionEditProps } from "@/types";
import { useQuestionEdit } from "@/hooks";





export function DialogQuestionEdit({ itemData }: QuestionEditProps) {
const [open, setOpen] = useState(false);
const [title, setTitle] = useState(itemData.title ?? "");
const [description, setDescription] = useState(
itemData.description ?? "",
);

const queryClient = useQueryClient();
const { mutate: updateItem, isPending } = useQuestionEdit();

useEffect(() => {
if (!open) return;


setTitle(itemData.title ?? "");
setDescription(itemData.description ?? "");


}, [open, itemData]);

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
event.preventDefault();


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

updateItem(
  {
    id: itemData.id,
    payload: {
      title: title.trim(),
      description: description.trim(),
    },
  },
  {
    onSuccess: () => {
      toast.add({
        title: "Updated Successfully",
        description: "Title and description updated successfully.",
        type: "success",
      });

      // Replace with the query key used by your data-fetching hook.
      queryClient.invalidateQueries({
        queryKey: ["question"],
      });

      queryClient.invalidateQueries({
        queryKey: ["question"],
      });

      setOpen(false);
    },
    onError: (error:any) => {
      toast.add({
        title: "Update Failed",
        description:
          error instanceof Error
            ? error.message
            : "Please try again.",
        type: "error",
      });
    },
  },
);


};

return ( <Dialog open={open} onOpenChange={setOpen}>
<DialogTrigger
render={ <Button type="button" variant="outline" size="sm"> <Pencil className="mr-2 size-4" />
Edit </Button>
}
/>


  <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto sm:max-w-xl">
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Edit Title and Description</DialogTitle>
        <DialogDescription>
          Update the title and description below.
        </DialogDescription>
      </DialogHeader>

      <FieldGroup className="mt-5 gap-5">
        <Field>
          <Label htmlFor={`item-title-${itemData.id}`}>
            Title
          </Label>
          <Input
            id={`item-title-${itemData.id}`}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter title"
            maxLength={200}
            required
          />
        </Field>

        <Field>
          <Label htmlFor={`item-description-${itemData.id}`}>
            Description
          </Label>
          <Textarea
            id={`item-description-${itemData.id}`}
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="Enter description"
            className="min-h-32 resize-y"
            maxLength={2000}
            required
          />
        </Field>
      </FieldGroup>

      <DialogFooter className="mt-6 flex-col gap-2 sm:flex-row">
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
          disabled={isPending || !title.trim() || !description.trim()}
        >
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
