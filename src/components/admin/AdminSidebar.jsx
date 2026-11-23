"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
import adminConfig from "@/config/admin.config";
import {
  Award,
  Calendar,
  ExternalLink,
  File,
  FileText,
  Home,
  Images,
  LayoutDashboard,
  Settings,
  Sparkles,
} from "lucide-react";

const iconMap = {
  Sparkles,
  Award,
  Settings,
  FileText,
  Calendar,
  Images,
  LayoutDashboard,
  Home,
};

function getIcon(name) {
  const IconComp = iconMap[name] || File;
  return <IconComp className="w-4 h-4 shrink-0" />;
}

export function AdminSidebar() {
  const pathname = usePathname();

  // Group singletons and collections by group
  const groupedNav = React.useMemo(() => {
    const groups = {};

    // Singletons
    (adminConfig.singletons || []).forEach((item) => {
      const g = item.group || "Pages";
      if (!groups[g]) groups[g] = [];
      groups[g].push({
        title: item.label,
        url: item.key === "settings" ? "/admin/settings" : `/admin/${item.key}`,
        icon: item.icon,
        key: item.key,
        type: "singleton",
      });
    });

    // Collections
    (adminConfig.collections || []).forEach((item) => {
      const g = item.group || "Content";
      if (!groups[g]) groups[g] = [];
      groups[g].push({
        title: item.label,
        url: `/admin/c/${item.key}`,
        icon: item.icon,
        key: item.key,
        type: "collection",
      });
    });

    return groups;
  }, []);

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="border-b border-border/80 px-4 py-3">
        <Link
          href="/admin"
          className="flex items-center gap-2.5 font-semibold text-sm tracking-tight text-foreground"
        >
          {adminConfig.brand.logo ? (
            <img
              src={adminConfig.brand.logo}
              alt={adminConfig.brand.name}
              className="w-6 h-6 object-contain rounded"
            />
          ) : (
            <div className="w-6 h-6 rounded bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
              CMS
            </div>
          )}
          <span className="truncate group-data-[collapsible=icon]:hidden">
            {adminConfig.brand.name}
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        {/* Core items */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/admin"}
                tooltip="Dashboard"
              >
                <Link href="/admin" className="flex items-center gap-2 text-xs">
                  <LayoutDashboard className="w-4 h-4 shrink-0" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith("/admin/gallery")}
                tooltip="Media Gallery"
              >
                <Link href="/admin/gallery" className="flex items-center gap-2 text-xs">
                  <Images className="w-4 h-4 shrink-0" />
                  <span>Media Gallery</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Dynamic Schema Groups */}
        {Object.entries(groupedNav).map(([groupTitle, items]) => (
          <SidebarGroup key={groupTitle} className="pt-2">
            <SidebarGroupLabel className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-2">
              {groupTitle}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const isActive =
                    pathname === item.url ||
                    (item.type === "collection" &&
                      pathname.startsWith(`/admin/c/${item.key}`));

                  return (
                    <SidebarMenuItem key={item.key}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                      >
                        <Link
                          href={item.url}
                          className="flex items-center gap-2 text-xs"
                        >
                          {getIcon(item.icon)}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-border/80 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="View Website"
            >
              <a
                href={adminConfig.brand.siteUrl || "/"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="w-4 h-4 shrink-0" />
                <span>View Website</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

export default AdminSidebar;
