import { useEffect, useState, useRef } from "react";
import TaskTable from "./components/TaskTable";
import TaskForm from "./components/TaskForm";
import "./App.css"
import ListItem from "./ListItem";

export default function App() {

  const [items, setItems] = useState<ListItem[]>([]);
  const firstUpdate = useRef(true);

  useEffect(() => {
    fetch("/api").then(response => response.json()).then(data => setItems(data as ListItem[]));
  }, []) // call on mount

  useEffect(() => {
    if (firstUpdate.current)
    {
      firstUpdate.current = false;
      return;
    }
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    });
  }, [items]) // call on items change

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