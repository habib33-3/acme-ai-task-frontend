import { api } from "@/lib/axios";
import type { Task } from "@/types";
import { useQuery } from "@tanstack/react-query";

const getTask = async (id: string) => {
  const res = await api.get<{ task: Task; message: string }>(`/tasks/${id}`);

  return res.data.task;
};

const useGetSingleTask = (id: string) => {
  const query = useQuery({
    queryKey: ["tasks", id],
    queryFn: () => getTask(id),
  });

  return query;
};

export default useGetSingleTask;
