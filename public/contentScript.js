chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.accessToken) {
        // Pass the access token to the React component
        window.postMessage(
            { type: "ACCESS_TOKEN", accessToken: message.accessToken },
            "*"
        );
    }
});
