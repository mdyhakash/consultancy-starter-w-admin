import { Button } from "@/components/ui/button";
import useRequest from "@/hooks/useRequest";
import formOptions from "@/lib/formOptions";
import getFileType from "@/lib/getFileType";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Loader, Plus, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import apiGallery from "./api";
import FormikWrapper from "@/components/common/Formik/FormikWrapper";

const fileSchema = yup.object().shape({
  galleryFiles: yup
    .array()
    .min(1, "At least one file is required")
    .max(10, "Maximum 10 files can be uploaded at a time"),
});

const FileUpload = ({ folderId }) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useRequest();
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef();

  const form = useForm({
    defaultValues: { galleryFiles: [] },
    resolver: yupResolver(fileSchema),
  });
  const { setValue, getValues } = form;
  const files = getValues("galleryFiles");
  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setValue("galleryFiles", [...files, ...droppedFiles], formOptions);
  };

  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  // Handle file input
  const handleFileChange = (e) => {
    setValue(
      "galleryFiles",
      [...files, ...Array.from(e.target.files)],
      formOptions
    );
  };

  // Remove file
  const removeFile = (idx) => {
    setValue(
      "galleryFiles",
      files.filter((_, i) => i !== idx),
      formOptions
    );
  };

  // Submit files
  const onSubmit = async (data) => {
    const formData = new FormData();
    data.galleryFiles.forEach((file) => formData.append("files", file));
    formData.append("folderId", folderId);
    try {
      await mutateAsync({
        api: apiGallery.fileUpload,
        data: formData,
        handleDone: async (result) => {
          queryClient.setQueriesData(
            {
              queryKey: [apiGallery.cacheKeyFile],
            },
            (prevData) => {
              return {
                data: [...(result.data || []), ...(prevData?.data || [])],
              };
            }
          );
          queryClient.invalidateQueries({ queryKey: [apiGallery.cacheKeyFile] });
          form.reset();
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormikWrapper form={form} onSubmit={onSubmit}>
      <div>
        <button
          type="button"
          disabled={files.length >= 10 || isPending}
          onClick={() => inputRef.current.click()}
          className={`border-2 w-full block border-dashed rounded-lg p-4 sm:p-5 text-center transition-colors relative cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
            dragActive ? "border-primary bg-primary/5" : "border-muted"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDragEnd={handleDragLeave}
        >
          <input
            type="file"
            multiple
            ref={inputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <UploadCloud className="mx-auto mb-2 w-8 h-8 text-muted-foreground" />
          <span className="mb-2 font-medium block">Drag & Drop files here</span>
          <span className="text-xs text-muted-foreground mb-3 block">
            or browse to select
          </span>
          {form.formState.errors?.galleryFiles && (
            <span className="text-xs text-brand block">
              {form.formState.errors.galleryFiles.message}
            </span>
          )}
        </button>
        <div className="my-2 flex gap-2 flex-wrap items-center">
          {files.slice(0, 10).map((file, idx) => {
            const type = getFileType(file);
            return (
              <div
                title={file.name}
                key={idx}
                className="bg-muted px-2 py-1 rounded flex items-center gap-2 text-sm min-w-0 shrink-0"
              >
                {idx + 1}.
                <span className="w-7 h-7 flex items-center justify-center rounded bg-white/70 overflow-hidden">
                  {type === "image" ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : type === "video" ? (
                    <video
                      src={URL.createObjectURL(file)}
                      className="w-full h-full object-cover"
                    />
                  ) : type === "pdf" ? (
                    <span className="text-xs font-bold text-red-600">PDF</span>
                  ) : (
                    <span className="text-lg">📄</span>
                  )}
                </span>
                <span className="truncate max-w-[80px]">{file.name}</span>
                <button
                  type="button"
                  className="ml-1 text-destructive hover:underline text-lg"
                  onClick={() => removeFile(idx)}
                  aria-label="Remove file"
                >
                  ×
                </button>
              </div>
            );
          })}
          {files.length > 10 && (
            <div className="text-sm text-muted-foreground">
              + {files.length - 10} more
            </div>
          )}
        </div>
        <Button
          className="w-full"
          disabled={isPending || !files.length}
          type="submit"
        >
          {isPending ? (
            <Loader className="animate-spin mr-1" />
          ) : (
            <Plus className="mr-1 w-4 h-4" />
          )}

          {isPending ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </FormikWrapper>
  );
};

export default FileUpload;
