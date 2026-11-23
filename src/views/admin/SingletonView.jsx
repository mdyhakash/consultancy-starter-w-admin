"use client";

import React from "react";
import useSingletonView from "./hooks/useSingletonView";
import SingletonForm from "./components/SingletonForm";
import SingletonSkeleton from "./components/SingletonSkeleton";

/**
 * Singleton View: Orchestrates logic hook and presentation components
 * for singleton content sections.
 */
export function SingletonView({ sectionKey }) {
  const { singleton, form, isSubmitting, isLoading, notFound } =
    useSingletonView({ sectionKey });

  if (notFound) {
    return (
      <div className="w-full rounded-lg border border-border p-12 text-center text-sm text-muted-foreground">
        Section &quot;{sectionKey}&quot; not found in admin configuration.
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {isLoading ? (
        <SingletonSkeleton />
      ) : (
        <SingletonForm
          singleton={singleton}
          form={form}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}

export default SingletonView;
