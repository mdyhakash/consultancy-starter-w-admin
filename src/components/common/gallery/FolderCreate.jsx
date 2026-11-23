import FieldInput from "@/components/common/Formik/FieldInput";
import { Button } from "@/components/ui/button";
import useRequest from "@/hooks/useRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormikWrapper from "@/components/common/Formik/FormikWrapper";
import apiGallery from "./api";

const formSchema = yup.object().shape({
  name: yup.string().required(),
});

const FolderCreate = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useRequest();
  const form = useForm({
    defaultValues: { name: "" },
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      await mutateAsync({
        api: apiGallery.folderCreate,
        data,
        handleDone: async (result) => {
          queryClient.setQueriesData(
            {
              queryKey: [apiGallery.cacheKeyFolder],
            },
            (prevData) => {
              return {
                data: [result.data, ...(prevData?.data || [])],
              };
            },
          );
          queryClient.invalidateQueries({ queryKey: [apiGallery.cacheKeyFolder] });
          form.reset();
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <FormikWrapper form={form} onSubmit={onSubmit}>
      <div className="flex gap-2 items-center">
        <FieldInput
          form={form}
          name="name"
          placeholder="New folder..."
          type="text"
          className="h-9 text-xs w-36 sm:w-44"
          containerClass="space-y-0"
        />
        <Button
          size="icon"
          type="submit"
          className="h-9 w-9 shrink-0 rounded-md bg-[#1B2A4E] hover:bg-[#152342] text-white cursor-pointer"
          disabled={isPending || !form.formState.isValid}
          title="Create Folder"
        >
          <Plus className="size-4 text-[#C9A15F]" />
        </Button>
      </div>
    </FormikWrapper>
  );
};

export default FolderCreate;
