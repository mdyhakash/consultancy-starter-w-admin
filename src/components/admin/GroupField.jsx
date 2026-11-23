import React from "react";
import FormRenderer from "./FormRenderer";
import { cn } from "@/lib/utils";

export const GroupField = ({
  form,
  name,
  field,
  className,
}) => {
  const { title, description, fields = [] } = field;

  return (
    <div className={cn("w-full space-y-4 my-2", className)}>
      {(title || description) && (
        <div className="pb-1 w-full">
          {title && (
            <h4 className="text-base font-semibold text-foreground tracking-tight">
              {title}
            </h4>
          )}
          {description && (
            <p className="text-[15px] text-muted-foreground mt-0.5">
              {description}
            </p>
          )}
        </div>
      )}
      <FormRenderer fields={fields} prefix={`${name}.`} form={form} />
    </div>
  );
};

export default GroupField;
