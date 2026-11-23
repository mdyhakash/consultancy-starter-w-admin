import React from "react";
import Editor from "@/components/common/editor/Editor";

export const CompactEditor = ({
  form,
  name,
  label,
  placeholder,
  description,
  required,
  height = 240,
  variant = "content",
  ...props
}) => {
  return (
    <div className="w-full space-y-1">
      <Editor
        form={form}
        name={name}
        label={label}
        placeholder={placeholder}
        description={description}
        required={required}
        height={height}
        variant={variant}
        {...props}
      />
    </div>
  );
};

export default CompactEditor;
