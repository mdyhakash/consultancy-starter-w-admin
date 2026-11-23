import React from "react";
import { Button } from "../ui/button";
import getFileType from "@/lib/getFileType";
import formOptions from "@/lib/formOptions";
import { X } from "lucide-react";
import fileURL from "@/lib/fileURL";
import { cn } from "@/lib/utils";
import { useWatch } from "react-hook-form";

const getRawUrl = (file) => {
  if (!file) return null;
  if (typeof file === "string") return file;
  return file?.url || file?.path || file?.src || null;
};

const getRawName = (file) => {
  if (!file) return "";
  if (typeof file === "string") return file.split("/").pop() || "file";
  return file?.name || file?.url?.split("/")?.pop() || "file";
};

const FilePreviewItem = ({ file }) => {
  const rawUrl = getRawUrl(file);
  const name = getRawName(file);
  const fullUrl = fileURL(rawUrl);
  const type = getFileType(file);

  switch (type) {
    case "image":
      return (
        <img
          src={fullUrl}
          alt={name}
          className="w-full h-full object-contain"
        />
      );
    case "video":
      return (
        <video
          controls
          src={fullUrl}
          className="w-full h-full object-contain"
        >
          Your browser does not support the video tag.
        </video>
      );
    case "audio":
      return (
        <audio controls src={fullUrl}>
          Your browser does not support the audio tag.
        </audio>
      );
    case "pdf":
      return (
        <embed
          src={fullUrl}
          type="application/pdf"
          width="200"
          height="200"
        />
      );
    default:
      return (
        <div className="flex items-center flex-col gap-2">
          <span role="img" aria-label="file" className="text-5xl">
            📄
          </span>
          <a
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary text-sm max-w-[150px] truncate"
          >
            {name || "Download file"}
          </a>
        </div>
      );
  }
};

export const styles = {
  CONTAINER:
    "rounded-md border border-[#DCE3F0] bg-[#F8F9FB] text-[#1F2433] flex items-center justify-center h-48 w-48 relative overflow-hidden p-2 shadow-2xs group hover:border-[#1F4E8C]/40 transition-all",
};

const FilePreview = ({
  form,
  name,
  multiple,
  rootContainerClass,
  containerClass,
}) => {
  const watchedFiles = useWatch({
    control: form?.control,
    name,
  });

  const selectedFiles =
    watchedFiles !== undefined ? watchedFiles : form?.getValues?.(name);

  const hasSelected = Boolean(
    selectedFiles &&
      (Array.isArray(selectedFiles)
        ? selectedFiles.length > 0
        : selectedFiles !== "")
  );

  const isMultiple = multiple || Array.isArray(selectedFiles) || false;

  if (!hasSelected) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex gap-3 items-start flex-wrap my-3",
        rootContainerClass
      )}
    >
      {isMultiple ? (
        (Array.isArray(selectedFiles) ? selectedFiles : [selectedFiles]).map(
          (file, idx) => (
            <div
              key={
                file?.id ||
                file?._id ||
                file?.url ||
                (typeof file === "string" ? file : idx)
              }
              className={cn(styles.CONTAINER, containerClass)}
            >
              <FilePreviewItem file={file} />
              <Button
                className="absolute top-2 right-2 z-10 rounded-full h-7 w-7 bg-white/90 hover:bg-rose-50 text-slate-600 hover:text-rose-600 shadow-sm border border-slate-200 transition-colors flex items-center justify-center p-0 cursor-pointer"
                size="icon"
                variant="ghost"
                onClick={() => {
                  const list = Array.isArray(selectedFiles)
                    ? selectedFiles
                    : [selectedFiles];
                  const nextList = list.filter((_, i) => i !== idx);
                  form?.setValue(name, nextList, formOptions);
                }}
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
          )
        )
      ) : (
        <div className={cn(styles.CONTAINER, containerClass)}>
          <FilePreviewItem file={selectedFiles} />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 rounded-full h-7 w-7 bg-white/90 hover:bg-rose-50 text-slate-600 hover:text-rose-600 shadow-sm border border-slate-200 transition-colors flex items-center justify-center p-0 cursor-pointer"
            onClick={() => form?.setValue(name, null, formOptions)}
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilePreview;
