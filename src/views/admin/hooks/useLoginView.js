"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useFormik from "@/hooks/useFormik";
import adminConfig from "@/config/admin.config";
import adminApi from "@/lib/admin-api";
import { toast } from "sonner";
import { loginSchema, loginDefaults } from "../utils/schema";

/**
 * Custom hook containing login mutation, redirects, and form handling for LoginView.
 */
export function useLoginView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/admin";
  const [loading, setLoading] = useState(false);

  const form = useFormik({
    schema: loginSchema,
    defaultValues: loginDefaults,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await adminApi.login(values);
        toast.success("Welcome back!");
        router.push(redirectUrl);
      } catch (err) {
        toast.error(err.normalizedMessage || "Invalid email or password");
      } finally {
        setLoading(false);
      }
    },
  });

  return {
    form,
    loading,
    brand: adminConfig.brand,
  };
}

export default useLoginView;
