"use client";

import Editor from "@/components/common/editor/Editor";
import TestFrom from "@/components/common/Formik/test/test.form";
import useApi from "@/hooks/useApi";
import { FormProvider, useForm } from "react-hook-form";
export default function Home() {
  const { data, isLoading, error } = useApi({
    api: {
      method: "GET",
      endpoint: "/posts",
    },
    cacheKey: "posts",
  });

  const form = useForm({
    defaultValues: {
      title: "",
      body: "",
      content: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="container mx-auto pt-10">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((post) => (
          <Card
            className="relative mx-auto w-full max-w-sm pt-0 p-8"
            key={post.id}
          >
            <CardHeader>
              <CardAction></CardAction>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.body}</CardDescription>
            </CardHeader>
            <CardFooter></CardFooter>
          </Card>
        ))}
      </div> */}
      <TestFrom />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Editor form={form} label="Content" name="content" />
        </form>
      </FormProvider>
    </div>
  );
}
