"use client";

import { useState } from "react";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useGetHomeBanner } from "@/hooks/home.banner";
import { useGetUserAll } from "@/hooks";
import { DialogUserDemo } from "@/components/form/user/user-edit";
import { UserRound } from "lucide-react";
// import { DialogDemo } from "../form/home-top-edit";



function limitWords(text = "", limit: number) {
  const words = text.trim().split(/\s+/).filter(Boolean);

  return {
    text:
      words.length > limit
        ? `${words.slice(0, limit).join(" ")}...`
        : text,
    hasMore: words.length > limit,
  };
}

export default function UserDatelsTable() {
  const { data, isLoading } = useGetUserAll();
  const userData = data?.data ?? [];

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const toggleExpanded = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">
        Loading User soon...
      </div>
    );
  }

  if (userData.length === 0) {
    return (
      <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">
        No Home Banner found. Create your first Home Banner to get started.
      </div>
    );
  }

  return (
    <div className="w-full min-w-0">
      <div className="w-full overflow-x-auto rounded-lg border">
        <Table className="min-w-[600px] md:min-w-[750px] lg:min-w-full">
          <TableHeader>
  <TableRow>
    {/* Hidden on mobile and sm */}
    <TableHead className="hidden md:table-cell md:w-[130px]">
      Image
    </TableHead>

    <TableHead className="min-w-[120px]">
      Name
    </TableHead>

    <TableHead className="min-w-[130px]">
      Email
    </TableHead>

    {/* Hidden on mobile and sm */}
    <TableHead className="hidden md:table-cell md:w-[110px] text-right">
      Actions
    </TableHead>

    <TableHead className="w-[100px] text-right">
      Details
    </TableHead>
  </TableRow>
</TableHeader>

          <TableBody>
            {userData.map((user:any) => {
              const name = user?.name ?? "";
              const email = user?.email ?? "";

              const namePreview = limitWords(name, 4);
              const emailPreview = limitWords(email, 8);

              const isExpanded = expandedId === user.id;

              return (
               <TableRow key={user.id}>
  {/* Image: visible from md */}
  <TableCell className="hidden align-top md:table-cell">
    <Dialog>
      <DialogTrigger
        className="relative block aspect-video w-28 overflow-hidden rounded-md bg-muted"
        aria-label={`Preview ${name || "User"}`}
      >
       {user?.imageUrl?.trim() ? (
  <Image
    src={user.imageUrl}
    alt={name || "User"}
    fill
    sizes="112px"
    className="object-cover"
  />
) : (
  <UserRound className="size-10 text-muted-foreground" />
)}
      </DialogTrigger>

      <DialogContent className="w-[calc(100%-2rem)] max-w-4xl p-3 sm:p-5">
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          {user?.imageUrl?.trim() ? (
  <Image
    src={user.imageUrl}
    alt={name || "User"}
    fill
    sizes="112px"
    className="object-cover"
  />
) : (
  <UserRound className="size-10 text-muted-foreground" />
)}
        </div>
      </DialogContent>
    </Dialog>
  </TableCell>

  {/* Name: visible on all devices */}
  <TableCell className="max-w-[120px] whitespace-normal break-words align-top text-xs font-medium sm:text-sm">
    {name}
  </TableCell>

  {/* Email: visible on all devices */}
  <TableCell className="max-w-[130px] whitespace-normal break-words align-top text-xs sm:text-sm">
    {email}
  </TableCell>

  {/* Actions: visible from md */}
  <TableCell className="hidden align-top text-right md:table-cell">
    <div><DialogUserDemo userData={user} key={user?.id}></DialogUserDemo></div>
  </TableCell>

  {/* Details: visible on all devices */}
  <TableCell className="align-top text-right">
    <button
      type="button"
      onClick={() => toggleExpanded(user.id)}
      className="text-xs font-semibold text-blue-600 hover:underline sm:text-sm"
    >
      {expandedId === user.id ? "Hide" : "Details"}
    </button>

    {expandedId === user.id && (
      <div className="mt-2 max-w-[120px] whitespace-normal break-words text-left text-xs text-muted-foreground">
        <p>Name: {name}</p>
        <p>Email: {email}</p>
      </div>
    )}
  </TableCell>
</TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

