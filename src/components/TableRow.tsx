import ListItem from "../ListItem";


interface TableRowProps {
  item: ListItem;
  onRemove: (id: string) => void;
}

export default function TableRow({item, onRemove}: Readonly<TableRowProps>) {
  return <tr>
    <th><input type="checkbox" /></th>
    <th>{item.task}</th>
    <th>{item.date || "n/a"}</th>
    <th><button className="delete" onClick={() => onRemove(item.id)}>Delete</button></th>
  </tr>;
}
