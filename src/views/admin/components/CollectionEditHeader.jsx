import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

/**
 * Header row for CollectionEdit view
 */
export function CollectionEditHeader({
  collectionLabel,
  collectionKey,
  isNew,
  singularLabel,
  isDirty = false,
  isSubmitting = false,
}) {
  return (
    <div className="w-full pb-1 space-y-2">
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="h-7 text-xs text-muted-foreground hover:text-foreground -ml-2 gap-1 cursor-pointer"
      >
        <Link href={`/admin/c/${collectionKey}`}>
          <ArrowLeft className="size-3.5" /> Back to {collectionLabel}
        </Link>
      </Button>

      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {collectionLabel} ITEM
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground mt-0.5">
            {isNew ? `Create New ${singularLabel}` : `Edit ${singularLabel}`}
          </h1>
        </div>

        <Button
          type="submit"
          variant="default"
          disabled={!isDirty || isSubmitting}
          className="h-9 px-4 text-sm font-medium cursor-pointer shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </div>
    </div>
  );
}

export default CollectionEditHeader;
