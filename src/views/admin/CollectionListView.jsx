"use client";

import React from "react";
import useCollectionList from "./hooks/useCollectionList";
import CollectionListHeader from "./components/CollectionListHeader";
import TableMaker from "@/components/common/table/TableMaker";
import TableSearch from "@/components/common/table/TableSearch";

/**
 * Collection List View: Orchestrates logic hook, table kit, and header presentation
 * for browsing, searching, and managing collection records.
 */
export function CollectionListView({ collectionKey }) {
  const { collection, tableInfo, columns, search, notFound } =
    useCollectionList({ collectionKey });

  if (notFound) {
    return (
      <div className="w-full rounded-lg border border-border p-12 text-center text-sm text-muted-foreground">
        Collection &quot;{collectionKey}&quot; not found in configuration.
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <CollectionListHeader
        collection={collection}
        collectionKey={collectionKey}
      />

      <div className="w-full space-y-4">
        <div className="w-full sm:w-72">
          <TableSearch
            tableInfo={tableInfo}
            searchTableParams={search}
            placeholder={`Search ${collection?.label?.toLowerCase() || "records"}...`}
            inputClassName="!h-9 !text-sm !rounded-md"
          />
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
