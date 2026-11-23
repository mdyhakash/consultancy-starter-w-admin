"use client";

import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import adminConfig from "@/config/admin.config";
import adminApi from "@/lib/admin-api";
import useSyncParams from "@/hooks/useSyncParams";
import { toast } from "sonner";
import { getCollectionColumns } from "../utils/columns";

/**
 * Custom hook containing all business logic, queries, pagination, search,
 * and row selection for CollectionListView.
 *
 * @param {Object} props
 * @param {string} props.collectionKey - Unique key of the collection
 */
export function useCollectionList({ collectionKey }) {
  const queryClient = useQueryClient();
  const { params, updateParams } = useSyncParams();

  const collection = useMemo(
    () => (adminConfig.collections || []).find((c) => c.key === collectionKey),
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
    enabled: Boolean(collection),
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

  const handleDelete = async (rowId, rowName) => {
    try {
      await adminApi.deleteCollectionItem(collectionKey, rowId);
      queryClient.invalidateQueries({
        queryKey: ["admin", "collection", collectionKey],
      });
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error(err.normalizedMessage || `Failed to delete ${rowName}`);
    }
  };

  const columns = useMemo(() => {
    return getCollectionColumns({
      collection,
      collectionKey,
      onDelete: handleDelete,
    });
  }, [collection, collectionKey]);

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

  return {
    collection,
    tableInfo,
    columns,
    search,
    notFound: !collection,
  };
}

export default useCollectionList;
