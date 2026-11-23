"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import adminConfig from "@/config/admin.config";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Calendar,
  ChevronRight,
  ExternalLink,
  File,
  FileText,
  Globe,
  HelpCircle,
  Home,
  Images,
  Info,
  Mail,
  MessageSquareQuote,
  Settings,
  ShieldAlert,
  Video,
} from "lucide-react";

const iconMap = {
  Home,
  Info,
  Briefcase,
  Globe,
  MessageSquareQuote,
  Calendar,
  FileText,
  HelpCircle,
  Video,
  Mail,
  Images,
  ShieldAlert,
  Settings,
};

function getIcon(name) {
  const IconComp = iconMap[name] || File;
  return <IconComp className="size-5 shrink-0 text-muted-foreground" />;
}

function getNodeHref(node) {
  if (node.type === "gallery" || node.key === "gallery") {
    return "/admin/gallery";
  }
  if (node.type === "collection") {
    return `/admin/c/${node.key}`;
  }
  if (node.key === "settings") {
    return "/admin/settings";
  }
  return `/admin/${node.key}`;
}

function isNodeActive(node, pathname) {
  const href = getNodeHref(node);
  if (node.type === "collection") {
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  return pathname === href;
}

function BrandLogo({ src, name }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) {
      setHasError(true);
      return;
    }
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setHasError(true);
  }, [src]);

  const initial = (name || "A").trim().charAt(0).toUpperCase();

  // If image not loaded or failed, render size-9 rounded box with first letter
  if (!isLoaded || hasError) {
    return (
      <div className="size-9 rounded-md bg-foreground text-background flex items-center justify-center text-sm font-bold shrink-0">
        {initial}
      </div>
    );
  }

  return (
    <div className="size-9 rounded-md overflow-hidden flex items-center justify-center shrink-0 bg-muted/40">
      <img
        src={src}
        alt={name || "Brand Logo"}
        onError={() => setHasError(true)}
        className="w-full h-full object-contain p-0.5"
      />
    </div>
  );
}

function NavGroupNode({ item, pathname }) {
  const isChildActive = (item.children || []).some((child) =>
    isNodeActive(child, pathname)
  );

  const [isOpen, setIsOpen] = useState(isChildActive);

  useEffect(() => {
    if (isChildActive) {
      setIsOpen(true);
    }
  }, [isChildActive, pathname]);

  return (
    <Collapsible
      asChild
      open={isOpen}
      onOpenChange={setIsOpen}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            tooltip={item.label}
            className="cursor-pointer text-base font-medium h-10 px-3 hover:bg-muted/60"
          >
            {getIcon(item.icon)}
            <span className="truncate">{item.label}</span>
            <ChevronRight className="ml-auto size-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub className="my-1 border-l-0 pl-3">
            {item.children.map((subItem) => {
              const active = isNodeActive(subItem, pathname);
              const subHref = getNodeHref(subItem);

              return (
                <SidebarMenuSubItem key={subItem.key || subItem.label}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={active}
                    className="text-[15px] h-10 rounded px-2.5 hover:bg-muted/70 transition-colors cursor-pointer data-[active=true]:bg-muted data-[active=true]:font-medium data-[active=true]:text-foreground"
                  >
                    <Link href={subHref}>
                      <span className="truncate">{subItem.label}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border bg-sidebar w-[280px]"
    >
      {/* Sidebar Header with Brand Logo & Labels */}
      <SidebarHeader className="border-b border-border/80 px-4 py-3.5">
        <div className="flex items-center gap-3">
          <BrandLogo
            src={adminConfig.brand.logo}
            name={adminConfig.brand.name}
          />
          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="font-semibold text-base text-foreground truncate leading-tight">
              {adminConfig.brand.name}
            </span>
            {adminConfig.brand.subLabel && (
              <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase leading-tight mt-0.5">
                {adminConfig.brand.subLabel}
              </span>
            )}
          </div>
        </div>
      </SidebarHeader>

      {/* Nav Tree Content */}
      <SidebarContent className="px-2 py-3 overflow-y-auto">
        <SidebarMenu className="gap-1">
          {(adminConfig.nav || []).map((node) => {
            const hasChildren =
              Array.isArray(node.children) && node.children.length > 0;

            if (hasChildren) {
              return (
                <NavGroupNode
                  key={node.label}
                  item={node}
                  pathname={pathname}
                />
              );
            }

            const active = isNodeActive(node, pathname);
            const href = getNodeHref(node);

            return (
              <SidebarMenuItem key={node.key || node.label}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  tooltip={node.label}
                  className="text-base font-medium h-10 px-3 cursor-pointer data-[active=true]:bg-muted data-[active=true]:font-medium data-[active=true]:text-foreground"
                >
                  <Link href={href} className="flex items-center gap-2.5">
                    {getIcon(node.icon)}
                    <span className="truncate">{node.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-border/80 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="View Website"
              className="text-sm text-muted-foreground hover:text-foreground cursor-pointer h-9 px-3"
            >
              <a
                href={adminConfig.brand.siteUrl || "/"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5"
              >
                <ExternalLink className="size-4 shrink-0" />
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
