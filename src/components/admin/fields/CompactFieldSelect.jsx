import React from "react";
import FieldSelect from "@/components/common/Formik/FieldSelect";
import { cn } from "@/lib/utils";

export const CompactFieldSelect = ({
  form,
  name,
  label,
  placeholder = "Select an option",
  description,
  required,
  options = [],
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      <FieldSelect
        form={form}
        name={name}
        label={label}
        placeholder={placeholder}
        description={description}
        required={required}
        options={options}
        className={cn(
          "!h-9 !rounded-md !text-sm !border-border focus:!border-foreground focus:!ring-0 bg-background text-foreground",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default CompactFieldSelect;
