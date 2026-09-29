import { api } from "@/lib/axios";
import type { UpdateTaskSchema } from "@/schema/update-task.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const handleUpdateTask = async (id: string, data: UpdateTaskSchema) => {
  return api.patch(`/tasks/${id}`, data);
};

const useUpdateTask = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["tasks", "update", id],

    mutationFn: (data: UpdateTaskSchema) => handleUpdateTask(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["tasks", id],
      });

      toast.success("Task updated successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useUpdateTask;
