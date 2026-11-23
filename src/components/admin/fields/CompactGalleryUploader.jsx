import React from "react";
import FileUploaderInGallery from "@/components/common/FileUploaderInGallery";
import { cn } from "@/lib/utils";

export const CompactGalleryUploader = ({
  form,
  name,
  label,
  description,
  multiple = false,
  placeholder,
  className,
  ...props
}) => {
  return (
    <div className={cn("w-full", className)}>
      <FileUploaderInGallery
        form={form}
        name={name}
        label={label}
        description={description}
        multiple={multiple}
        placeholder={placeholder}
        btnClassName="!h-8 !px-3 !text-xs !rounded-md !border-border !bg-background !text-foreground hover:!bg-muted"
        containerClass="!w-32 !h-32 !rounded-md !border-border bg-muted/20"
        {...props}
      />
    </div>
  );
};

export default CompactGalleryUploader;
