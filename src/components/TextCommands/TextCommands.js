import React, {Component} from "react";
import './TextCommands.css';

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

        this.props.addItem(noteContent);

        this.setState({value: ""});
    }

    handleChange = (e) => {
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <div>
                <h2>Add New Note Via Typing</h2>
                <div id="textNoteTakerContainer">
                    <form onSubmit={this.addItem}>
                        <div className="input-group">
                            <input type="text" name="note" value={this.state.value} onChange={this.handleChange} placeholder="Enter your note" className="form-control" id="textNoteField"/>
                            <span className="input-group-btn">
                                <button type="submit" className="btn btn-custom btn-primary">Submit</button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default TextCommands;