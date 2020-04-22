import React, {Fragment} from 'react';
import OpenCommand from "./OpenCommand";
import {sendCommand} from "../../utils";
import {EMBEDDED_AD} from "./constant";

export default function Commands() {

    const send = (command) => {
        sendCommand(command, EMBEDDED_AD);
    };

    return (
        <Fragment>
            <OpenCommand sendCommand={send}/>
        </Fragment>
    );
}
