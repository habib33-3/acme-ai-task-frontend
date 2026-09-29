import CreateTaskDialog from "./components/create-task/CreateTaskDialog";
import SearchAndFilter from "./components/SearchBar";
import TaskList from "./components/tasks/TaskList";

const App = () => {
  return (
    <main className="bg-background mx-auto min-h-screen max-w-7xl p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground text-sm">Manage and track your tasks</p>
          </div>

          <CreateTaskDialog />
        </div>

        <SearchAndFilter />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <TaskList status="PENDING" />
        <TaskList status="IN_PROGRESS" />
        <TaskList status="COMPLETED" />
      </div>
    </main>
  );
};

export default App;
