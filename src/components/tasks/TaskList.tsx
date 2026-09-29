import useGetTasks from "@/hooks/useGetTasks";
import type { Status } from "@/types";
import TaskCard from "./TaskCard";

type Props = {
  status: Status;
};

const TaskList = ({ status }: Props) => {
  const query = useGetTasks(status);

  if (query.isLoading) {
    return <div className="text-muted-foreground text-sm">Loading...</div>;
  }

  if (query.isError) {
    return <div className="text-destructive text-sm">Error: {query.error.message}</div>;
  }

  if (!query.data) {
    return <div className="text-muted-foreground text-sm">No tasks found</div>;
  }

  const tasks = query.data.result.tasks;

  return (
    <section className="flex min-w-72 flex-1 flex-col">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide uppercase">{status}</h3>

        <span className="text-muted-foreground text-xs">{tasks.length}</span>
      </div>

      <div className="bg-muted/50 flex min-h-32 flex-col gap-3 rounded-lg p-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))
        ) : (
          <div className="text-muted-foreground flex flex-1 items-center justify-center py-8 text-sm">
            No tasks
          </div>
        )}
      </div>
    </section>
  );
};

export default TaskList;
