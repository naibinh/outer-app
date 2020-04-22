export const sendCommand = (command, embeddedId) => {
    const embeddedContentWindow = document.getElementById(embeddedId).contentWindow;
    if (!embeddedContentWindow) {
        console.log("Invalid", embeddedId);
    }
    embeddedContentWindow.postMessage(command, '*');

};
