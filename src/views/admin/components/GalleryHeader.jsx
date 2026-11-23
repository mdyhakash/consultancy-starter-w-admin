import React from "react";

/**
 * Header row for GalleryView
 */
export function GalleryHeader() {
  return (
    <div className="w-full pb-1">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        MEDIA ASSETS
      </div>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground mt-0.5">
        Media Gallery
      </h1>
      <p className="text-[15px] text-muted-foreground mt-0.5">
        Browse, organize, and upload photos, videos, and document assets.
      </p>
    </div>
  );
}

export default GalleryHeader;
