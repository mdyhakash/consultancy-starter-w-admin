"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import adminConfig from "@/config/admin.config";
import adminApi from "@/lib/admin-api";
import useFormik from "@/hooks/useFormik";
import { toast } from "sonner";
import { getCollectionSchema, getCollectionDefaults } from "../utils/schema";
import { getSingularLabel } from "../utils/data";

/**
 * Custom hook containing all business logic, queries, and form handlers
 * for CollectionEditView.
 *
 * @param {Object} props
 * @param {string} props.collectionKey - Unique key of the collection
 * @param {string} props.id - Record ID or "new"
 */
export function useCollectionEdit({ collectionKey, id }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isNew = id === "new";

  const collection = useMemo(
    () => (adminConfig.collections || []).find((c) => c.key === collectionKey),
    [collectionKey]
  );

  const singularLabel = useMemo(
    () => getSingularLabel(collection?.label, collectionKey),
    [collection?.label, collectionKey]
  );

  const { data: itemData, isLoading } = useQuery({
    queryKey: ["admin", "collection", collectionKey, id],
    queryFn: () => adminApi.getCollectionItem(collectionKey, id),
    enabled: !isNew && Boolean(id) && Boolean(collection),
  });

  const schema = useMemo(
    () => (collection ? getCollectionSchema(collection.fields) : null),
    [collection]
  );

  const initialValues = useMemo(() => {
    if (!collection) return null;
    return getCollectionDefaults(collection.fields, itemData, isNew);
  }, [collection, itemData, isNew]);

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

  return {
    collection,
    isNew,
    singularLabel,
    form,
    isSubmitting,
    isLoading: !isNew && (isLoading || !initialValues),
    notFound: !collection,
  };
}

export default useCollectionEdit;
