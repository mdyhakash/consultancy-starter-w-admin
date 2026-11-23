"use client";

import React from "react";
import useCollectionEdit from "./hooks/useCollectionEdit";
import CollectionEditForm from "./components/CollectionEditForm";
import CollectionEditSkeleton from "./components/CollectionEditSkeleton";

/**
 * Collection Edit View: Orchestrates logic hook and presentation components
 * for creating and updating collection items.
 */
export function CollectionEditView({ collectionKey, id }) {
  const {
    collection,
    form,
    isSubmitting,
    isLoading,
    isNew,
    singularLabel,
    notFound,
  } = useCollectionEdit({ collectionKey, id });

  if (notFound) {
    return (
      <div className="w-full rounded-lg border border-border p-12 text-center text-sm text-muted-foreground">
        Collection &quot;{collectionKey}&quot; not found in configuration.
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {isLoading ? (
        <CollectionEditSkeleton />
      ) : (
        <CollectionEditForm
          collection={collection}
          collectionKey={collectionKey}
          form={form}
          isSubmitting={isSubmitting}
          isNew={isNew}
          singularLabel={singularLabel}
        />
      )}
    </div>
  );
}

export default CollectionEditView;
