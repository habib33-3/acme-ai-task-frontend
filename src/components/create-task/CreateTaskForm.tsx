import { createTaskSchema, type CreateTaskSchema } from "@/schema/create-task.schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Priority } from "@/types";
import { DialogClose, DialogFooter } from "../ui/dialog";
import useCreateTask from "@/hooks/useCreateTask";

const CreateTaskForm = () => {
  const form = useForm<CreateTaskSchema>({
    defaultValues: {
      title: "",
      description: "",
      priority: "LOW",
    },
    resolver: zodResolver(createTaskSchema),
  });

  const { mutateAsync, isPending } = useCreateTask();

  const onSubmit = async (data: CreateTaskSchema) => {
    await mutateAsync(data);
  };

  const isLoading = isPending || form.formState.isSubmitting;

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
                className="bg-background/10"
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

                <SelectContent className="flex flex-col justify-center gap-2">
                  <SelectItem
                    className="bg-stone-300"
                    value={Priority.LOW}>
                    Low
                  </SelectItem>
                  <SelectItem
                    className="bg-stone-300"
                    value={Priority.MEDIUM}>
                    Medium
                  </SelectItem>
                  <SelectItem
                    className="bg-stone-300"
                    value={Priority.HIGH}>
                    High
                  </SelectItem>
                </SelectContent>
              </Select>

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <DialogFooter className="mt-6">
        <DialogClose
          render={
            <Button
              type="button"
              variant="outline"
            />
          }>
          {" "}
          Cancel{" "}
        </DialogClose>

        <Button
          className="mx-auto block max-w-5xl"
          type="submit"
          disabled={isPending}>
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default CreateTaskForm;
