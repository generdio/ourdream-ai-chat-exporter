console.log("%c[Ourdream Chat Exporter BG] Loaded", "color:lime");

// Keep service worker alive
setInterval(() => chrome.runtime.connect({name: "keepAlive"}), 20000);
chrome.runtime.onConnect.addListener(p => p.name === "keepAlive" && p.onDisconnect.addListener(() => {}));

// Re-inject on install/update (optional but harmless)
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.query({}, tabs => tabs.forEach(tab => {
    if (tab.url?.startsWith("http")) {
      chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"] })
        .catch(() => {});
    }
  }));
});