import { ListItem } from "./ListItem"

export function isValidList(object: any): object is ListItem[] {
    if (!Array.isArray(object)) {
        return false;
    }
    return object.every(isListitem);
}

function isListitem(item: any): item is ListItem {
    return (
        typeof item === "object" &&
        item !== null &&
        Object.keys(item).length === 4 &&

        "complete" in item &&
        typeof item.complete === "boolean" &&

        "task" in item &&
        typeof item.task === "string" &&

        "date" in item &&
        typeof item.date === "string" &&

        "id" in item &&
        typeof item.id === "string"
    );
}