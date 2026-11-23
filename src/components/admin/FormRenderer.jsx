"use client";

import React from "react";
import { useWatch } from "react-hook-form";
import { getFieldComponent } from "./fieldRegistry";
import { cn } from "@/lib/utils";

const LONG_FIELD_TYPES = new Set([
  "textarea",
  "richtext",
  "repeater",
  "group",
  "tabs",
  "image",
  "video",
  "file",
  "media",
]);

const isLongField = (field) => {
  if (field.colSpan === 2 || field.fullWidth) return true;
  if (field.multiline) return true;
  if (LONG_FIELD_TYPES.has(field.type)) return true;
  return false;
};

/**
 * FieldItem handles conditional visibility (showIf) and renders the registered component.
 */
const FieldItem = ({ field, form, prefix = "" }) => {
  const fullFieldName = `${prefix}${field.name}`;

  // Evaluate showIf condition if configured
  const showIfTarget = field.showIf
    ? `${prefix}${field.showIf.field}`
    : null;

  const watchedValue = useWatch({
    control: form.control,
    name: showIfTarget || fullFieldName,
  });

  if (field.showIf) {
    const isVisible = watchedValue === field.showIf.equals;
    if (!isVisible) return null;
  }

  const Component = getFieldComponent(field.type);
  const isWide = isLongField(field);

  return (
    <div
      className={cn(
        "w-full transition-all",
        isWide ? "col-span-full" : "col-span-1"
      )}
    >
      <Component
        form={form}
        name={fullFieldName}
        field={field}
        label={field.label}
        placeholder={field.placeholder}
        description={field.description}
        required={field.required}
        options={field.options}
        maxLength={field.maxLength}
        multiple={field.multiple}
        prefix={prefix}
        {...field}
      />
    </div>
  );
};

/**
 * FormRenderer: Schema-driven recursive form generator.
 * Responsive grid: 1 col on mobile, 2 cols on lg, long fields span full width.
 */
export const FormRenderer = ({
  fields = [],
  form,
  prefix = "",
  className,
}) => {
  if (!fields || !fields.length || !form) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-4 w-full",
        className
      )}
    >
      {fields.map((field, idx) => {
        const key = field.name ? `${prefix}${field.name}` : `field-${idx}`;
        return (
          <FieldItem
            key={key}
            field={field}
            form={form}
            prefix={prefix}
          />
        );
      })}
    </div>
  );
};

export default FormRenderer;
