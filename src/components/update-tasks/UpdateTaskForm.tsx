import useGetSingleTask from "@/hooks/useGetSingleTask";
import useUpdateTask from "@/hooks/useUpdateTask";
import { updateTaskSchema, type UpdateTaskSchema } from "@/schema/update-task.schema";
import { Priority } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  id: string;
  onSuccess: () => void;
};

const UpdateTaskForm = ({ id, onSuccess }: Props) => {
  const { data, status } = useGetSingleTask(id);

  const form = useForm<UpdateTaskSchema>({
    defaultValues: {
      title: "",
      description: "",
      priority: Priority.MEDIUM,
    },
    resolver: zodResolver(updateTaskSchema),
  });

  const { mutateAsync, isPending } = useUpdateTask(id);

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        description: data.description,
        priority: data.priority,
      });
    }
  }, [data, form]);

  const onSubmit = async (values: UpdateTaskSchema) => {
    await mutateAsync(values);
    onSuccess();
  };

  const isLoading = isPending || form.formState.isSubmitting;

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Something went wrong</div>;
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="bg-card/50">
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="title">Title</FieldLabel>

              <Input
                {...field}
                id="title"
                placeholder="Enter task title"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="description">Description</FieldLabel>

              <Textarea
                {...field}
                id="description"
                placeholder="Describe the task"
                rows={4}
                aria-invalid={fieldState.invalid}
              />

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="priority"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Priority</FieldLabel>

              <Select
                value={field.value}
                onValueChange={field.onChange}>
                <SelectTrigger aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value={Priority.LOW}>Low</SelectItem>

                  <SelectItem value={Priority.MEDIUM}>Medium</SelectItem>

                  <SelectItem value={Priority.HIGH}>High</SelectItem>
                </SelectContent>
              </Select>

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        disabled={isLoading}
        className="mt-6">
        {isLoading ? "Updating..." : "Update"}
      </Button>
    </form>
  );
};

export default UpdateTaskForm;
