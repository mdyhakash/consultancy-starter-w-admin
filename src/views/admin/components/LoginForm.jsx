import React from "react";
import FormikWrapper from "@/components/common/Formik/FormikWrapper";
import FieldInput from "@/components/common/Formik/FieldInput";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

/**
 * Presentation Form for Login view
 */
export function LoginForm({ form, loading }) {
  return (
    <FormikWrapper form={form} onSubmit={form.onSubmit} className="space-y-4">
      <FieldInput
        form={form}
        name="email"
        label="Email Address"
        placeholder="admin@example.com"
        required
        className="!h-9 !py-1.5 !px-3 !text-sm !rounded-md !border !border-border focus:!border-foreground focus:!ring-0"
      />

      <FieldInput
        form={form}
        name="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        required
        className="!h-9 !py-1.5 !px-3 !text-sm !rounded-md !border !border-border focus:!border-foreground focus:!ring-0"
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

      <div className="rounded-md bg-muted/60 p-2.5 text-[11px] text-muted-foreground text-center">
        Demo credentials: <strong>admin@example.com</strong> / <strong>password</strong>
      </div>
    </FormikWrapper>
  );
}

export default LoginForm;
