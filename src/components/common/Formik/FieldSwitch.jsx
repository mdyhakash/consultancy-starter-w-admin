import { Switch } from "@/components/ui/switch";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const FieldSwitch = ({
  name,
  form,
  label,
  description,
  required = false,
  className,
  disabled = false,
  onChange,
  ...props
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-1.5", className)}>
          <div className="flex items-center justify-between gap-3">
            {label && (
              <FormLabel className="text-sm font-medium leading-none cursor-pointer flex items-center gap-1">
                {label}
                {required && (
                  <span className="font-bold text-destructive">*</span>
                )}
              </FormLabel>
            )}
            <FormControl>
              <Switch
                checked={Boolean(field.value)}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  if (onChange) onChange(checked);
                }}
                disabled={disabled}
                {...props}
              />
            </FormControl>
          </div>
          {description && (
            <FormDescription className="text-xs text-muted-foreground">
              {description}
            </FormDescription>
          )}
          <FormMessage className="text-xs text-destructive" />
        </FormItem>
      )}
    />
  );
};

export default FieldSwitch;
