import { ListItem } from "../App";


export function TableRow(props: Readonly<{ item: ListItem; handleRemove: (id: string) => void; }>) {
  return <tr>
    <th><input type="checkbox" /></th>
    <th>{props.item.task}</th>
    <th>{props.item.date || "n/a"}</th>
    <th><button className="delete" onClick={() => props.handleRemove(props.item.id)}>Delete</button></th>
  </tr>;
}
