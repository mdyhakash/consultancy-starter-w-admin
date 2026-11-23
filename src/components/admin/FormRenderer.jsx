"use client";

import React from "react";
import { useWatch } from "react-hook-form";
import { getFieldComponent } from "./fieldRegistry";
import { cn } from "@/lib/utils";

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

  // Determine grid span: repeaters, tabs, rich text, groups, textareas default to full width
  const isWide =
    field.colSpan === 2 ||
    ["repeater", "tabs", "group", "richtext", "textarea"].includes(field.type);

  return (
    <div
      className={cn(
        "w-full transition-all",
        isWide ? "col-span-1 md:col-span-2" : "col-span-1"
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
 * Standardizes max-w ~900px, 2-column responsive layout without nested card fatigue.
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
        "grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4 w-full max-w-[900px]",
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
