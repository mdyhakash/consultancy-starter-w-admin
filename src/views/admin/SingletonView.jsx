"use client";

import React, { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import adminConfig from "@/config/admin.config";
import adminApi from "@/lib/admin-api";
import useFormik from "@/hooks/useFormik";
import FormikWrapper from "@/components/common/Formik/FormikWrapper";
import FormRenderer from "@/components/admin/FormRenderer";
import SaveBar from "@/components/admin/SaveBar";
import buildYupSchema from "@/components/admin/buildYupSchema";
import useUnsavedChanges from "@/components/admin/useUnsavedChanges";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Layers } from "lucide-react";

function SingletonForm({ singleton, initialValues, sectionKey }) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = useMemo(
    () => buildYupSchema(singleton.fields),
    [singleton.fields]
  );

  const form = useFormik({
    schema,
    defaultValues: initialValues,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        await adminApi.updateSection(sectionKey, values);
        toast.success(`"${singleton.label}" saved successfully`);
        queryClient.invalidateQueries({
          queryKey: ["admin", "section", sectionKey],
        });
        // Reset form dirty state with new values
        form.reset(values);
      } catch (err) {
        toast.error(err.normalizedMessage || "Failed to save section");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  useUnsavedChanges(form.formState.isDirty);

  return (
    <FormikWrapper form={form} onSubmit={form.onSubmit} className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-2xs">
        <FormRenderer fields={singleton.fields} form={form} />
      </div>

      <SaveBar
        isDirty={form.formState.isDirty}
        isSubmitting={isSubmitting}
        onDiscard={() => form.reset(initialValues)}
      />
    </FormikWrapper>
  );
}

export function SingletonView({ sectionKey }) {
  const singleton = useMemo(
    () => adminConfig.singletons.find((s) => s.key === sectionKey),
    [sectionKey]
  );

  const { data: sectionRes, isLoading } = useQuery({
    queryKey: ["admin", "section", sectionKey],
    queryFn: () => adminApi.getSection(sectionKey),
  });

  // Extract base defaults from field definitions
  const memoizedDefaultValues = useMemo(() => {
    if (!sectionRes) return null; // Form resets when defaultValues changes identity; only provide once loaded

    const defaults = {};
    (singleton?.fields || []).forEach((field) => {
      if (field.default !== undefined) {
        defaults[field.name] = field.default;
      } else if (field.type === "repeater") {
        defaults[field.name] = [];
      } else if (field.type === "toggle") {
        defaults[field.name] = false;
      } else if (field.type === "group") {
        defaults[field.name] = {};
      }
    });

    return {
      ...defaults,
      ...(sectionRes.data || {}),
    };
  }, [sectionRes, singleton?.fields]);

  if (!singleton) {
    return (
      <div className="rounded-lg border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
        Section &quot;{sectionKey}&quot; not found in admin configuration.
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[900px] mx-auto pb-12">
      {/* Page Header */}
      <div className="border-b border-border pb-4">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>{singleton.group || "Singleton Section"}</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-foreground mt-1">
          {singleton.label}
        </h1>
        {singleton.description && (
          <p className="text-xs text-muted-foreground mt-0.5">
            {singleton.description}
          </p>
        )}
      </div>

      {isLoading || !memoizedDefaultValues ? (
        <div className="space-y-4 rounded-xl border border-border bg-card p-6">
          <Skeleton className="h-9 w-full max-w-sm" />
          <Skeleton className="h-20 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
          <Skeleton className="h-32 w-full" />
        </div>
      ) : (
        <SingletonForm
          singleton={singleton}
          initialValues={memoizedDefaultValues}
          sectionKey={sectionKey}
        />
      )}
    </div>
  );
}

export default SingletonView;
