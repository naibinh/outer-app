import React from 'react';
import './App.css';
import MessageCreation from "./MessageCreation"

class App extends React.Component {

  onMessageChange = () => {
    // TODO
  }
  render() {
    return (
      <div className="App">
        <MessageCreation onMessageChange={this.onMessageChange}/>
        <br/>
        <iframe id="gooddata" src="" width="100%" height="600px" frameborder="0"></iframe>
        <br/>
        <h2>recived messages</h2>
        <div id="newMessage"> </div>
      </div>
    );
  }
}

export default App;
