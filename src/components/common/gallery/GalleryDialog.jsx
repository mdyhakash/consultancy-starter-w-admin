"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import Gallery from "./Gallery";
import { Paperclip } from "lucide-react";

const GalleryDialog = ({ placeholder, btnClassName, multiple, name }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-9 px-3.5 bg-white hover:bg-[#F8F9FB] text-[#1F4E8C] hover:text-[#153664] border border-[#1F4E8C]/30 hover:border-[#1F4E8C] font-medium rounded-md text-xs flex items-center gap-2 shadow-2xs transition-all duration-150 cursor-pointer w-fit",
            btnClassName
          )}
        >
          <Paperclip className="w-4 h-4 text-[#1F4E8C]" />{" "}
          {placeholder
            ? placeholder
            : multiple
            ? "Select files"
            : "Select file"}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[94vw] max-w-4xl sm:max-w-3xl lg:max-w-4xl h-[540px] max-h-[85vh] !flex !flex-col p-0 rounded-lg border border-slate-200/80 shadow-lg overflow-hidden bg-white">
        <DialogHeader className="p-4 sm:p-5 pb-3 border-b border-slate-100 shrink-0">
          <DialogTitle className="flex items-center gap-2 text-slate-900 font-bold text-base">
            Media Gallery
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            Select or upload files from your gallery. Use search and folder navigation to find your assets.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5">
          <Gallery multiple={multiple} name={name} />
        </div>
        <DialogFooter className="p-3 sm:px-5 border-t border-slate-100 shrink-0 flex flex-row items-center justify-between gap-2 bg-slate-50/50">
          <SelectedLength multiple={multiple} name={name} />
          <DialogClose asChild>
            <Button className="bg-[#1B2A4E] hover:bg-[#152342] text-white font-medium rounded-md px-5 h-8 text-xs transition-colors cursor-pointer">
              Done
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default memo(GalleryDialog);

const SelectedLengthContent = memo(({ control, multiple, name }) => {
  const selectedFiles = useWatch({
    control,
    name,
  });
  const isMultiple = multiple || Array.isArray(selectedFiles) || false;
  const selectedLength = isMultiple
    ? selectedFiles?.length || 0
    : selectedFiles
    ? 1
    : 0;
  return (
    <span className="text-foreground text-sm font-medium">
      Selected file(s):{" "}
      <span className="font-bold text-[#1F4E8C]">{selectedLength}</span>
    </span>
  );
});

const SelectedLength = memo(({ multiple, name }) => {
  const formContext = useFormContext();
  if (!formContext?.control || !name) {
    return null;
  }
  return (
    <SelectedLengthContent
      control={formContext.control}
      multiple={multiple}
      name={name}
    />
  );
});
