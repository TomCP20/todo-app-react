import ListItem from "../ListItem";
import './TaskForm.css';


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

  const todayDate = new Date();
  const todayString = todayDate.toISOString().split("T")[0];
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="task">Task:</label>
      <input type="text" id="task" required />
      <label htmlFor="date">Due Date:</label>
      <input type="date" id="date" min={todayString} />
      <button className="add_task">Add Task</button>
    </form>
  );
}
