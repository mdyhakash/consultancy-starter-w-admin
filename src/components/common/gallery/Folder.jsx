import SearchInput from "@/components/common/SearchInput";
import useApi from "@/hooks/useApi";
import { useState } from "react";
import apiGallery from "./api";
import FolderCreate from "./FolderCreate";
import FolderList from "./FolderList";

const Folder = () => {
  const [search, setSearch] = useState("");
  const { data, isFetching, error } = useApi({
    cacheKey: apiGallery.cacheKeyFolder,
    api: apiGallery.folderList,
    params: { search },
  });
  return (
    <div className="flex flex-col gap-3 h-full min-h-0">
      <div className="flex flex-col sm:flex-row gap-2.5 sm:items-center justify-between">
        <SearchInput
          placeholder="Search folders..."
          value={search}
          onChange={(value) => setSearch(value)}
          className="w-full sm:max-w-xs h-9 bg-slate-50/70"
        />
        <FolderCreate />
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
        <FolderList isLoading={isFetching} error={error} folders={data?.data} />
      </div>
    </div>
  );
};

export default Folder;
