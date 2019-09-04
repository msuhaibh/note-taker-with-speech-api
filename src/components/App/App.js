import React, {Component} from 'react';
import "./App.css";
import ToDoItems from "../ToDoItems/ToDoItems.js";
import VoiceCommands from '../VoiceCommands/VoiceCommands.js';
import TextCommands from '../TextCommands/TextCommands.js';
const uuidv4 = require('uuid/v4')

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }

    addItem = (noteContent) => {
        if (noteContent) {
            const newItem = {
                text: noteContent,
                key: uuidv4()
            }

            this.setState((prevState) => {
                return {
                    items: prevState
                        .items
                        .concat(newItem)
                }
            });
        }
    }

    deleteItem = (key) => {
        const filteredItems = this
            .state
            .items
            .filter(function (item) {
                return (item.key !== key)
            });

        this.setState({items: filteredItems});
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Speech-To-Text Note Taker</h1>

                        <section id="textNoteTakerContainer">
                            <TextCommands entries={this.state.items} addItem={this.addItem}/>
                        </section>

                        <section id="speechNoteTakerContainer">
                            <VoiceCommands entries={this.state.items} addItem={this.addItem}/>
                        </section>

                        <hr/>
                        <section id="notesListContainer">
                            <h3 id="noteListHeader">Your Notes:</h3>
                            <ToDoItems entries={this.state.items} deleteItem={this.deleteItem}/>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;