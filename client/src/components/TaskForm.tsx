import ListItem from "shared/ListItem";
import { Action } from "../App";


interface TaskFormProps {
  items: ListItem[];
  dispatch: React.Dispatch<Action>;
}

interface FormElements extends HTMLFormControlsCollection {
  task: HTMLInputElement;
  date: HTMLInputElement;
}

interface TaskFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function TaskForm({ items, dispatch }: Readonly<TaskFormProps>) {
  function handleSubmit(event: React.FormEvent<TaskFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;

    dispatch({ type: "add", task: formElements.task.value, date: formElements.date.value })
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
