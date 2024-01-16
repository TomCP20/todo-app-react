import { useState } from "react";
import TaskTable from "./components/TaskTable";
import TaskForm from "./components/TaskForm";
import "./App.css"
import { ListItem } from "./ListItem";

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