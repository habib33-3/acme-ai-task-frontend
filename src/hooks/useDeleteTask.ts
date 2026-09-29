import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const handleDeleteTask = async (id: string) => {
  return api.delete(`/tasks/${id}`);
};

const useDeleteTask = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => handleDeleteTask(id),
    mutationKey: ["tasks", "delete", id],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      toast.success("Task deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting task");
    },
  });

  return mutation;
};

export default useDeleteTask;
