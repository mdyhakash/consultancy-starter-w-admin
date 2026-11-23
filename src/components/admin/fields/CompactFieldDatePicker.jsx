import React from "react";
import FieldDatePicker from "@/components/common/Formik/FieldDatePicker";
import { cn } from "@/lib/utils";

export const CompactFieldDatePicker = ({
  form,
  name,
  label,
  placeholder = "Pick a date",
  description,
  required,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      <FieldDatePicker
        form={form}
        name={name}
        label={label}
        placeholder={placeholder}
        description={description}
        required={required}
        className={cn(
          "!h-9 !px-3 !rounded-md !text-sm !border-border focus:!border-foreground focus:!ring-0 bg-background text-foreground font-normal",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default CompactFieldDatePicker;
