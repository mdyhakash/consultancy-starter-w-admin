"use client";

import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import adminConfig from "@/config/admin.config";
import adminApi from "@/lib/admin-api";
import useFormik from "@/hooks/useFormik";
import { toast } from "sonner";
import { getSingletonSchema, getSingletonDefaults } from "../utils/schema";

/**
 * Custom hook containing all business logic, queries, and form handlers
 * for SingletonView.
 *
 * @param {Object} props
 * @param {string} props.sectionKey - Unique key of the singleton section
 */
export function useSingletonView({ sectionKey }) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const singleton = useMemo(
    () => (adminConfig.singletons || []).find((s) => s.key === sectionKey),
    [sectionKey]
  );

  const { data: sectionRes, isLoading } = useQuery({
    queryKey: ["admin", "section", sectionKey],
    queryFn: () => adminApi.getSection(sectionKey),
    enabled: Boolean(singleton),
  });

  const schema = useMemo(
    () => (singleton ? getSingletonSchema(singleton.fields) : null),
    [singleton]
  );

  const initialValues = useMemo(() => {
    if (!sectionRes || !singleton) return null;
    return getSingletonDefaults(singleton.fields, sectionRes.data);
  }, [sectionRes, singleton]);

  const form = useFormik({
    schema,
    defaultValues: initialValues,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        await adminApi.updateSection(sectionKey, values);
        toast.success("Saved successfully");
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

  return {
    singleton,
    initialValues,
    form,
    isSubmitting,
    isLoading: isLoading || !initialValues,
    notFound: !singleton,
  };
}

export default useSingletonView;
