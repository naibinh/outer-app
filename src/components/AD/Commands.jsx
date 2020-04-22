import React, {Fragment} from 'react';
import OpenCommand from "./OpenCommand";
import {sendCommand} from "../../utils";
import {EMBEDDED_AD} from "./constant";
import SaveCommand from "./SaveCommand";
import OtherCommands from "./OtherCommands";
import ExportCommand from "./ExportCommand";

export default function Commands() {

    const send = (command) => {
        sendCommand(command, EMBEDDED_AD);
    };

    return (
        <Fragment>
            <OpenCommand sendCommand={send}/>
            <SaveCommand sendCommand={send}/>
            <ExportCommand sendCommand={send}/>
            <OtherCommands sendCommand={send}/>
        </Fragment>
    );
}
