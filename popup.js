const toggleBtn = document.getElementById("toggleBtn");
const status = document.getElementById("status");
const debug = document.getElementById("debug");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");

function log(m) { 
  console.log("[Popup Debug] " + m);
  debug.textContent += m + "\n"; 
  debug.scrollTop = debug.scrollHeight; 
}

function show(m, color="lime") { 
  status.textContent = m; 
  status.style.color = color; 
  setTimeout(() => status.textContent="", 3000); 
}

async function getTab() {
  const [t] = await chrome.tabs.query({active:true, currentWindow:true});
  return t;
}

async function send(msg) {
  log("Sending message: " + JSON.stringify(msg));
  const tab = await getTab();
  return chrome.tabs.sendMessage(tab.id, msg).catch(err => {
    log("Content script not responding: " + err);
    show("Chat not available (wrong page or script inactive)", "orange");
  });
}

async function load() {
  const tab = await getTab();
  const url = new URL(tab.url);
  const domain = url.hostname.replace(/^www\./, "");
  log("Current domain: " + domain);
  const data = await chrome.storage.local.get(["enabledDomains"]);
  const enabled = (data.enabledDomains || []).includes(domain);
  toggleBtn.textContent = enabled ? "Disable on this site" : "Enable on this site";
  show(enabled ? "Active" : "Inactive", enabled ? "lime" : "gray");
}

toggleBtn.onclick = async () => {
  const tab = await getTab();
  const url = new URL(tab.url);
  const domain = url.hostname.replace(/^www\./, "");
  const data = await chrome.storage.local.get(["enabledDomains"]);
  let list = data.enabledDomains || [];
  if (list.includes(domain)) {
    list = list.filter(d => d !== domain);
    toggleBtn.textContent = "Enable on this site";
    show("Disabled", "orange");
  } else {
    list.push(domain);
    toggleBtn.textContent = "Disable on this site";
    show("Enabled", "lime");
  }
  log("Toggled for domain: " + domain + " (new state: " + list.includes(domain) + ")");
  await chrome.storage.local.set({enabledDomains: list});
};

copyBtn.onclick = async () => {
  const response = await send({action: "exportChat"});
  if (response && response.chat) {
    navigator.clipboard.writeText(response.chat).then(() => {
      show("Copied to clipboard", "lime");
    }).catch(err => {
      show("Copy failed: " + err, "red");
    });
  } else {
    show("No chat data found", "orange");
  }
};

downloadBtn.onclick = async () => {
  const response = await send({action: "exportChat"});
  if (response && response.chat) {
    const blob = new Blob([response.chat], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    chrome.downloads.download({
      url: url,
      filename: "ourdream_chat_export.txt"
    });
    show("Downloading...", "lime");
  } else {
    show("No chat data found", "orange");
  }
};

load();