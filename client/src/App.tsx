import { useEffect, useRef, useReducer } from "react";
import TaskTable from "./components/TaskTable";
import TaskForm from "./components/TaskForm";
import DeleteList from "./components/DeleteList";
import "./App.css"
import { ListItem, isValidList } from "shared";


export type Action =
  | { type: "initialize", items: ListItem[] }
  | { type: "add", task: string, date: string }
  | { type: "del", id: string }
  | { type: "del_all"}
  | { type: "toggle", id: string }

function reducer(state: ListItem[], action: Action): ListItem[] {
  switch (action.type) {
    case "initialize":
      return action.items;
    case "add":
      return [...state, { complete: false, task: action.task, date: action.date, id: crypto.randomUUID() }];
    case "del":
      return state.filter((item) => item.id !== action.id)
    case "del_all":
      return []
    case "toggle":
      return state.map((item) => { return item.id === action.id ? { ...item, complete: !item.complete } : item });
  }
}

export default function App() {

  const [items, dispatch] = useReducer(reducer, [])
  const firstUpdate = useRef(true);

  useEffect(() => {
    fetch("/api").then(response => response.json())
      .then(data => {
        if (isValidList(data))
        {
          dispatch({ type: "initialize", items: data})
        }
        else
        {
          console.error(`Invalid type from server: ${data}.`)
        }
      });
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

  useEffect(() => () => { firstUpdate.current = true; }, []) // call on unmount

  return (
    <div className="App">
      <h1>Todo List App</h1>

      <h2>Add task</h2>

      <TaskForm items={items} dispatch={dispatch} />

      <h2>Todo List</h2>

      <TaskTable items={items} dispatch={dispatch} />

      <DeleteList dispatch={dispatch} />
    </div>
  );
}