import { ListItem } from "../App";

export function TaskForm({ items, setItems }: Readonly<{ items: ListItem[]; setItems: React.Dispatch<React.SetStateAction<ListItem[]>>; }>) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      task: HTMLInputElement;
      date: HTMLInputElement;
    };

    setItems([...items, { task: formElements.task.value, date: formElements.date.value, id: crypto.randomUUID() }]);
  }
  return <form className="form" onSubmit={handleSubmit}>
    <label>Task:</label>
    <input type="text" id="task" required />
    <label>Due Date:</label>
    <input type="date" id="date" />
    <button className="add_task">Add Task</button>
  </form>;
}
