"use client";

import React, { useState } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  ChevronDown,
  ChevronRight,
  Copy,
  GripVertical,
  Plus,
  Trash2,
} from "lucide-react";
import FormRenderer from "../FormRenderer";
import { cn } from "@/lib/utils";

const SortableRepeaterItem = ({
  id,
  index,
  name,
  field,
  form,
  isOpen,
  onToggle,
  onDuplicate,
  onRemove,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: transform
      ? `translate3d(${Math.round(transform.x)}px, ${Math.round(transform.y)}px, 0)`
      : undefined,
    transition,
  };

  // Watch title field for preview
  const titleVal = useWatch({
    control: form.control,
    name: field.itemTitleField
      ? `${name}.${index}.${field.itemTitleField}`
      : `${name}.${index}.title`,
  });

  const previewTitle =
    titleVal && typeof titleVal === "string" && titleVal.trim()
      ? titleVal
      : `Item #${index + 1}`;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "rounded-md border border-border bg-card transition-shadow my-2",
        isDragging && "opacity-60 shadow-lg ring-1 ring-primary z-20"
      )}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-muted/40 rounded-t-md border-b border-border/60">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <button
            type="button"
            className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground p-1 rounded"
            {...attributes}
            {...listeners}
            title="Drag to reorder"
          >
            <GripVertical className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onToggle}
            className="flex items-center gap-1.5 text-xs font-semibold text-foreground truncate cursor-pointer text-left hover:underline"
          >
            {isOpen ? (
              <ChevronDown className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
            )}
            <span className="truncate">{previewTitle}</span>
          </button>
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground cursor-pointer"
            onClick={onDuplicate}
            title="Duplicate item"
          >
            <Copy className="w-3.5 h-3.5" />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-destructive cursor-pointer"
                title="Delete item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this item?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to remove &quot;{previewTitle}&quot;? This
                  change will take effect when saving.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onRemove}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Content Form */}
      {isOpen && (
        <div className="p-4 bg-background/50 rounded-b-md">
          <FormRenderer
            fields={field.fields || []}
            prefix={`${name}.${index}.`}
            form={form}
          />
        </div>
      )}
    </div>
  );
};

export const RepeaterField = ({
  form,
  name,
  field,
  className,
}) => {
  const { fields, append, remove, insert, move } = useFieldArray({
    control: form.control,
    name,
  });

  // First item open by default, rest collapsed
  const [openItems, setOpenItems] = useState(() => {
    const initial = {};
    if (fields.length > 0) {
      initial[fields[0].id] = true;
    }
    return initial;
  });

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        move(oldIndex, newIndex);
      }
    }
  };

  const handleAddItem = () => {
    const newItem = field.defaultItem ? { ...field.defaultItem } : {};
    append(newItem);
    // After next tick, open the new item
    setTimeout(() => {
      const currentValues = form.getValues(name) || [];
      const lastIndex = currentValues.length - 1;
      if (lastIndex >= 0 && fields[lastIndex]) {
        setOpenItems((prev) => ({ ...prev, [fields[lastIndex]?.id]: true }));
      }
    }, 50);
  };

  const handleDuplicate = (index) => {
    const currentValues = form.getValues(name) || [];
    const itemToClone = currentValues[index] ? JSON.parse(JSON.stringify(currentValues[index])) : {};
    insert(index + 1, itemToClone);
  };

  return (
    <div className={cn("w-full space-y-2 my-3", className)}>
      <div className="flex items-center justify-between pb-1">
        <div>
          {field.label && (
            <label className="text-sm font-semibold tracking-tight text-foreground">
              {field.label}
              {field.required && (
                <span className="text-destructive font-bold ml-0.5">*</span>
              )}
            </label>
          )}
          {field.description && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {field.description}
            </p>
          )}
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-1">
            {fields.map((item, index) => {
              // If initial openItems hasn't set it yet, default index 0 to true
              const isOpen = openItems[item.id] ?? index === 0;

              return (
                <SortableRepeaterItem
                  key={item.id}
                  id={item.id}
                  index={index}
                  name={name}
                  field={field}
                  form={form}
                  isOpen={isOpen}
                  onToggle={() => toggleItem(item.id)}
                  onDuplicate={() => handleDuplicate(index)}
                  onRemove={() => remove(index)}
                />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>

      {fields.length === 0 && (
        <div className="rounded-md border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
          No items yet. Click &quot;Add Item&quot; to create one.
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAddItem}
        className="w-full h-8 text-xs font-medium border-dashed border-border hover:bg-muted/50 cursor-pointer flex items-center justify-center gap-1.5"
      >
        <Plus className="w-3.5 h-3.5" /> Add Item
      </Button>
    </div>
  );
};

export default RepeaterField;
