import SearchInput from "@/components/common/SearchInput";
import useApi from "@/hooks/useApi";
import useGalleryDialog from "@/state/useGalleryDialog";
import React from "react";
import apiGallery from "./api";
import FileList from "./FileList";
import FileUpload from "./FileUpload";

const File = ({ multiple, name }) => {
  const { folderId } = useGalleryDialog();
  const [search, setSearch] = React.useState("");
  const { data, isFetching, error } = useApi({
    cacheKey: apiGallery.cacheKeyFile,
    api: apiGallery.fileList,
    params: { search, folderId },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-2 h-full min-h-0">
      <div className="flex flex-col gap-2 px-4 ">
        <FileUpload folderId={folderId} />
      </div>
      <div className="h-full flex-1 flex flex-col gap-2   px-2 min-h-0">
        <div className="hidden md:block">
          <SearchInput
            placeholder="Search files..."
            value={search}
            onChange={(value) => setSearch(value)}
          />
        </div>
        <div className="h-full flex-1 overflow-y-auto flex flex-col gap-2 my-2 px-2 min-h-0">
          <FileList
            isLoading={isFetching}
            error={error}
            files={data?.data}
            selectedFolder={folderId}
            multiple={multiple}
            name={name}
          />
        </div>
      </div>
    </div>
  );
};

export default File;
