import { useEffect, useRef, useReducer } from "react";
import TaskTable from "./components/TaskTable";
import TaskForm from "./components/TaskForm";
import "./App.css"
import ListItem from "./ListItem";


export type Action =
  | { type: "initialize", items: ListItem[] }
  | { type: "add", item: ListItem }
  | { type: "del", id: string }
  | { type: "toggle", id: string }

function reducer(state: ListItem[], action: Action): ListItem[] {
  switch (action.type) {
    case "initialize":
      return action.items;
    case "add":
      return [...state, action.item];
    case "del":
      return state.filter((item) => item.id !== action.id)
    case "toggle":
      return state.map((item) => { return item.id === action.id ? { ...item, complete: !item.complete } : item });
  }
}

export default function App() {

  const [items, dispatch] = useReducer(reducer, [])
  const firstUpdate = useRef(true);

  useEffect(() => {
    fetch("/api").then(response => response.json()).then(data => dispatch({ type: "initialize", items: data as ListItem[] }));
  }, []) // call on mount

  useEffect(() => {
    if (firstUpdate.current) {
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

      <TaskForm items={items} dispatch={dispatch} />

      <h2>Todo List</h2>

      <TaskTable items={items} dispatch={dispatch} />

    </div>
  );
}