import ListItem from "../ListItem";
import TableRow from "./TableRow";
import "./TaskTable.css"

interface TaskTableProps {
  items: ListItem[];
  setItems: React.Dispatch<React.SetStateAction<ListItem[]>>;
}

export default function TaskTable({ items, setItems }: Readonly<TaskTableProps>) {
  function handleRemove(id: string) {
    setItems(items.filter((item) => item.id !== id));
  }
  return (
    <table>
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
        {items.map(item => <TableRow item={item} onRemove={handleRemove} key={item.id} />)}
      </tbody>
    </table>
  );
}
