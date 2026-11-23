import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DeleteActionDialog from "@/components/admin/DeleteActionDialog";
import { Pencil } from "lucide-react";

/**
 * Generates table kit column definitions from collection configuration
 *
 * @param {Object} options
 * @param {Object} options.collection - Collection config object
 * @param {string} options.collectionKey - Collection route key
 * @param {Function} options.onDelete - Deletion handler callback (id, name)
 * @returns {Array} Array of column definitions
 */
export function getCollectionColumns({ collection, collectionKey, onDelete }) {
  if (!collection) return [];

  const baseCols = (collection.listColumns || []).map((col) => {
    const fieldDef = (collection.fields || []).find((f) => f.name === col.key);

    return {
      accessorKey: col.key,
      header: col.label,
      cell: ({ row }) => {
        const val = row[col.key];

        // Format boolean / toggle
        if (typeof val === "boolean" || fieldDef?.type === "toggle") {
          return val ? (
            <Badge
              variant="outline"
              className="text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-xs"
            >
              Yes
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-muted-foreground border-border text-xs"
            >
              No
            </Badge>
          );
        }

        // Format media preview
        if (fieldDef?.type === "image" || fieldDef?.type === "video") {
          const url = typeof val === "string" ? val : val?.url;
          if (!url) return <span className="text-muted-foreground text-sm">—</span>;
          return (
            <div className="size-9 rounded border border-border overflow-hidden bg-muted flex items-center justify-center">
              <img src={url} alt="thumbnail" className="w-full h-full object-cover" />
            </div>
          );
        }

        // Format empty / null
        if (val === null || val === undefined || val === "") {
          return <span className="text-muted-foreground text-sm">—</span>;
        }

        return (
          <span className="text-[15px] font-medium text-foreground">
            {String(val)}
          </span>
        );
      },
    };
  });

  // Append Action column
  baseCols.push({
    header: "Actions",
    classHeader: "w-24 text-right",
    classCell: "text-right",
    cell: ({ row }) => {
      const rowName = row.title || row.name || `item #${row.id}`;

      return (
        <div className="flex items-center justify-end gap-1">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
            title="Edit"
          >
            <Link href={`/admin/c/${collectionKey}/${row.id}`}>
              <Pencil className="size-4" />
            </Link>
          </Button>

          <DeleteActionDialog
            name={rowName}
            onDelete={async () => {
              if (onDelete) {
                await onDelete(row.id, rowName);
              }
            }}
          />
        </div>
      );
    },
  });

  return baseCols;
}

export default getCollectionColumns;
