"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import adminConfig from "@/config/admin.config";
import adminApi from "@/lib/admin-api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Award,
  Calendar,
  Clock,
  ExternalLink,
  FileText,
  FolderOpen,
  Images,
  Layers,
  Plus,
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
};

function getIcon(name) {
  const IconComp = iconMap[name] || Layers;
  return <IconComp className="w-4 h-4 text-primary" />;
}

function SingletonCard({ singleton }) {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "section", singleton.key],
    queryFn: () => adminApi.getSection(singleton.key),
  });

  const updatedAt = data?.updatedAt
    ? new Date(data.updatedAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Not modified yet";

  const href = singleton.key === "settings" ? "/admin/settings" : `/admin/${singleton.key}`;

  return (
    <div className="rounded-lg border border-border bg-card p-4 flex flex-col justify-between hover:border-foreground/30 transition-all shadow-2xs">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-md bg-muted/60 border border-border/60">
            {getIcon(singleton.icon)}
          </div>
          <span className="text-[11px] font-medium text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-full border border-border/40">
            {singleton.group || "Singleton"}
          </span>
        </div>

        <div>
          <h3 className="font-semibold text-sm text-foreground">{singleton.label}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
            {singleton.description || "Manage fields and content for this section."}
          </p>
        </div>
      </div>

      <div className="pt-4 mt-3 border-t border-border/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
          <Clock className="w-3 h-3" />
          {isLoading ? (
            <Skeleton className="w-16 h-3" />
          ) : (
            <span>{updatedAt}</span>
          )}
        </div>

        <Button asChild size="sm" variant="outline" className="h-7 text-xs cursor-pointer">
          <Link href={href}>Edit</Link>
        </Button>
      </div>
    </div>
  );
}

function CollectionCard({ collection }) {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "collection", collection.key, "count"],
    queryFn: () => adminApi.getCollectionList(collection.key, { limit: 1 }),
  });

  const total = data?.pagination?.total ?? 0;

  return (
    <div className="rounded-lg border border-border bg-card p-4 flex flex-col justify-between hover:border-foreground/30 transition-all shadow-2xs">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-md bg-muted/60 border border-border/60">
            {getIcon(collection.icon)}
          </div>
          <span className="text-[11px] font-medium text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-full border border-border/40">
            {collection.group || "Collection"}
          </span>
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <h3 className="font-semibold text-sm text-foreground">{collection.label}</h3>
            {isLoading ? (
              <Skeleton className="w-8 h-4" />
            ) : (
              <span className="text-xs font-bold text-primary">
                {total} {total === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
            {collection.description || "Manage records, search, and pagination."}
          </p>
        </div>
      </div>

      <div className="pt-4 mt-3 border-t border-border/60 flex items-center justify-between gap-2">
        <Button asChild size="sm" variant="outline" className="h-7 text-xs flex-1 cursor-pointer">
          <Link href={`/admin/c/${collection.key}`}>
            <FolderOpen className="w-3 h-3 mr-1" /> View List
          </Link>
        </Button>

        <Button asChild size="sm" className="h-7 text-xs cursor-pointer">
          <Link href={`/admin/c/${collection.key}/new`}>
            <Plus className="w-3 h-3 mr-0.5" /> Add
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function DashboardView() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            {adminConfig.brand.name} Control Panel
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Schema-driven CMS engine. All sections and collections are configurable via{" "}
            <code className="text-foreground bg-muted px-1 py-0.5 rounded text-[11px]">
              admin.config.js
            </code>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="h-8 text-xs cursor-pointer">
            <Link href="/admin/gallery">
              <Images className="w-3.5 h-3.5 mr-1.5" /> Media Gallery
            </Link>
          </Button>

          <Button asChild size="sm" variant="default" className="h-8 text-xs cursor-pointer">
            <a href={adminConfig.brand.siteUrl || "/"} target="_blank" rel="noreferrer">
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> View Site
            </a>
          </Button>
        </div>
      </div>

      {/* Singletons Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Singletons & Pages ({adminConfig.singletons.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminConfig.singletons.map((singleton) => (
            <SingletonCard key={singleton.key} singleton={singleton} />
          ))}
        </div>
      </div>

      {/* Collections Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Dynamic Collections ({adminConfig.collections.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminConfig.collections.map((collection) => (
            <CollectionCard key={collection.key} collection={collection} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardView;
