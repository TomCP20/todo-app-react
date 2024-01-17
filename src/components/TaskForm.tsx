import ListItem from "../ListItem";

interface TaskFormProps {
  items: ListItem[];
  setItems: React.Dispatch<React.SetStateAction<ListItem[]>>;
}

interface FormElements extends HTMLFormControlsCollection {
  task: HTMLInputElement;
  date: HTMLInputElement;
}

interface TaskFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function TaskForm({ items, setItems }: Readonly<TaskFormProps>) {
  function handleSubmit(event: React.FormEvent<TaskFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;

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
