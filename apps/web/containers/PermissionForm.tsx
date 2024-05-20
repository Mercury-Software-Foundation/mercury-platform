"use client";
import { serverFetch } from "@/app/action";
import { useLazyQuery } from "@/app/hook";
import {
  CREATE_PERMISSION,
  GET_MODEL,
  GET_MODEL_PERMISSIONS,
  LIST_ALL_PROFILES,
  UPDATE_PERMISSION,
} from "@/app/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useToast,
  Toaster,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Select,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectContent,
  Button,
  SelectTrigger,
  Checkbox,
} from "@repo/ui";
import { ProfileType } from "@/types";

const PermissionForm = ({
  setFieldLevelAccessFlag,
  setSelectedProfile,
  setCrudAccess,
}: {
  setFieldLevelAccessFlag: Function;
  setSelectedProfile: Function;
  setCrudAccess: Function;
}) => {
  const { toast } = useToast();
  const [edit, setEdit] = useState(false);
  const formSchema = z.object({
    modelName: z.string().optional(),
    create: z.boolean(),
    delete: z.boolean(),
    update: z.boolean(),
    read: z.boolean(),
    fieldLevelAccess: z.boolean(),
    profile: z.string().optional(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      create: false,
      delete: false,
      update: false,
      read: false,
      fieldLevelAccess: false,
    },
  });
  const [getModelPermission, { data, loading, error }] =
    useLazyQuery(serverFetch);
  const [getAllProfiles, getAllProfilesResponse] = useLazyQuery(serverFetch);
  const [getCurrentModel, getCurrentModelResponse] = useLazyQuery(serverFetch);
  const [createPermission, createPermissionResponse] =
    useLazyQuery(serverFetch);
  const [updatePermission, updatePermissionResponse] =
    useLazyQuery(serverFetch);

  const { id } = useParams();

  useEffect(() => {
    getAllProfiles(
      LIST_ALL_PROFILES,
      {
        limit: 100,
      },
      {
        cahce: "no-store",
      }
    );

    getCurrentModel(
      GET_MODEL,
      {
        where: {
          id: {
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
    if (getCurrentModelResponse.data) {
      form.setValue("modelName", getCurrentModelResponse.data?.getModel.label);
    }
    if (getCurrentModelResponse.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: getCurrentModelResponse.error?.message,
      });
    }
  }, [getCurrentModelResponse.data, getCurrentModelResponse.error]);

  useEffect(() => {
    if (getAllProfilesResponse.data) {
      if (getAllProfilesResponse.data?.listProfiles?.docs.length <= 0) {
        toast({
          variant: "destructive",
          title: "No profiles found!!",
        });
      }
    }
    if (getAllProfilesResponse.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: getAllProfilesResponse.error?.message,
      });
    }
  }, [getAllProfilesResponse.data, getAllProfilesResponse.error]);

  useEffect(() => {
    if (form.watch("profile")) {
      getModelPermission(
        GET_MODEL_PERMISSIONS,
        {
          where: {
            model: {
              is: id,
            },
            profile: {
              is: form.watch("profile"),
            },
          },
        },
        {
          cache: "no-store",
        }
      );
      setSelectedProfile(form.watch("profile"));
    }
  }, [form.watch("profile")]);

  useEffect(() => {
    if (data) {
      if (data?.listPermissions.docs.length > 0) {
        setEdit(true);
        setFieldLevelAccessFlag(data?.listPermissions.docs[0].fieldLevelAccess);
        setCrudAccess({
          create: data?.listPermissions.docs[0].create,
          update: data?.listPermissions.docs[0].update,
          delete: data?.listPermissions.docs[0].delete,
          read: data?.listPermissions.docs[0].read,
        });
        form.setValue("create", data?.listPermissions.docs[0].create);
        form.setValue("delete", data?.listPermissions.docs[0].delete);
        form.setValue(
          "fieldLevelAccess",
          data?.listPermissions.docs[0].fieldLevelAccess
        );
        form.setValue("modelName", data?.listPermissions.docs[0].model?.label); // for user experience showing label
        form.setValue("read", data?.listPermissions.docs[0].read);
        form.setValue("update", data?.listPermissions.docs[0].update);
      }
      else{
        form.setValue("create", false);
        form.setValue("delete", false);
        form.setValue(
          "fieldLevelAccess",
          false
        );
        form.setValue("read", false);
        form.setValue("update", false);
        setFieldLevelAccessFlag(false)
      }
    }
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    }
  }, [data, error, loading]);
  //////////////
  useEffect(() => {
    if (updatePermissionResponse?.data) {
      toast({
        title: "Permission Updated",
      });
      window.location.reload();
    } else if (updatePermissionResponse?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    }
  }, [
    updatePermissionResponse.data,
    updatePermissionResponse.loading,
    updatePermissionResponse?.error,
  ]);
  useEffect(() => {
    if (createPermissionResponse?.data) {
      toast({
        title: "Permission Updated",
      });
      window.location.reload();
    } else if (createPermissionResponse?.error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      });
    }
  }, [
    createPermissionResponse.data,
    createPermissionResponse.loading,
    createPermissionResponse?.error,
  ]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (edit) {
      //update query
      updatePermission(
        UPDATE_PERMISSION,
        {
          input: {
            create: values?.create,
            delete: values?.delete,
            fieldLevelAccess: values?.fieldLevelAccess,
            id: data?.listPermissions.docs[0].id,
            profile: form.watch("profile"),
            profileName: getAllProfilesResponse.data?.listProfiles?.docs.find(
              (item: ProfileType) => item.id === form.watch("profile")
            ).name,
            read: values?.read,
            update: values?.update,
          },
        },
        {
          cache: "no-store",
        }
      );
    } else {
      //create query
      createPermission(
        CREATE_PERMISSION,
        {
          input: {
            create: values?.create,
            delete: values?.delete,
            fieldLevelAccess: values?.fieldLevelAccess,
            model: id,
            modelName: getCurrentModelResponse.data?.getModel.name,
            profile: values?.profile,
            profileName: getAllProfilesResponse.data?.listProfiles?.docs.find(
              (item: ProfileType) => item.id === form.watch("profile")
            ).name,
            read: values?.read,
            update: values?.update,
          },
        },
        {
          cache: "no-store",
        }
      );
    }
  }
  return (
    <div>
      <Toaster />

      <Form {...form}>
        <Toaster />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <FormField
              control={form.control}
              name="profile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select a Profile" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Profiles</SelectLabel>
                          {getAllProfilesResponse?.data?.listProfiles.docs.map(
                            (profile: any) => (
                              <SelectItem value={profile.id}>
                                {profile.label}
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("profile") && (
              <>
                <FormField
                  control={form.control}
                  name="modelName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Model Name"
                          {...field}
                          disabled={true}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="create"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Create Access</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="read"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Read Access</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="update"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Update Access</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="delete"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Delete Access</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fieldLevelAccess"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Field Level Access</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <div className="flex justify-center items-center">
            <Button
              type="submit"
              variant="default"
              className="flex justify-center items-center w-fit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PermissionForm;
