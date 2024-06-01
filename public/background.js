console.log("Background script running...");

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        const url = details.url;
        const regex = /#access_token=([^&]+)/;
        const match = regex.exec(url);
        if (match) {
            const accessToken = match[1];
            // Send the access token to the content script
            chrome.tabs.query(
                { active: true, currentWindow: true },
                function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        accessToken: accessToken,
                    });
                }
            );
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);