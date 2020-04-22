import React from 'react';
import './App.css';
import MessageCreation from "./MessageCreation"
import EmbeddedControl from "./EmbeddedControl"

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newMessageCount: 0,
            message: ""
        };
    }

    onMessageChange = (message) => {
        this.setState({
            message
        });
    }

    addNewMessage = (msg) => {
        const {newMessageCount} = this.state;
        this.setState({newMessageCount: newMessageCount + 1});

        var container = document.getElementById('newMessage'),
            newChild = document.createElement("p");

        newChild.innerHTML = "#<b>" + newMessageCount + "</b>: " + msg;
        if (container.childElementCount >= 5) {
            container.removeChild(container.lastElementChild);
        }
        container.prepend(newChild);
    }

    sendMessage = () => {
        const embeddedContentWindow = document.getElementById('embedded-AD').contentWindow;
        const {message} = this.state;
        try {
            const validMessage = JSON.parse(message);
            embeddedContentWindow.postMessage(validMessage, '*');
        } catch (_) {
            // skip invalid message
            alert("Invalid Message");
        }
    }

    componentDidMount = () => {
        const {addNewMessage} = this;
        window.addEventListener('message', function (event) {
            if (!event || !event.data) return false;
            addNewMessage(JSON.stringify(event.data));
        });
    }

    render() {
        return (
            <div className="App">
                <MessageCreation onMessageChange={this.onMessageChange}/>
                <br/>
                <button className="send-message-btn" onClick={this.sendMessage}>send Message</button>
                <br/>
                <EmbeddedControl/>
                <br/>
                <h2>recived messages</h2>
                <div id="newMessage"></div>
            </div>
        );
    }
}

export default App;
