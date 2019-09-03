import React, {Component} from "react";
import "./ToDoItems.css";

class ToDoItems extends Component {
    constructor(props) {
        super(props);
        this.createNotes = this.createNotes.bind(this);
    }

    createNotes(item) {
        return <li onClick={() => this.delete(item.key)}
                    key={item.key} className="list-group-item">{item.text}</li>
    }

    delete(key) {
        this.props.delete(key);
    }

    render() {
        const toDoEntries = this.props.entries;
        const listItems = toDoEntries.map(this.createNotes);

        return (
            <ul className="note-list list-group">
                {listItems}
            </ul>
        )
    }
}

export default ToDoItems;