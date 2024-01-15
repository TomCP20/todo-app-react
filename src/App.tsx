import { useState } from "react";

type ListItem = {
  task: string,
  date: string,
  id: string
}

export default function App() {

  const [items, setItems] = useState<ListItem[]>([]);

  function handleRemove(id: string) {
    console.log(id);
    const newList = items.filter((item) => item.id !== id);

    setItems(newList);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      task: HTMLInputElement,
      date: HTMLInputElement
    }

    setItems([...items, { task: formElements.task.value, date: formElements.date.value, id: crypto.randomUUID() }]);
  }
  return (
    <div className="App">
      <h1>Todo List App</h1>

      <h2>Add task</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>Task:</label>
        <input type="text" id="task" required />
        <label>Due Date:</label>
        <input type="date" id="date" />
        <button className="add_task">Add Task</button>
      </form>

      <h2>Todo List</h2>

      <table id="root">
        <caption>List of Tasks Todo</caption>
        <thead>
          <tr>
            <th className="col1">Complete</th>
            <th className="col2">Task</th>
            <th className="col3">Due Date</th>
            <th className="col4">Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => {
            return (
              <tr key={item.id}>
                <th><input type="checkbox" /></th>
                <th>{item.task}</th>
                <th>{item.date || "n/a"}</th>
                <th><button className="delete" onClick={() => handleRemove(item.id)}>Delete</button></th>
              </tr>
            )
          })}
        </tbody>
      </table>

    </div>
  );
}

