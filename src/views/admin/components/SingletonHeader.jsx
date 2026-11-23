import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

/**
 * Header row for Singleton view: Title, description, eyebrow, and "Save changes" Button
 */
export function SingletonHeader({
  title,
  description,
  isDirty = false,
  isSubmitting = false,
}) {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-1">
      <div>
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          SINGLETON SECTION
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground mt-0.5">
          {title}
        </h1>
        {description && (
          <p className="text-[15px] text-muted-foreground mt-0.5">
            {description}
          </p>
        )}
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
  );
}

export default SingletonHeader;
