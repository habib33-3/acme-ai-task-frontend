import { api } from "@/lib/axios";
import type { CreateTaskSchema } from "@/schema/create-task.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

const handleCreateTask = async (data: CreateTaskSchema) => {
  return api.post("/tasks", data);
};

const useCreateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: handleCreateTask,
    mutationKey: ["tasks"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      toast.success("Task created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

export default useCreateTask;
