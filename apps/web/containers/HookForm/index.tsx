"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@monaco-editor/react";
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useToast,
  Toaster,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@repo/ui";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CodeEnable from "./CodeEnable";
import { useLazyQuery } from "@/app/hook";
import { serverFetch } from "@/app/action";
import { CREATE_HOOKM, LIST_HOOKM, UPDATE_HOOKM } from "@/app/queries";
import { useParams } from "next/navigation";
import lz from "lzutf8";

export const compressStringToBase64 = (json: any): string => {
  return lz.encodeBase64(lz.compress(json));
};

export const compressBase64ToString = (content: string): any => {
  return lz.decompress(lz.decodeBase64(content));
};
const formSchema = z.object({
  event: z.string({
    required_error: "Event is required",
  }),
  method: z.string({
    required_error: "Method is required",
  }),
  model: z.string().optional(),
  enableBeforeCreate: z.boolean().optional(),
  enableBeforeUpdate: z.boolean().optional(),
  enableBeforeDelete: z.boolean().optional(),
  enableAfterCreate: z.boolean().optional(),
  enableAfterUpdate: z.boolean().optional(),
  enableAfterDelete: z.boolean().optional(),
  enableBeforeGet: z.boolean().optional(),
  enableAfterGet: z.boolean().optional(),
  enableBeforeList: z.boolean().optional(),
  enableAfterList: z.boolean().optional(),
  afterCreate: z.string().optional(),
  beforeCreate: z.string().optional(),
  beforeUpdate: z.string().optional(),
  beforeDelete: z.string().optional(),
  beforeGet: z.string().optional(),
  afterGet: z.string().optional(),
  beforeList: z.string().optional(),
  afterList: z.string().optional(),
  afterDelete: z.string().optional(),
  afterUpdate: z.string().optional(),
});
const HookForm = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const [getHookm, { data, loading, error }] = useLazyQuery(serverFetch);
  const [createHookm, createHookmResponse] = useLazyQuery(serverFetch);
  const [updateHookm, updateHookmResponse] = useLazyQuery(serverFetch);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enableBeforeCreate: false,
      enableBeforeUpdate: false,
      enableBeforeDelete: false,
      enableAfterCreate: false,
      enableAfterUpdate: false,
      enableAfterDelete: false,
      enableBeforeGet: false,
      enableAfterGet: false,
      enableBeforeList: false,
      enableAfterList: false,
      afterCreate: "",
      beforeCreate: "",
      beforeUpdate: "",
      beforeDelete: "",
      beforeGet: "",
      afterGet: "",
      beforeList: "",
      afterList: "",
      afterDelete: "",
      afterUpdate: "",
    },
  });

  useEffect(() => {
    getHookm(
      LIST_HOOKM,
      {
        where: {
          model: {
            is: id,
          },
        },
      },
      {
        cache: "no-store",
      }
    );
  }, []);
  useEffect(() => {
    if (data) {
      const fetchedData = data.listHookMs.docs[0];
      form.reset({
        enableBeforeCreate: fetchedData?.enableBeforeCreate || false,
        enableBeforeUpdate: fetchedData?.enableBeforeUpdate || false,
        enableBeforeDelete: fetchedData?.enableBeforeDelete || false,
        enableAfterCreate: fetchedData?.enableAfterCreate || false,
        enableAfterUpdate: fetchedData?.enableAfterUpdate || false,
        enableAfterDelete: fetchedData?.enableAfterDelete || false,
        enableBeforeGet: fetchedData?.enableBeforeGet || false,
        enableAfterGet: fetchedData?.enableAfterGet || false,
        enableBeforeList: fetchedData?.enableBeforeList || false,
        enableAfterList: fetchedData?.enableAfterList || false,
        afterCreate: compressBase64ToString(fetchedData?.afterCreate) || "",
        beforeCreate: compressBase64ToString(fetchedData?.beforeCreate) || "",
        beforeUpdate: compressBase64ToString(fetchedData?.beforeUpdate) || "",
        beforeDelete: compressBase64ToString(fetchedData?.beforeDelete) || "",
        beforeGet: compressBase64ToString(fetchedData?.beforeGet) || "",
        afterGet: compressBase64ToString(fetchedData?.afterGet) || "",
        beforeList: compressBase64ToString(fetchedData?.beforeList) || "",
        afterList: compressBase64ToString(fetchedData?.afterList) || "",
        afterDelete: compressBase64ToString(fetchedData?.afterDelete) || "",
        afterUpdate: compressBase64ToString(fetchedData?.afterUpdate) || "",
      });
    } else if (error) {
      console.log(error, "hookmError");
    }
  }, [data, loading, error]);
  useEffect(() => {
    if (createHookmResponse?.data) {
      toast({
        title: "Hooks Created!!",
      });
    } else if (createHookmResponse?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: createHookmResponse?.error?.message,
      });
    }
  }, [
    createHookmResponse?.data,
    createHookmResponse?.loading,
    createHookmResponse?.error,
  ]);
  useEffect(() => {
    if (updateHookmResponse?.data) {
      toast({
        title: "Hooks Updated!!",
      });
    } else if (updateHookmResponse?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: updateHookmResponse?.error?.message,
      });
    }
  }, [
    updateHookmResponse?.data,
    updateHookmResponse?.loading,
    updateHookmResponse?.error,
  ]);
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (data?.listHookMs?.docs.length > 0) {
      updateHookm(
        UPDATE_HOOKM,
        {
          input: {
            afterCreate: compressStringToBase64(values?.afterCreate || ""),
            afterDelete: compressStringToBase64(values?.afterDelete || ""),
            afterGet: compressStringToBase64(values?.afterGet || ""),
            afterList: compressStringToBase64(values?.afterList || ""),
            afterUpdate: compressStringToBase64(values?.afterUpdate || ""),
            beforeCreate: compressStringToBase64(values?.beforeCreate || ""),
            beforeDelete: compressStringToBase64(values?.beforeDelete || ""),
            beforeGet: compressStringToBase64(values?.beforeGet || ""),
            beforeList: compressStringToBase64(values?.beforeList || ""),
            beforeUpdate: compressStringToBase64(values?.beforeUpdate || ""),
            enableAfterCreate: values?.enableAfterCreate,
            enableAfterDelete: values?.enableAfterDelete,
            enableAfterGet: values?.enableAfterGet,
            enableAfterList: values?.enableAfterList,
            enableAfterUpdate: values?.enableAfterUpdate,
            enableBeforeCreate: values?.enableBeforeCreate,
            enableBeforeDelete: values?.enableBeforeDelete,
            enableBeforeGet: values?.enableBeforeGet,
            enableBeforeList: values?.enableBeforeList,
            enableBeforeUpdate: values?.enableBeforeUpdate,
            id: data?.listHookMs?.docs[0].id,
          },
        },
        {
          cache: "no-store",
        }
      );
    } else {
      createHookm(
        CREATE_HOOKM,
        {
          input: {
            afterCreate: compressStringToBase64(values?.afterCreate || ""),
            afterDelete: compressStringToBase64(values?.afterDelete || ""),
            afterGet: compressStringToBase64(values?.afterGet || ""),
            afterList: compressStringToBase64(values?.afterList || ""),
            afterUpdate: compressStringToBase64(values?.afterUpdate || ""),
            beforeCreate: compressStringToBase64(values?.beforeCreate || ""),
            beforeDelete: compressStringToBase64(values?.beforeDelete || ""),
            beforeGet: compressStringToBase64(values?.beforeGet || ""),
            beforeList: compressStringToBase64(values?.beforeList || ""),
            beforeUpdate: compressStringToBase64(values?.beforeUpdate || ""),
            enableAfterCreate: values?.enableAfterCreate,
            enableAfterDelete: values?.enableAfterDelete,
            enableAfterGet: values?.enableAfterGet,
            enableAfterList: values?.enableAfterList,
            enableAfterUpdate: values?.enableAfterUpdate,
            enableBeforeCreate: values?.enableBeforeCreate,
            enableBeforeDelete: values?.enableBeforeDelete,
            enableBeforeGet: values?.enableBeforeGet,
            enableBeforeList: values?.enableBeforeList,
            enableBeforeUpdate: values?.enableBeforeUpdate,
            model: id,
          },
        },
        {
          cache: "no-store",
        }
      );
    }
  }

  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <FormField
            control={form.control}
            name="event"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select an event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Events</SelectLabel>
                        <SelectItem value="after">After</SelectItem>
                        <SelectItem value="before">Before</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="method"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Method</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select an method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Methods</SelectLabel>
                        <SelectItem value="create">Create</SelectItem>
                        <SelectItem value="update">Update</SelectItem>
                        <SelectItem value="get">Get</SelectItem>
                        <SelectItem value="list">List</SelectItem>
                        <SelectItem value="delete">Delete</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {["after", "before"].map((event: string) =>
            ["create", "delete", "update", "list", "get"].map(
              (method: string) => (
                <CodeEnable form={form} event={event} method={method} />
              )
            )
          )}
        </div>
        <div className="flex justify-center items-center">
          <Button
            type="submit"
            variant="default"
            className="flex justify-center items-center w-fit"
          >
            {"Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default HookForm;
