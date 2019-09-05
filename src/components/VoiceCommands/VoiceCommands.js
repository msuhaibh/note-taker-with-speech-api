import React, {Component} from "react";
import "./VoiceCommands.css";
import speechRecognitionHelper from "../../helpers/speechRecognitionHelper.js";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';

class VoiceCommands extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.entries || [],
            listening: false,
            speechText: ""
        };

        this.recognition = speechRecognitionHelper.createSpeechRecognition();
    }

    componentDidMount() {
        if (this.recognition === null) {
            document.getElementById("SpeechRecognitionContainer").style.display = "none";
            document.getElementById("noBrowserSupport").style.display = "block";
        }
    }

    addItem = (e) => {
        e.preventDefault();

        let noteContent = this.state.speechText;

        this.props.addItem(noteContent);

        this.setState({speechText: ""});
    }

    handleStartRecognition = (e) => {
        e.preventDefault();

        this.recognition.start();

        this.setState({listening: true});

        this.recognition.onstart = () => {
            console.log("Voice recognition activated. Try speaking into the microphone.");
        }

        this.recognition.onend = () => {
            this.recognition.start();
            console.log("Continue listening");
        }
    }

    handleStopRecognition = (e) => {
        e.preventDefault();

        this.recognition.stop();

        this.setState({listening: false});

        this.recognition.onend = () => {
            console.log("Voice recognition stopped via click");
        }

        let notes = "";
        this.recognition.onresult = (event) => {
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) 
                    notes += transcript + ' ';
                }
            
            this.setState({speechText: notes});
        }
    }

    handleChange = (e) => {
        this.setState({speechText: e.target.value});
    };

    render() {
        return (
            <div>
                <h4 id="noBrowserSupport" ref="noBrowserSupport">Sorry, Your Browser Doesn't
                    Support the Web Speech API. Only User Input Notes Can Be Taken. Try Opening This
                    Demo In Google Chrome for Speech Functionality.</h4>

                <div id="SpeechRecognitionContainer" ref="SpeechRecognitionContainer">
                    <h2>Add New Note Via Speech</h2>

                    <TextField
                        value={this.state.speechText}
                        onChange={this.handleChange}
                        id="speechText"
                        multiline
                        fullWidth
                        rows="2"
                        margin="normal"
                        variant="outlined"/>
                    <br/>

                    <ButtonGroup variant="contained" aria-label="full width contained button group">
                        <Button
                            onClick={this.handleStartRecognition}
                            id="startBtn"
                            disabled={this.state.listening}
                            color="primary">Start Recognition</Button>
                        <Button
                            onClick={this.handleStopRecognition}
                            id="stopBtn"
                            disabled={!this.state.listening}
                            color="secondary">Stop Recognition</Button>
                        <Button onClick={this.addItem} id="saveNoteBtn" color="primary">Save Note</Button>
                    </ButtonGroup>
                </div>
            </div>
        )
    }
}

export default VoiceCommands;