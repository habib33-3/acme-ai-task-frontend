import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUpdateTaskStatus } from "@/hooks/useUpdateTaskStatus";
import { Status, type Task } from "@/types";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  task: Task;
};

const UpdateTaskStatusDropdown = ({ task }: Props) => {
  const { mutate } = useUpdateTaskStatus(task.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            title="Update status"
          />
        }>
        <ArrowRightIcon className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {Object.values(Status).map((status) => (
          <DropdownMenuItem
            key={status}
            disabled={status === task.status}
            onClick={() => mutate(status)}>
            {status}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UpdateTaskStatusDropdown;
