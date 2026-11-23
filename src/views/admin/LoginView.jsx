"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as yup from "yup";
import useFormik from "@/hooks/useFormik";
import FormikWrapper from "@/components/common/Formik/FormikWrapper";
import FieldInput from "@/components/common/Formik/FieldInput";
import { Button } from "@/components/ui/button";
import adminConfig from "@/config/admin.config";
import adminApi from "@/lib/admin-api";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";

const loginSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export function LoginView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/admin";
  const [loading, setLoading] = useState(false);

  const form = useFormik({
    schema: loginSchema,
    defaultValues: {
      email: "admin@example.com",
      password: "password",
    },
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

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-muted/20">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          {adminConfig.brand.logo ? (
            <img
              src={adminConfig.brand.logo}
              alt={adminConfig.brand.name}
              className="w-10 h-10 object-contain mx-auto rounded"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Lock className="w-5 h-5" />
            </div>
          )}
          <h1 className="text-lg font-bold tracking-tight text-foreground">
            Sign in to {adminConfig.brand.name}
          </h1>
          <p className="text-xs text-muted-foreground">
            Enter your credentials to access the administration dashboard
          </p>
        </div>

        <FormikWrapper form={form} onSubmit={form.onSubmit} className="space-y-4">
          <FieldInput
            form={form}
            name="email"
            label="Email Address"
            placeholder="admin@example.com"
            required
            className="!h-9 !py-1.5 !px-3 !text-sm !rounded-md !border-border focus:!border-foreground focus:!ring-0"
          />

          <FieldInput
            form={form}
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            required
            className="!h-9 !py-1.5 !px-3 !text-sm !rounded-md !border-border focus:!border-foreground focus:!ring-0"
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-9 text-xs font-semibold cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </FormikWrapper>

        {adminApi.useMock && (
          <div className="rounded-md bg-muted/60 p-2.5 text-[11px] text-muted-foreground border border-border/60 text-center">
            <strong>Mock Mode Active:</strong> Use{" "}
            <code className="text-foreground">admin@example.com</code> /{" "}
            <code className="text-foreground">password</code>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginView;
