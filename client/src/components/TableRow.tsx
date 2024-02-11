import { ListItem } from "shared";


interface TableRowProps {
  item: ListItem;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function TableRow({ item, onRemove, onToggle }: Readonly<TableRowProps>) {
  const { complete, task, date, id } = item
  return (
    <tr>
      <th><input type="checkbox" checked={complete} onChange={() => onToggle(id)} /></th>
      <th>{task}</th>
      <th>{date || "n/a"}</th>
      <th><button className="delete" onClick={() => onRemove(id)}>Delete</button></th>
    </tr>
  );
}
