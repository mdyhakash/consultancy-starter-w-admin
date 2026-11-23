"use client";

import React from "react";
import GalleryHeader from "./components/GalleryHeader";
import Gallery from "@/components/common/gallery/Gallery";

/**
 * Gallery View: Displays standalone media asset gallery
 */
export function GalleryView() {
  return (
    <div className="w-full space-y-4">
      <GalleryHeader />
      <div className="w-full rounded-xl border border-border bg-card p-4 shadow-2xs min-h-[550px] flex flex-col">
        <Gallery isStandalone={true} />
      </div>
    </div>
  );
}

export default GalleryView;
