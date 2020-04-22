import React from 'react';
import './MessageCreation.css';

class MessageCreation extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            message: JSON.stringify({})
        };
    }

    resetMessageAsClearFormat = () => {
        this.changeMessage(JSON.stringify({
            gdc: {
                product: "analyticalDesigner",
                event: {
                    name: "clear",
                }
            }
        }));
    }

    resetMessageAsSaveFormat = () => {
        this.changeMessage(JSON.stringify({
            gdc: {
                product: "analyticalDesigner",
                event: {
                    name: "saveInsight",
                    data: {
                        title: "test save"
                    }
                }
            }
        }));
    }

    resetMessageAsSaveAsFormat = () => {
        this.changeMessage(JSON.stringify({
            gdc: {
                product: "analyticalDesigner",
                event: {
                    name: "saveAsInsight",
                    data: {
                        title: "test save as"
                    }
                }
            }
        }));
    }

    resetMessageAsExportFormat = () => {
        this.changeMessage(JSON.stringify({
            gdc: {
                product: "analyticalDesigner",
                event: {
                    name: "exportInsight",
                    data: {
                        title: "test save as",
                        format: 'xlsx'
                    }
                }
            }
        }));
    }

    pretyJSON = (jsonStr) => {
        let pretyStr = jsonStr;
        try {
            const jsonObj = JSON.parse(jsonStr);
            return JSON.stringify(jsonObj, undefined, 4);
        } catch {
            // skip it
        }

        return pretyStr;
    }

    onMessageChange = (event) => {
        this.changeMessage(event.target.value);
    }

    changeMessage = (value) => {
        const { onMessageChange } = this.props;
        this.setState({
            message: this.pretyJSON(value)
        });
        onMessageChange(value);
    }

    render() {
        return (
          <div className="message-creation">
            <button onClick={this.resetMessageAsClearFormat}>clear format</button>
            <button onClick={this.resetMessageAsSaveFormat}>save format</button>
            <button onClick={this.resetMessageAsSaveAsFormat}>save as format</button>
            <button onClick={this.resetMessageAsExportFormat}>export format</button>
            <br/>
            <span>Message: </span><br/>
            <textarea value={this.state.message} onChange={this.onMessageChange} cols={120} rows={15} />
          </div>
        );
    }
}

export default MessageCreation;
