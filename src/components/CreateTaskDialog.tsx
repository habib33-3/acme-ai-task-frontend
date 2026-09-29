import CreateTaskForm from "./CreateTaskForm";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

const CreateTaskDialog = () => {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Create Task</DialogTrigger>

      <DialogContent className="bg-background m-4 p-3 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <CreateTaskForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
