import CreateTaskDialog from "./components/CreateTaskDialog";

const App = () => {
  return (
    <main className="bg-background m-3 mx-auto min-h-screen max-w-7xl p-6">
      <div className="mx-auto flex w-full flex-col items-end justify-end p-4">
        <CreateTaskDialog />
      </div>
    </main>
  );
};

export default App;
