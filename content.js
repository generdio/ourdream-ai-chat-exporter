console.log("%c[Ourdream Chat Exporter] Loaded", "color:lime");

if (!location.hostname.endsWith("ourdream.ai")) {
  console.log("%c[Ourdream Chat Exporter] Not on ourdream.ai → inactive", "color:gray");
} else {
  console.log("%c[Ourdream Chat Exporter] Active", "color:lime");

  // Listen for messages from popup or background
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "exportChat") {
      const chatData = collectChat();
      sendResponse({chat: chatData});
    }
    return true; // Keep the message channel open for async response
  });

  // Function to collect chat messages
  function collectChat() {
    const messages = [];
    const messageElements = document.querySelectorAll('[data-role="user"], [data-role="assistant"]');

    messageElements.forEach(el => {
      const role = el.getAttribute('data-role');
      let content = '';

      if (role === 'user') {
        content = el.querySelector('p').innerText.trim();
        messages.push(`[User]: ${content}`);
      } else if (role === 'assistant') {
        const paragraphs = el.querySelectorAll('.space-y-4 p');
        paragraphs.forEach(p => {
          let text = p.innerText.trim();
          if (p.querySelector('em')) {
            if (text.startsWith('⸻ Inner Dialogue:')) {
              messages.push(text.replace('⸻ Inner Dialogue:', '[Inner Dialogue]:').trim());
            } else {
              messages.push(`[Narrative]: ${text}`);
            }
          } else if (text.startsWith('⸻')) {
            // Skip or handle separators if needed
          } else {
            messages.push(`[Character]: ${text}`);
          }
        });
      }
    });

    return messages.join('\n\n');
  }
}