import React, {useState, useRef} from 'react';
import Input from '@material-ui/core/Input';
import {EMBEDDED_AD} from "./AD/constant";
import {setItem, getItem} from "../utils";
import { EMBEDDED_KD } from './KD/Constant';

const EMBEDDED_URL = "embedded-url";

function EmbeddedGdc({appName}) {
    const inputRef = useRef();
    const [iframeSrc, setIframeSrc] = useState(getItem(appName, EMBEDDED_URL));

    const onIframeSrcChanged = (event) => {
        event.preventDefault();
        if (inputRef.current) {
            const value = inputRef.current.value;

            setItem(appName, EMBEDDED_URL, value);
            setIframeSrc(value);
        }
    };

    return (
        <div className="embedded-gdc">
            <form onSubmit={onIframeSrcChanged}>
                <Input placeholder="Embedded URL (enter to submit)" defaultValue={iframeSrc} fullWidth autoFocus
                       inputRef={inputRef}/>
            </form>
            <iframe id={EMBEDDED_KD} src={iframeSrc} frameBorder="0" title="embedded"></iframe>
        </div>
    );
}

export default EmbeddedGdc;
