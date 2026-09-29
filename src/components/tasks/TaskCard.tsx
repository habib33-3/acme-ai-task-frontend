import { Status, type Task } from "@/types";
import DeleteTaskDialog from "../DeleteTaskDialog";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import UpdateTaskDialog from "../update-tasks/UpdateTaskDialog";
import UpdateTaskStatusDropdown from "../update-tasks/UpdateTaskStatusDropdown";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  const createdAt = new Date(task.createdAt).toLocaleDateString();

  return (
    <Card
      className="transition-shadow hover:shadow-md"
      style={{
        backgroundColor:
          task.status === Status.PENDING
            ? "#FEF3C7"
            : task.status === Status.IN_PROGRESS
              ? "#DBEAFE"
              : "#DCFCE7",
      }}>
      <CardContent className="p-4">
        <div className="mb-3 flex justify-end gap-1">
          <UpdateTaskDialog id={task.id} />

          <UpdateTaskStatusDropdown task={task} />

          <DeleteTaskDialog task={task} />
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="line-clamp-2 text-sm leading-5 font-semibold">{task.title}</h3>

            {task.description && (
              <p className="text-muted-foreground mt-1.5 line-clamp-2 text-sm leading-5">
                {task.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            <Badge
              variant="outline"
              className="capitalize"
              style={{
                backgroundColor:
                  task.priority === "LOW"
                    ? "#F59E0B"
                    : task.priority === "MEDIUM"
                      ? "#EAB308"
                      : "#38A169",
              }}>
              {task.priority.toLowerCase()}
            </Badge>

            <span className="text-muted-foreground text-xs">{createdAt}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
