import React, {Component} from "react";
import "./VoiceCommands.css";
import helpers from "./helpers";

class VoiceCommands extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.entries || [],
        };

        this.recognition = helpers.createSpeechRecognition();
    }

    componentDidMount() {
        if(this.recognition === null) {
            document.getElementById("SpeechRecognitionContainer").style.display = "none";
            document.getElementById("noBrowserSupport").style.display = "block";
        }

        document.getElementById("startBtn").disabled = false;
        document.getElementById("stopBtn").disabled = true;
    }

    handleStartRecognition = (e) => {
        e.preventDefault();

        this.recognition.start();

        document.getElementById("startBtn").disabled = true;
        document.getElementById("stopBtn").disabled = false;

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

        document.getElementById("startBtn").disabled = false;
        document.getElementById("stopBtn").disabled = true;

        this.recognition.onend = () => {
            console.log("Voice recognition stopped via click");
        }

        let notes = "";
        this.recognition.onresult = (event) => {
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) notes += transcript + ' ';
            }

            console.log(notes);
            document.getElementById("speechText").value = notes;
        }
    }

    handleNoteTaking = (e) => {
        e.preventDefault();

        let note = document.getElementById("speechText").value;
        console.log(note);

        if(note) {
            const newItem = {
                text: note,
                key: Date.now()
            };

            this.setState((prevState) => {
                console.log(prevState);
                return {
                    items: prevState.items.concat(newItem)
                };
            });
        }

        console.log(this.state.items);
        document.getElementById("speechText").value = "";
    }

    render() {
        return (
            <div>
                <h4 id="noBrowserSupport" ref="noBrowserSupport">Sorry, Your Browser Doesn't Support the Web Speech API. Only User Input Notes Can Be Taken. Try Opening This Demo In Google Chrome for Speech Functionality.</h4>
                <div id="SpeechRecognitionContainer" ref="SpeechRecognitionContainer">
                    
                    <h2>Add New Note Via Speech</h2>
                    <textarea className="form-control" id="speechText"></textarea>
                    <br/>
                    <div className="btn-group btn-group-justified" role="group" aria-label="...">
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-primary" onClick={this.handleStartRecognition} id="startBtn">Start Recognition</button>
                        </div>
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-default" onClick={this.handleStopRecognition} id="stopBtn">Stop Recognition</button>
                        </div>
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-success" onClick={this.handleNoteTaking} id="takeNoteBtn">Take Note</button>
                        </div>
                    </div>
                    <br/>
                </div>
            </div>
        )
    }
}

export default VoiceCommands;