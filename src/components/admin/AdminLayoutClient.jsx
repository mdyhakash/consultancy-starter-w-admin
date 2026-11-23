"use client";

import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";

export function AdminLayoutClient({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // Login page has its own minimal layout without sidebar
  if (isLoginPage) {
    return (
      <div
        className="min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground"
        style={{ "--brand": "var(--primary)" }}
      >
        {children}
        <Toaster position="top-right" richColors />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div
        className="flex min-h-screen w-full bg-background text-foreground antialiased"
        style={{ "--brand": "var(--primary)" }}
      >
        <AdminSidebar />
        <SidebarInset className="flex flex-col flex-1 min-w-0 bg-background">
          <AdminHeader />
          <main className="flex-1 p-4 md:p-6 max-w-6xl w-full mx-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
      <Toaster position="top-right" richColors />
    </SidebarProvider>
  );
}

export default AdminLayoutClient;
