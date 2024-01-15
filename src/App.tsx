import { useState } from "react";
import { TaskTable } from "./components/TaskTable";
import { TaskForm } from "./components/TaskForm";

export type ListItem = {
  task: string,
  date: string,
  id: string
}


export default function App() {

  const [items, setItems] = useState<ListItem[]>([]);
  return (
    <div className="App">
      <h1>Todo List App</h1>

      <h2>Add task</h2>

      <TaskForm items={items} setItems={setItems} />

      <h2>Todo List</h2>

      <TaskTable items={items} setItems={setItems} />

    </div>
  );
}