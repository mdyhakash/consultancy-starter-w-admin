"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import adminConfig from "@/config/admin.config";
import adminApi from "@/lib/admin-api";
import { ExternalLink, LogOut, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

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

  // Generate breadcrumb items from pathname
  const pathSegments = pathname
    .split("/")
    .filter(Boolean)
    .filter((seg) => seg !== "admin");

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border bg-background/95 backdrop-blur-md px-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground cursor-pointer" />
        <Separator orientation="vertical" className="mr-1 h-4" />

        <Breadcrumb>
          <BreadcrumbList className="text-xs">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin">Admin</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {pathSegments.map((segment, idx) => {
              const isLast = idx === pathSegments.length - 1;
              const href = `/admin/${pathSegments.slice(0, idx + 1).join("/")}`;

              // Pretty label mapping
              let label = segment;
              if (segment === "c") return null; // Skip collection route prefix in breadcrumb
              if (segment === "new") label = "New";
              else {
                const foundSingleton = adminConfig.singletons.find(
                  (s) => s.key === segment
                );
                const foundCollection = adminConfig.collections.find(
                  (c) => c.key === segment
                );
                if (foundSingleton) label = foundSingleton.label;
                else if (foundCollection) label = foundCollection.label;
              }

              return (
                <React.Fragment key={href}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="font-medium text-foreground capitalize">
                        {label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={href} className="capitalize">
                          {label}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2">
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
