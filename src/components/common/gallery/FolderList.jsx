import useRequest from "@/hooks/useRequest";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Folder } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import apiGallery from "./api";
import useGalleryDialog from "@/state/useGalleryDialog";

const mockFolders = [
  { _id: "f1", name: "Banners & Hero Assets", createdAt: "2026-03-10" },
  { _id: "f2", name: "Destinations & Campus", createdAt: "2026-03-08" },
  { _id: "f3", name: "University Logos", createdAt: "2026-03-05" },
  { _id: "f4", name: "Student Testimonials", createdAt: "2026-02-28" },
  { _id: "f5", name: "Events & Webinars", createdAt: "2026-02-20" },
  { _id: "f6", name: "Awards & Certificates", createdAt: "2026-02-15" },
];

const FolderList = ({ folders = [], isLoading, error }) => {
  const { setFolderId } = useGalleryDialog();
  const onSelectFolder = (folder) => {
    setFolderId(folder);
  };
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 rounded-md border border-slate-100 bg-white animate-pulse">
            <div className="rounded-md bg-slate-100 w-9 h-9 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 bg-slate-100 rounded w-3/4" />
              <div className="h-2.5 bg-slate-100 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const displayFolders =
    folders && folders.length > 0 ? folders : mockFolders;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {displayFolders.map((folder) => (
        <div
          key={folder._id}
          className="flex items-center gap-3 p-2.5 rounded-md border border-slate-100 bg-white hover:border-[#1F4E8C]/40 hover:bg-[#F8F9FB]/50 cursor-pointer group transition-all duration-150 shadow-2xs hover:shadow-none min-w-0"
          onClick={() =>
            onSelectFolder({
              folderId: folder._id,
              folderName: folder.name,
            })
          }
        >
          <span className="bg-[#1F4E8C]/10 text-[#1F4E8C] group-hover:bg-[#1F4E8C] group-hover:text-white rounded-md p-2 flex items-center justify-center transition-colors">
            <Folder className="w-4 h-4" />
          </span>
          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="font-semibold truncate text-[#1F2433] group-hover:text-[#1F4E8C] text-sm">
              {folder.name}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 truncate">
              {folder.createdAt
                ? `Created: ${format(new Date(folder.createdAt), "PP")}`
                : "Folder"}
            </div>
          </div>
          <FolderDelete folderId={folder._id} />
        </div>
      ))}
    </div>
  );
};
const FolderDelete = ({ folderId }) => {
  const queryClient = useQueryClient();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { mutateAsync, isPending } = useRequest();

  const onDelete = async () => {
    await mutateAsync({
      api: apiGallery.folderDelete(folderId),
      handleDone: async () => {
        queryClient.setQueriesData(
          {
            queryKey: [apiGallery.cacheKeyFolder],
          },
          (prevData) => {
            return {
              data:
                prevData?.data?.filter((folder) => folder._id !== folderId) || [],
            };
          }
        );
        queryClient.invalidateQueries({ queryKey: [apiGallery.cacheKeyFolder] });
        setConfirmDelete(false);
      },
    });
  };

  return (
    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
      {confirmDelete ? (
        <div className="flex  gap-2 items-center flex-col justify-center">
          <div className="flex gap-2">
            <Button onClick={onDelete} disabled={isPending} size="sm">
              {isPending ? "Deleting..." : "Confirm Delete"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setConfirmDelete(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          size="icon"
          variant="destructive"
          onClick={() => setConfirmDelete(true)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default FolderList;
