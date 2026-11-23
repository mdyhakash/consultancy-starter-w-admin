"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import adminConfig from "@/config/admin.config";
import adminApi from "@/lib/admin-api";
import { ExternalLink, LogOut, Loader2 } from "lucide-react";
import { toast } from "sonner";

function getPageTitle(pathname) {
  if (pathname === "/admin/gallery") return "Media Gallery";
  if (pathname === "/admin/settings") return "Global Settings";

  if (pathname.startsWith("/admin/c/")) {
    const parts = pathname.replace("/admin/c/", "").split("/").filter(Boolean);
    const collectionKey = parts[0];
    const subAction = parts[1];

    const collection = (adminConfig.collections || []).find(
      (c) => c.key === collectionKey
    );
    const singularName =
      collection?.label?.replace(/s$/, "") || collectionKey;

    if (subAction === "new") return `New ${singularName}`;
    if (subAction) return `Edit ${singularName}`;
    return collection?.label || collectionKey;
  }

  const singletonKey = pathname.replace("/admin/", "").split("/")[0];
  const singleton = (adminConfig.singletons || []).find(
    (s) => s.key === singletonKey
  );
  if (singleton) return singleton.label;

  return "Admin Panel";
}

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const pageTitle = getPageTitle(pathname);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await adminApi.logout();
      toast.success("Logged out successfully");
      router.push("/admin/login");
    } catch (e) {
      toast.error(e.normalizedMessage || "Failed to log out");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border bg-background/95 backdrop-blur-md px-4 w-full">
      {/* Left: Sidebar trigger + ADMIN badge + Page Title */}
      <div className="flex items-center gap-2.5 min-w-0">
        <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground cursor-pointer" />
        <Separator orientation="vertical" className="h-4" />

        <div className="flex items-center gap-2 min-w-0">
          <span className="shrink-0 px-2 py-0.5 rounded text-sm font-medium tracking-wide uppercase bg-muted text-foreground">
            ADMIN
          </span>
          <span className="text-sm font-medium text-foreground truncate">
            {pageTitle}
          </span>
        </div>
      </div>

      {/* Right: View Website + Logout */}
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="h-8 text-xs text-muted-foreground hover:text-foreground gap-1.5 cursor-pointer"
        >
          <a
            href={adminConfig.brand.siteUrl || "/"}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Website</span>
          </a>
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={loggingOut}
          onClick={handleLogout}
          className="h-8 text-xs text-muted-foreground hover:text-destructive hover:border-destructive/40 gap-1.5 cursor-pointer"
        >
          {loggingOut ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <LogOut className="w-3.5 h-3.5" />
          )}
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
