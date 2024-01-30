chrome.action.onClicked.addListener(() => {
  
  
  const activeTab = chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(activeTab[0].id, { action: "getUrl" });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "processUrl") {
    processUrl(message.url);
  }
});

async function processUrl(url) {
  const results = await model.compareHtmlText(url);
  chrome.runtime.sendMessage({ action: "displayResults", results });
}
