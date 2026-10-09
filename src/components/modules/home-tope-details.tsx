"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useGetHomeBanner } from "@/hooks/home.banner";
import Image from "next/image";
import { useState } from "react";
import { DialogDemo } from "../form/home-top-edit";

export default function HomeDatelsTable() {
  const { data, isLoading } = useGetHomeBanner();

  const homeBanner = data?.data || [];

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [expandedDescriptionId, setDesExpandedId] = useState<string | null>(null);

  const limitWords = (text: string = "", limit: number) => {
    if (!text) {
      return {
        text: "",
        hasMore: false,
      };
    }

    const words = text.trim().split(/\s+/);

    if (words.length <= limit) {
      return {
        text,
        hasMore: false,
      };
    }

    return {
      text: words.slice(0, limit).join(" ") + "...",
      hasMore: true,
    };
  };

  // Loading
  if (isLoading) {
    return (
      <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground sm:p-10">
        Loading home banners...
      </div>
    );
  }

  // Empty
  if (homeBanner.length === 0) {
    return (
      <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground sm:p-10">
        No Home Banner found. Create your first Home Banner to get started.
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 
        Responsive Grid

        Mobile  : 1
        sm      : 2
        md      : 2
        lg      : 3
        xl      : 4
      */}
      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {homeBanner.map((homeData: any) => {
          const description = homeData?.description || "";
          const title = homeData?.title || "";

          const {
            text: descriptionText,
            hasMore: descriptionHasMore,
          } = limitWords(description, 8);

          const {
            text: titleText,
            hasMore: titleHasMore,
          } = limitWords(title, 4);

          const isExpanded = expandedId === homeData.id;

          const toggleExpanded = () => {
            setExpandedId(isExpanded ? null : homeData.id);
          };

          return (
            <div
              key={homeData.id}
              className="
                group
                flex
                h-full
                flex-col
                overflow-hidden
                rounded-xl
                border
                bg-background
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-1
                hover:shadow-md
              "
            >
              {/* IMAGE */}
              <Dialog>
                <DialogTrigger
                  type="button"
                  className="
                    relative
                    block
                    aspect-video
                    w-full
                    overflow-hidden
                    border-0
                    bg-muted
                    p-0
                  "
                >
                  <Image
                    src={homeData.image}
                    alt={homeData.title || "Home banner"}
                    fill
                    sizes="
                      (max-width: 639px) 100vw,
                      (max-width: 1023px) 50vw,
                      (max-width: 1279px) 33vw,
                      25vw
                    "
                    className="
                      object-cover
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    "
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                </DialogTrigger>

                {/* IMAGE PREVIEW */}
                <DialogContent
                  className="
                    w-[calc(100%-2rem)]
                    max-w-4xl
                    overflow-hidden
                    rounded-xl
                    p-2
                    sm:p-4
                  "
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <Image
                      src={homeData.image}
                      alt={homeData.title || "Home banner"}
                      fill
                      sizes="90vw"
                      className="object-contain"
                    />
                  </div>
                </DialogContent>
              </Dialog>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col p-4">
                {/* TITLE */}
                <div className="mb-2">
                  <h3
                    className="
                      break-words
                      text-sm
                      font-semibold
                      leading-5
                      sm:text-base
                      sm:leading-6
                    "
                  >
                    {isExpanded ? title : titleText}

                    {titleHasMore && (
                      <button
                        type="button"
                        onClick={toggleExpanded}
                        className="
                          ml-1
                          inline
                          text-xs
                          font-semibold
                         
                          hover:underline
                          sm:text-sm
                        "
                      >
                        {isExpanded ?<span className=" text-red-600 font-bold">See less</span>  : <span className=" text-blue-600 font-bold">See More</span>}
                      </button>
                    )}
                  </h3>
                </div>

                {/* DESCRIPTION */}
                <div className="flex-1">
                  <p
                    className="
                      break-words
                      text-xs
                      leading-5
                      text-muted-foreground
                      sm:text-sm
                      sm:leading-6
                    "
                  >
                    {isExpanded ? description : descriptionText}

                    {descriptionHasMore && (
                      <button
                        type="button"
                        onClick={toggleExpanded}
                        className="
                          ml-1
                          inline
                          text-xs
                          font-semibold
                          text-blue-600
                          hover:underline
                          sm:text-sm
                        "
                      >
                        {isExpanded ?<span className=" text-red-600 font-bold">See less</span>  : <span className=" text-blue-600 font-bold">See More</span>}
                      </button>
                    )}
                  </p>
                </div>

                {/* FOOTER */}
                <div
                  className="
                    mt-4
                    flex
                    items-center
                    justify-end
                    border-t
                    pt-3
                  "
                >
                  <DialogDemo homeData={homeData} key={homeData.id}/>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}