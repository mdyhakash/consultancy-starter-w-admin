import React from "react";
import FormRenderer from "../FormRenderer";
import { cn } from "@/lib/utils";

export const GroupField = ({
  form,
  name,
  field,
  className,
}) => {
  const { title, description, fields = [] } = field;

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card/40 p-4 space-y-4 my-2",
        className
      )}
    >
      {(title || description) && (
        <div className="border-b border-border/70 pb-2">
          {title && <h4 className="text-sm font-semibold tracking-tight text-foreground">{title}</h4>}
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
      )}
      <FormRenderer fields={fields} prefix={`${name}.`} form={form} />
    </div>
  );
};

export default GroupField;
