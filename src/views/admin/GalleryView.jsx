"use client";

import React from "react";
import Gallery from "@/components/common/gallery/Gallery";
import { Images } from "lucide-react";

export function GalleryView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <Images className="w-3.5 h-3.5" />
          <span>Media Assets</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-foreground mt-1">
          Media Gallery
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Browse, organize, and upload photos, videos, and document assets.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-2xs min-h-[600px] flex flex-col">
        <Gallery isStandalone={true} />
      </div>
    </div>
  );
}

export default GalleryView;
