import { ListItem } from "../App";


export function TableRow({item, onRemove}: Readonly<{ item: ListItem; onRemove: (id: string) => void; }>) {
  return <tr>
    <th><input type="checkbox" /></th>
    <th>{item.task}</th>
    <th>{item.date || "n/a"}</th>
    <th><button className="delete" onClick={() => onRemove(item.id)}>Delete</button></th>
  </tr>;
}
