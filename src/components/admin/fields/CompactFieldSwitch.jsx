import React from "react";
import FieldSwitch from "@/components/common/Formik/FieldSwitch";
import { cn } from "@/lib/utils";

export const CompactFieldSwitch = ({
  form,
  name,
  label,
  description,
  required,
  className,
  ...props
}) => {
  return (
    <div className={cn("w-full py-1", className)}>
      <FieldSwitch
        form={form}
        name={name}
        label={label}
        description={description}
        required={required}
        {...props}
      />
    </div>
  );
};

export default CompactFieldSwitch;
