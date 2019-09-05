import React, {Component} from 'react';
import "./App.css";
import ToDoItems from "../ToDoItems/ToDoItems.js";
import VoiceCommands from '../VoiceCommands/VoiceCommands.js';
import TextCommands from '../TextCommands/TextCommands.js';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Navbar from '../Nav/Navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
const uuidv4 = require('uuid/v4');

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

            <React.Fragment>
                <CssBaseline>
                    <Navbar/>
                    <Grid container direction="row" style={{padding: 24}}>
                        <Grid item xs={12}>
                            <Box id="textNoteTakerContainer" component="section">
                                <TextCommands entries={this.state.items} addItem={this.addItem}/>
                            </Box>

                            <hr/>

                            <Box id="speechNoteTakerContainer" component="section">
                                <VoiceCommands entries={this.state.items} addItem={this.addItem}/>
                            </Box>

                            <hr/>
                            <Box id="notesListContainer" component="section">
                                <h2 id="noteListHeader">Your Notes:</h2>
                                <ToDoItems entries={this.state.items} deleteItem={this.deleteItem}/>
                            </Box>
                        </Grid>
                    </Grid>
                </CssBaseline>
            </React.Fragment>
        )
    }
}

export default App;