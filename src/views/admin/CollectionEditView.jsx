"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function CollectionForm({ collection, initialValues, collectionKey, id, isNew }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = useMemo(
    () => buildYupSchema(collection.fields),
    [collection.fields]
  );

  const form = useFormik({
    schema,
    defaultValues: initialValues,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        if (isNew) {
          await adminApi.createCollectionItem(collectionKey, values);
          toast.success("Created successfully");
        } else {
          await adminApi.updateCollectionItem(collectionKey, id, values);
          toast.success("Saved successfully");
        }
        queryClient.invalidateQueries({
          queryKey: ["admin", "collection", collectionKey],
        });
        form.reset(values);
        router.push(`/admin/c/${collectionKey}`);
      } catch (err) {
        toast.error(err.normalizedMessage || "Failed to save record");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  useUnsavedChanges(form.formState.isDirty);

  return (
    <FormikWrapper form={form} onSubmit={form.onSubmit} className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-2xs">
        <FormRenderer fields={collection.fields} form={form} />
      </div>

      <SaveBar
        isDirty={form.formState.isDirty}
        isSubmitting={isSubmitting}
        onDiscard={() => form.reset(initialValues)}
      />
    </FormikWrapper>
  );
}

export function CollectionEditView({ collectionKey, id }) {
  const isNew = id === "new";

  const collection = useMemo(
    () => adminConfig.collections.find((c) => c.key === collectionKey),
    [collectionKey]
  );

  const { data: itemData, isLoading } = useQuery({
    queryKey: ["admin", "collection", collectionKey, id],
    queryFn: () => adminApi.getCollectionItem(collectionKey, id),
    enabled: !isNew && Boolean(id),
  });

  const memoizedDefaultValues = useMemo(() => {
    const defaults = {};
    (collection?.fields || []).forEach((field) => {
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

    if (isNew) {
      return defaults;
    }

    if (!itemData) return null; // Wait until loaded data arrives
    return {
      ...defaults,
      ...itemData,
    };
  }, [collection?.fields, isNew, itemData]);

  if (!collection) {
    return (
      <div className="rounded-lg border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
        Collection &quot;{collectionKey}&quot; not found in configuration.
      </div>
    );
  }

  const singularLabel = collection.label.replace(/s$/, "");

  return (
    <div className="space-y-6 max-w-[900px] mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="h-7 text-xs text-muted-foreground hover:text-foreground -ml-2 mb-2 gap-1"
        >
          <Link href={`/admin/c/${collectionKey}`}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back to {collection.label}
          </Link>
        </Button>

        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5" />
          <span>{collection.label}</span>
        </div>

        <h1 className="text-xl font-bold tracking-tight text-foreground mt-1">
          {isNew ? `Create New ${singularLabel}` : `Edit ${singularLabel}`}
        </h1>
      </div>

      {!isNew && (isLoading || !memoizedDefaultValues) ? (
        <div className="space-y-4 rounded-xl border border-border bg-card p-6">
          <Skeleton className="h-9 w-full max-w-sm" />
          <Skeleton className="h-24 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
      ) : (
        <CollectionForm
          collection={collection}
          initialValues={memoizedDefaultValues}
          collectionKey={collectionKey}
          id={id}
          isNew={isNew}
        />
      )}
    </div>
  );
}

export default CollectionEditView;
