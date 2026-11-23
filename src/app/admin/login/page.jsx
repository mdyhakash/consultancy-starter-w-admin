import { Suspense } from "react";
import LoginView from "@/views/admin/LoginView";

export const metadata = {
  title: "Sign In - Admin CMS",
};

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center p-4">Loading sign in...</div>}>
      <LoginView />
    </Suspense>
  );
}
