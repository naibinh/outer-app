import React, {useState} from 'react';
import Input from '@material-ui/core/Input';

function EmbeddedGdc() {
    const [iframeSrc, setIframeSrc] = useState("https://client-demo.na.intgdc.com:50043/analyze/embedded/#");
    const onIframeSrcChanged = (event) => {
        setIframeSrc(event.target.value);
    };
    return (
        <div className="embedded-gdc">
            <Input placeholder="Embedded URL" onChange={onIframeSrcChanged} value={iframeSrc} fullWidth />
            <iframe id="embedded" src={iframeSrc} frameBorder="0"
                    title="embedded"></iframe>
        </div>
    );
}

export default EmbeddedGdc;
