import CreateTaskForm from "./CreateTaskForm";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useState } from "react";

const CreateTaskDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>Create Task</DialogTrigger>

      <DialogContent className="bg-background m-4 p-3 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <CreateTaskForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
