"use client";

import React from "react";
import useLoginView from "./hooks/useLoginView";
import LoginHeader from "./components/LoginHeader";
import LoginForm from "./components/LoginForm";

/**
 * Login View: Displays authentication form
 */
export function LoginView() {
  const { form, loading, brand } = useLoginView();

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-muted/20">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-sm space-y-6">
        <LoginHeader brand={brand} />
        <LoginForm form={form} loading={loading} />
      </div>
    </div>
  );
}

export default LoginView;
