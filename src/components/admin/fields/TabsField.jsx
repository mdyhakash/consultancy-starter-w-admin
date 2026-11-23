import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormRenderer from "../FormRenderer";
import { cn } from "@/lib/utils";

export const TabsField = ({
  form,
  field,
  prefix = "",
  className,
}) => {
  const tabs = field.tabs || [];
  const defaultTab = tabs[0]?.id || "";
  const [activeTab, setActiveTab] = useState(defaultTab);

  if (!tabs.length) return null;

  return (
    <div className={cn("w-full space-y-3 my-2", className)}>
      {field.label && (
        <label className="text-sm font-semibold tracking-tight text-foreground">
          {field.label}
        </label>
      )}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start h-9 bg-muted/60 p-1 border border-border/60 rounded-md">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="text-xs font-medium px-3 h-7 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs rounded"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent
            key={tab.id}
            value={tab.id}
            className="pt-3 focus-visible:outline-hidden"
          >
            <FormRenderer fields={tab.fields || []} prefix={prefix} form={form} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TabsField;
