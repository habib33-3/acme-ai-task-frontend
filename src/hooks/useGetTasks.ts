import { api } from "@/lib/axios";
import type { Priority, Status, Task } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

type Result = {
  result: {
    tasks: Task[];
    pagination: {
      page: number;
      limit: number;
      count: number;
      totalPages: number;
    };
  };
};

const getTasks = async ({
  search,
  page,
  limit,
  priority,
  status,
}: {
  search?: string;
  page: number;
  limit: number;
  priority?: Priority;
  status?: Status;
}) => {
  const res = await api.get<Result>("/tasks", {
    params: {
      search,
      page,
      limit,
      priority,
      status,
    },
  });

  return res.data;
};

const useGetTasks = (status: Status) => {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [search] = useQueryState("search", parseAsString);
  const [priority] = useQueryState("priority", parseAsString);

  return useQuery({
    queryKey: ["tasks", { search, page, priority, status }],
    queryFn: () =>
      getTasks({
        search: search || undefined,
        page,
        limit,
        priority: priority as Priority | undefined,
        status,
      }),
  });
};

export default useGetTasks;
