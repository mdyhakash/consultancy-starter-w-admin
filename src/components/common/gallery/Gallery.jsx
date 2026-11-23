import useGalleryDialog from "@/state/useGalleryDialog";
import { ArrowLeft, Folder as FolderIcon } from "lucide-react";
import { Button } from "../ui/button";
import File from "./File";
import Folder from "./Folder";
import { cn } from "@/lib/utils";

const Gallery = ({ multiple, name, isStandalone = false }) => {
  const { folderId, folderName, setFolderId } = useGalleryDialog();
  return (
    <div
      className={cn(
        "flex flex-col gap-3 h-full min-h-0 flex-1",
        isStandalone && "min-h-[500px]"
      )}
    >
      {!!folderId && (
        <div className="px-3.5 py-2 rounded-md border border-slate-100 bg-[#F8F9FB]/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 rounded-full border-slate-200 bg-white hover:bg-[#F8F9FB] hover:text-[#1F4E8C] cursor-pointer shadow-2xs"
              onClick={() => setFolderId({ folderId: null, folderName: "" })}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span
                className="hover:text-[#1F4E8C] cursor-pointer font-medium"
                onClick={() => setFolderId({ folderId: null, folderName: "" })}
              >
                All Folders
              </span>
              <span>/</span>
              <span className="text-[#1F2433] font-bold flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-slate-100 shadow-2xs">
                <FolderIcon className="w-3.5 h-3.5 text-[#1F4E8C]" />
                {folderName || "Current Folder"}
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 min-h-0">
        {folderId ? <File multiple={multiple} name={name} /> : <Folder />}
      </div>
    </div>
  );
};

export default Gallery;
