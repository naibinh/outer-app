import React, {useState, useRef} from 'react';
import Input from '@material-ui/core/Input';
import {EMBEDDED_AD} from "./AD/constant";

const DEFAULT_URL = "https://client-demo.na.intgdc.com:50043/analyze/embedded/#";
// const DEFAULT_URL = "https://google.com";

function EmbeddedGdc() {
    const inputRef = useRef();
    const [iframeSrc, setIframeSrc] = useState(DEFAULT_URL);

    const onIframeSrcChanged = (event) => {
        event.preventDefault();
        if (inputRef.current) {
            setIframeSrc(inputRef.current.value);
        }
    };

    return (
        <div className="embedded-gdc">
            <form onSubmit={onIframeSrcChanged}>
                <Input placeholder="Embedded URL (enter to submit)" defaultValue={iframeSrc} fullWidth autoFocus
                       inputRef={inputRef}/>
            </form>
            <iframe id={EMBEDDED_AD} src={iframeSrc} frameBorder="0" title="embedded"></iframe>
        </div>
    );
}

export default EmbeddedGdc;
