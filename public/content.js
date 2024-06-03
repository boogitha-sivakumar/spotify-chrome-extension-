// Fetch the title of the YouTube video
const videoTitle = document.querySelector("h1.ytd-watch-metadata").innerText;
console.log(videoTitle);
console.log("Content script running...");
// Send the title to the background script
chrome.runtime.sendMessage({ title: videoTitle });
