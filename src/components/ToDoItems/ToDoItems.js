import React, {Component} from "react";
import "./ToDoItems.css";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class ToDoItems extends Component {
    createNoteItemDisplay = (item) => {
        return (
            <ListItem component="li" className="note-list-item" key={item.key}>
                <ListItemText>{item.text}</ListItemText>
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => this.delete(item.key)} >
                      <DeleteIcon/>
                    </IconButton>
                  </ListItemSecondaryAction>
            </ListItem>
        )
    }

    delete(key) {
        this.props.deleteItem(key);
    }

    render() {
        const toDoEntries = this.props.entries;
        const listItems = toDoEntries.map(this.createNoteItemDisplay);

        return (
            listItems.length > 0 ? (
                <div>
                    <h2>Your Notes</h2>
                    <List component="ul" className="note-list" disablePadding={true}>
                        {listItems}
                    </List>
                </div>
            ) : (<h2>You Have No Notes</h2> )
        )
    }
}

export default ToDoItems;