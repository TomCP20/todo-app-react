import ListItem from "shared/ListItem";
import TableRow from "./TableRow";
import { Action } from "../App";

interface TaskTableProps {
  items: ListItem[];
  dispatch: React.Dispatch<Action>;
}

export default function TaskTable({ items, dispatch }: Readonly<TaskTableProps>) {
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
        {items.map(item => <TableRow item={item} onRemove={() => dispatch({type: "del", id: item.id})} onToggle={() => dispatch({type: "toggle", id: item.id})} key={item.id} />)}
      </tbody>
    </table>
  );
}
