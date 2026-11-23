import React from "react";
import FormikWrapper from "@/components/common/Formik/FormikWrapper";
import FormRenderer from "@/components/admin/FormRenderer";
import CollectionEditHeader from "./CollectionEditHeader";

/**
 * Presentation Form container for CollectionEdit view
 */
export function CollectionEditForm({
  collection,
  collectionKey,
  form,
  isSubmitting,
  isNew,
  singularLabel,
}) {
  return (
    <FormikWrapper form={form} onSubmit={form.onSubmit} className="w-full space-y-4">
      <CollectionEditHeader
        collectionLabel={collection?.label}
        collectionKey={collectionKey}
        isNew={isNew}
        singularLabel={singularLabel}
        isDirty={form?.formState?.isDirty}
        isSubmitting={isSubmitting}
      />

      <div className="w-full rounded-xl border border-border bg-card p-4 shadow-2xs">
        <FormRenderer fields={collection?.fields} form={form} />
      </div>
    </FormikWrapper>
  );
}

export default CollectionEditForm;
