import React, {Component} from "react";
import './TextCommands.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class TextCommands extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.entries || [],
            value: ""
        };
    }

    addItem = (e) => {
        e.preventDefault();

        let noteContent = this.state.value;

        this
            .props
            .addItem(noteContent);

        this.setState({value: ""});
    }

    handleChange = (e) => {
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <div>
                <h2>Add New Note By Text</h2>

                <form onSubmit={this.addItem}>
                    <TextField
                        id="outlined-multiline-static textNoteField"
                        label="Enter your note"
                        multiline
                        fullWidth
                        rows="2"
                        margin="normal"
                        variant="outlined"
                        value={this.state.value}
                        onChange={this.handleChange}/>

                    <Button variant="contained" color="primary" type="submit">Submit</Button>
                </form>
            </div>
        )
    }
}

export default TextCommands;