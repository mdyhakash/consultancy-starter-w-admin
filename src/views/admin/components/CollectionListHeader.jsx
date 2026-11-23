import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getSingularLabel } from "../utils/data";

/**
 * Header row for CollectionListView
 */
export function CollectionListHeader({ collection, collectionKey }) {
  const singular = getSingularLabel(collection?.label, collectionKey);

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
      <div>
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          COLLECTION RECORDS
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground mt-0.5">
          {collection?.label}
        </h1>
        {collection?.description && (
          <p className="text-[15px] text-muted-foreground mt-0.5">
            {collection?.description}
          </p>
        )}
      </div>

      <Button asChild className="h-9 px-4 text-sm font-medium cursor-pointer shrink-0">
        <Link href={`/admin/c/${collectionKey}/new`}>
          <Plus className="size-4 mr-1.5" /> New {singular}
        </Link>
      </Button>
    </div>
  );
}

export default CollectionListHeader;
