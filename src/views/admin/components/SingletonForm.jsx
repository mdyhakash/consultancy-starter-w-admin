import React from "react";
import FormikWrapper from "@/components/common/Formik/FormikWrapper";
import FormRenderer from "@/components/admin/FormRenderer";
import SingletonHeader from "./SingletonHeader";

/**
 * Presentation Form container for Singleton view
 */
export function SingletonForm({ singleton, form, isSubmitting }) {
  return (
    <FormikWrapper form={form} onSubmit={form.onSubmit} className="w-full space-y-4">
      <SingletonHeader
        title={singleton?.label}
        description={singleton?.description}
        isDirty={form?.formState?.isDirty}
        isSubmitting={isSubmitting}
      />

      <div className="w-full rounded-xl border border-border bg-card p-4 shadow-2xs">
        <FormRenderer fields={singleton?.fields} form={form} />
      </div>
    </FormikWrapper>
  );
}

export default SingletonForm;
