"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Check, Loader2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export const SaveBar = ({
  isDirty = false,
  isSubmitting = false,
  onDiscard,
  onSave,
  className,
}) => {
  return (
    <div
      className={cn(
        "sticky bottom-4 z-30 mx-auto w-full max-w-[900px] transition-all duration-200 mt-8",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg border border-border bg-background/95 backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-2 text-xs font-medium">
          {isDirty ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-foreground font-semibold">Unsaved changes</span>
              <span className="hidden sm:inline text-muted-foreground">
                — you have modified fields on this page
              </span>
            </>
          ) : (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-muted-foreground">All changes saved</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isDirty && onDiscard && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isSubmitting}
              onClick={onDiscard}
              className="h-8 text-xs font-medium cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1 text-muted-foreground" />
              Discard
            </Button>
          )}

          <Button
            type="submit"
            size="sm"
            disabled={!isDirty || isSubmitting}
            onClick={onSave}
            className="h-8 text-xs font-medium px-4 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                Saving...
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SaveBar;
