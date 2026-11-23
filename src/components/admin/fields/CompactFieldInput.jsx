import React from "react";
import FieldInput from "@/components/common/Formik/FieldInput";
import { cn } from "@/lib/utils";

export const CompactFieldInput = ({
  form,
  name,
  label,
  placeholder,
  description,
  required,
  type = "text",
  multiline = false,
  className,
  ...props
}) => {
  const isMultiline = multiline || type === "textarea";
  const inputType = type === "textarea" ? "text" : type;

  return (
    <div className="w-full">
      <FieldInput
        form={form}
        name={name}
        label={label}
        placeholder={placeholder}
        description={description}
        required={required}
        type={inputType}
        multiline={isMultiline}
        className={cn(
          isMultiline
            ? "!min-h-[85px] !p-2.5 !text-sm !rounded-md !border-border focus:!border-foreground focus:!ring-0 bg-background text-foreground"
            : "!h-9 !py-1.5 !px-3 !text-sm !rounded-md !border-border focus:!border-foreground focus:!ring-0 focus:!ring-offset-0 bg-background text-foreground",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default CompactFieldInput;
