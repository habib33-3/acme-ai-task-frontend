import { useState } from "react";
import { PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import UpdateTaskForm from "./UpdateTaskForm";

type Props = {
  id: string;
};

const UpdateTaskDialog = ({ id }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
          />
        }>
        <PencilIcon />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
        </DialogHeader>

        <UpdateTaskForm
          id={id}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTaskDialog;
