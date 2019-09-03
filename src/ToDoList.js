import React, { Component } from 'react';
import ToDoItems from "./ToDoItems.js";
import "./ToDoList.css";
import VoiceCommands from './VoiceCommands.js';

class ToDoList extends Component {
    constructor(props) {
        super(props);

        // let currentItems = [];

        // try {
        //     currentItems = JSON.parse(localStorage.getItem('toDoItems')) || [];
        // }
        // catch (ex) {
        //     console.log(ex);
        // }

        this.state = {
            items: [],
            value: ""
        };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    addItem(e) {
        const note = this.state.value;

        if(note) {
            const newItem = {
                text: note,
                key: Date.now()
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem),
                    value: ""
                };
            });
        }

        //localStorage.setItem("toDoItems", JSON.stringify(this.state.items));

        e.preventDefault();
    }

    deleteItem(key) {
        const filteredItems = this.state.items.filter(function(item) {
            return (item.key !== key)
        });

        this.setState({
            items: filteredItems
        });

        //localStorage.setItem("toDoItems", JSON.stringify(this.state.items));
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 col-sm-12">
                        <h1>Speech-To-Text Note Taker</h1>

                        <h2>Add New Note Via Typing</h2>
                        <div id="textNoteTakerContainer">
                            <form onSubmit={this.addItem}>
                                <div className="input-group">
                                    <input type="text" name="note" value={this.state.value} onChange={this.handleChange} placeholder="Enter your note" className="form-control"/>
                                    <span className="input-group-btn">
                                        <button type="submit" className="btn btn-custom btn-primary">Submit</button>
                                    </span>
                                </div>
                            </form>
                        </div>

                        <br/>
                        <hr/>

                        <div id="speechNoteTakerContainer">
                            <VoiceCommands entries={this.state.items}/>
                        </div>

                        <hr/>

                        <div id="notesListContainer">
                            <h3 id="noteListHeader">Your Notes:</h3>
                            <ToDoItems entries={this.state.items} delete={this.deleteItem}/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

export default ToDoList;