export const sendCommand = (command, embeddedId) => {
    const embeddedContentWindow = document.getElementById(embeddedId).contentWindow;
    if (!embeddedContentWindow) {
        console.log("Invalid", embeddedId);
    }
    console.log(command);
    embeddedContentWindow.postMessage(command, '*');

};
