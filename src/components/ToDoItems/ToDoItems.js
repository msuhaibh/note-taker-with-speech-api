import React, {Component} from "react";
import "./ToDoItems.css";

class ToDoItems extends Component {
    createNoteItemDisplay = (item) => {
        return <li
            onClick={() => this.delete(item.key)}
            key={item.key}
            className="list-group-item">{item.text}</li>
    }

    delete(key) {
        this.props.deleteItem(key);
    }

    render() {
        const toDoEntries = this.props.entries;
        const listItems = toDoEntries.map(this.createNoteItemDisplay);

        return (
            <ul className="note-list list-group">
                {listItems}
            </ul>
        )
    }
}

export default ToDoItems;