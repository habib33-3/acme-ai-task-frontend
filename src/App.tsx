import CreateTaskDialog from "./components/create-task/CreateTaskDialog";
import TaskList from "./components/tasks/TaskList";

const App = () => {
  return (
    <main className="bg-background m-3 mx-auto min-h-screen max-w-7xl p-6">
      <div className="mx-auto flex w-full flex-col items-end justify-end p-4">
        <CreateTaskDialog />
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
        <TaskList status="PENDING" />
        <TaskList status="IN_PROGRESS" />
        <TaskList status="COMPLETED" />
      </div>
    </main>
  );
};

export default App;
