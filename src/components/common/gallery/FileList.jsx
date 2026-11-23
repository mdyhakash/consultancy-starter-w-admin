import useRequest from "@/hooks/useRequest";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Check, Copy, ExternalLink, Trash2 } from "lucide-react";
import apiGallery from "./api";
import { memo, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import getFileType from "@/lib/getFileType";
import formOptions from "@/lib/formOptions";
import fileURL from "@/lib/fileURL";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
const fileSchema = {
  id: "_id",
  name: "name",
  path: "url",
};
const fileData = (file) => ({
  id: file[fileSchema.id],
  name: file[fileSchema.name],
  url: file[fileSchema.path],
  ...file,
});

const FilePreviewThumb = memo(({ file }) => {
  const type = getFileType(file);
  const [hovered, setHovered] = useState(false);

  if (type === "image") {
    return (
      <img
        src={fileURL(file.url)}
        alt={file.name}
        className="w-12 h-12 object-cover rounded"
      />
    );
  }

  if (type === "video") {
    return (
      <div
        className="w-12 h-12 flex items-center justify-center bg-muted rounded text-lg relative overflow-hidden"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {hovered ? (
          <video
            src={fileURL(file.url)}
            className="w-12 h-12 object-cover rounded"
            muted
            autoPlay={hovered}
            style={{ background: "#eee" }}
          />
        ) : (
          <span role="img" aria-label="video" className="text-2xl">
            🎬
          </span>
        )}
      </div>
    );
  }

  if (type === "pdf") {
    return (
      <span className="w-12 h-12 flex items-center justify-center bg-muted rounded text-lg">
        PDF
      </span>
    );
  }

  return (
    <span className="w-12 h-12 flex items-center justify-center bg-muted rounded text-lg">
      📄
    </span>
  );
});
const mockFiles = [
  { _id: "m1", filename: "hero-banner-main.jpg", originalName: "hero-banner-main.jpg", path: "/novarislogo.png", size: 1024 * 240, mimeType: "image/png" },
  { _id: "m2", filename: "melbourne-campus.jpg", originalName: "melbourne-campus.jpg", path: "/novarislogo.png", size: 1024 * 380, mimeType: "image/png" },
  { _id: "m3", filename: "partner-university-badge.png", originalName: "partner-university-badge.png", path: "/novarislogo.png", size: 1024 * 95, mimeType: "image/png" },
  { _id: "m4", filename: "visa-consultation-photo.jpg", originalName: "visa-consultation-photo.jpg", path: "/novarislogo.png", size: 1024 * 510, mimeType: "image/png" },
];

const FileList = ({ files = [], isLoading, error, multiple, name }) => {
  if (isLoading) {
    return Array.from({ length: 4 }).map((_, idx) => (
      <div key={idx} className="flex items-center gap-3 p-2 rounded-md border border-slate-100 bg-white animate-pulse">
        <div className="w-10 h-10 bg-slate-100 rounded" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3.5 bg-slate-100 rounded w-1/2" />
          <div className="h-2.5 bg-slate-100 rounded w-1/4" />
        </div>
      </div>
    ));
  }
  const displayFiles = files && files.length > 0 ? files : mockFiles;
  return displayFiles.map((fileItem) => {
    const file = fileData(fileItem);
    return (
      <FileRow file={file} key={file.id} multiple={multiple} name={name} />
    );
  });
};

const FileRowView = ({
  file,
  isSelected = false,
  isFormMode = false,
  onSelectFile,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e) => {
    e.stopPropagation();
    try {
      const fullUrl = fileURL(file.url);
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      toast.success("Image URL copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  const handleOpenNewTab = (e) => {
    e.stopPropagation();
    window.open(fileURL(file.url), "_blank");
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 px-3 py-2 rounded-md border transition-all cursor-pointer group relative",
        isSelected
          ? "border-2 border-[#1F4E8C] bg-[#F8F9FB] shadow-none ring-1 ring-[#1F4E8C]/20"
          : "border-slate-200 bg-white hover:border-[#1F4E8C]/40 hover:bg-[#F8F9FB]/30"
      )}
      onClick={onSelectFile}
    >
      <div className="relative shrink-0">
        <FilePreviewThumb file={file} />
        {isSelected && (
          <div className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-[#1F4E8C] text-white rounded-full flex items-center justify-center shadow-md ring-2 ring-white">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div
          className={cn(
            "font-semibold truncate text-sm transition-colors",
            isSelected ? "text-[#1F4E8C]" : "text-[#1F2433] group-hover:text-[#1F4E8C]"
          )}
        >
          {file.name}
        </div>
        <div className="text-[11px] flex items-center gap-1.5 mt-0.5">
          {file.type ? (
            <span className="text-slate-400 font-medium">
              {file.type.toUpperCase()} •
            </span>
          ) : null}
          {isSelected ? (
            <span className="font-semibold text-[#1F4E8C] flex items-center gap-1 bg-[#1F4E8C]/10 px-1.5 py-0.5 rounded text-[10px]">
              <Check className="w-3 h-3" /> Selected
            </span>
          ) : (
            <span className="text-slate-400">
              Click {isFormMode ? "to select" : "to copy or view"}
            </span>
          )}
        </div>
      </div>

      <div
        className="flex items-center gap-1 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-slate-400 hover:text-[#1F4E8C] hover:bg-[#F8F9FB] rounded-lg"
          title="Open original"
          onClick={handleOpenNewTab}
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-slate-400 hover:text-[#1F4E8C] hover:bg-[#F8F9FB] rounded-lg"
          title="Copy link"
          onClick={handleCopyLink}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </Button>
        <FileDelete fileId={file.id} />
      </div>
    </div>
  );
};

const FileRowForm = ({ file, multiple, name, control, setValue }) => {
  const selectedFiles = useWatch({
    control,
    name,
  });

  const isMultiple = multiple || Array.isArray(selectedFiles) || false;

  const isFileMatch = (f1, f2) => {
    if (!f1 || !f2) return false;
    if (typeof f1 === "string") {
      return f1 === f2.id || f1 === f2._id || f1 === f2.url;
    }
    if (typeof f2 === "string") {
      return f2 === f1.id || f2 === f1._id || f2 === f1.url;
    }
    const id1 = f1.id || f1._id;
    const id2 = f2.id || f2._id;
    if (id1 && id2 && id1 === id2) return true;
    if (f1.url && f2.url && f1.url === f2.url) return true;
    return false;
  };

  const isSelected = selectedFiles
    ? isMultiple
      ? Array.isArray(selectedFiles) &&
        selectedFiles.some((f) => isFileMatch(f, file))
      : isFileMatch(selectedFiles, file)
    : false;

  const onSelectFile = () => {
    if (setValue) {
      if (isMultiple) {
        const currentList = Array.isArray(selectedFiles) ? selectedFiles : [];
        const nextList = isSelected
          ? currentList.filter((f) => !isFileMatch(f, file))
          : [file, ...currentList];
        setValue(name, nextList, formOptions);
      } else {
        setValue(name, isSelected ? null : file, formOptions);
      }
    }
  };

  return (
    <FileRowView
      file={file}
      isSelected={isSelected}
      isFormMode={true}
      onSelectFile={onSelectFile}
    />
  );
};

const FileRowStandalone = ({ file }) => {
  return (
    <FileRowView
      file={file}
      isSelected={false}
      isFormMode={false}
      onSelectFile={undefined}
    />
  );
};

const FileRow = ({ file, multiple, name }) => {
  const formContext = useFormContext();
  if (formContext?.control && name) {
    return (
      <FileRowForm
        file={file}
        multiple={multiple}
        name={name}
        control={formContext.control}
        setValue={formContext.setValue}
      />
    );
  }
  return <FileRowStandalone file={file} />;
};

const FileDelete = ({ fileId }) => {
  const queryClient = useQueryClient();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { mutateAsync, isPending } = useRequest();

  const onDelete = async () => {
    await mutateAsync({
      api: apiGallery.fileDelete(fileId),
      handleDone: async () => {
        queryClient.setQueriesData(
          {
            queryKey: [apiGallery.cacheKeyFile],
          },
          (prevData) => {
            return {
              data:
                prevData?.data?.filter(
                  (file) => file[fileSchema.id] !== fileId
                ) || [],
            };
          }
        );
        queryClient.invalidateQueries({ queryKey: [apiGallery.cacheKeyFile] });
        setConfirmDelete(false);
      },
    });
  };

  return (
    <span onClick={(e) => e.stopPropagation()}>
      {confirmDelete ? (
        <span className="flex gap-2 items-center">
          <Button onClick={onDelete} disabled={isPending} size="sm">
            {isPending ? "Deleting..." : "Confirm"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setConfirmDelete(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
        </span>
      ) : (
        <Button
          size="icon"
          variant="destructive"
          onClick={() => setConfirmDelete(true)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </span>
  );
};

export default FileList;
