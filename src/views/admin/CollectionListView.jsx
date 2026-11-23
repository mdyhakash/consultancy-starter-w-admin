"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import adminConfig from "@/config/admin.config";
import adminApi from "@/lib/admin-api";
import useSyncParams from "@/hooks/useSyncParams";
import TableMaker from "@/components/common/table/TableMaker";
import TableSearch from "@/components/common/table/TableSearch";
import DeleteActionDialog from "@/components/admin/DeleteActionDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, FileText } from "lucide-react";
import { toast } from "sonner";

export function CollectionListView({ collectionKey }) {
  const queryClient = useQueryClient();
  const { params, updateParams } = useSyncParams();

  const collection = useMemo(
    () => adminConfig.collections.find((c) => c.key === collectionKey),
    [collectionKey]
  );

  const page = Math.max(1, Number(params.page || 1));
  const per_page = Math.max(1, Number(params.per_page || 10));
  const search = params.search || "";

  const queryKey = useMemo(
    () => ["admin", "collection", collectionKey, { page, per_page, search }],
    [collectionKey, page, per_page, search]
  );

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () =>
      adminApi.getCollectionList(collectionKey, {
        page,
        limit: per_page,
        search,
      }),
  });

  // Row selection state
  const [selectedRows, setSelectedRows] = useState([]);
  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };
  const handleSelectAll = (items = []) => {
    setSelectedRows(items.map((i) => i.id));
  };
  const handleUnselectAll = () => setSelectedRows([]);

  const tableInfo = useMemo(() => {
    return {
      data,
      pagination: data?.pagination || {
        page,
        per_page,
        prev_page: null,
        next_page: null,
        last_page: 1,
        total: 0,
        from: 0,
        to: 0,
      },
      routerSyncParams: updateParams,
      selectedRows,
      handleRowSelect,
      handleSelectAll,
      handleUnselectAll,
      cacheKey: queryKey,
      isLoading,
    };
  }, [data, page, per_page, updateParams, selectedRows, queryKey, isLoading]);

  // Construct dynamic columns from config
  const columns = useMemo(() => {
    if (!collection) return [];

    const baseCols = (collection.listColumns || []).map((col) => {
      const fieldDef = collection.fields.find((f) => f.name === col.key);

      return {
        accessorKey: col.key,
        header: col.label,
        cell: ({ row }) => {
          const val = row[col.key];

          // Format boolean / toggle
          if (typeof val === "boolean" || fieldDef?.type === "toggle") {
            return val ? (
              <Badge variant="outline" className="text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-[10px]">
                Yes
              </Badge>
            ) : (
              <Badge variant="outline" className="text-muted-foreground border-border text-[10px]">
                No
              </Badge>
            );
          }

          // Format media preview
          if (fieldDef?.type === "image" || fieldDef?.type === "video") {
            const url = typeof val === "string" ? val : val?.url;
            if (!url) return <span className="text-muted-foreground text-xs">—</span>;
            return (
              <div className="w-8 h-8 rounded border border-border overflow-hidden bg-muted flex items-center justify-center">
                <img src={url} alt="thumbnail" className="w-full h-full object-cover" />
              </div>
            );
          }

          // Format null/undefined
          if (val === null || val === undefined || val === "") {
            return <span className="text-muted-foreground text-xs">—</span>;
          }

          return <span className="text-xs font-medium text-foreground">{String(val)}</span>;
        },
      };
    });

    // Append Action column
    baseCols.push({
      header: "Actions",
      classHeader: "w-24 text-right",
      classCell: "text-right",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-end gap-1">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground cursor-pointer"
              title="Edit"
            >
              <Link href={`/admin/c/${collectionKey}/${row.id}`}>
                <Pencil className="w-3.5 h-3.5" />
              </Link>
            </Button>

            <DeleteActionDialog
              name={row.title || row.name || `item #${row.id}`}
              onDelete={async () => {
                await adminApi.deleteCollectionItem(collectionKey, row.id);
                queryClient.invalidateQueries({
                  queryKey: ["admin", "collection", collectionKey],
                });
                toast.success("Deleted successfully");
              }}
            />
          </div>
        );
      },
    });

    return baseCols;
  }, [collection, collectionKey, queryClient]);

  if (!collection) {
    return (
      <div className="rounded-lg border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
        Collection &quot;{collectionKey}&quot; not found in configuration.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>{collection.group || "Collection"}</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground mt-1">
            {collection.label}
          </h1>
          {collection.description && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {collection.description}
            </p>
          )}
        </div>

        <Button asChild size="sm" className="h-8 text-xs font-semibold cursor-pointer">
          <Link href={`/admin/c/${collectionKey}/new`}>
            <Plus className="w-3.5 h-3.5 mr-1" /> New {collection.label.replace(/s$/, "")}
          </Link>
        </Button>
      </div>

      {/* Toolbar & Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="w-full max-w-xs">
            <TableSearch
              tableInfo={tableInfo}
              searchTableParams={search}
              placeholder={`Search ${collection.label.toLowerCase()}...`}
              inputClassName="!h-8 !text-xs !rounded-md"
            />
          </div>
        </div>

        <TableMaker
          columns={columns}
          tableInfo={tableInfo}
          showPagination={true}
          noDataRender={() => (
            <div className="py-12 text-center">
              <p className="text-sm font-medium text-foreground">No records found</p>
              <p className="text-xs text-muted-foreground mt-1">
                {search
                  ? "Try adjusting your search query."
                  : "Create your first item to get started."}
              </p>
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default CollectionListView;
