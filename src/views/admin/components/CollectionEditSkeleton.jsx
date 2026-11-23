import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton loading state for CollectionEdit view
 */
export function CollectionEditSkeleton() {
  return (
    <div className="w-full space-y-4">
      <div className="w-full pb-2 flex justify-between items-center">
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-7 w-48" />
        </div>
        <Skeleton className="h-9 w-28" />
      </div>
      <div className="w-full rounded-xl border border-border bg-card p-4 space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}

export default CollectionEditSkeleton;
