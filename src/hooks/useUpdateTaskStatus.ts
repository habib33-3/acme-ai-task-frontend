import { api } from "@/lib/axios";
import type { Status } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const updateTaskStatus = async (id: string, status: Status) => {
  return api.patch(`/tasks/status/${id}`, { status });
};

export const useUpdateTaskStatus = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status: Status) => updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Status updated");
    },
    onError: () => {
      toast.error("Error updating status");
    },
  });
};
