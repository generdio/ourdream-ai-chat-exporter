# OurDream AI Chat Exporter

A lightweight Chrome extension (Manifest V3) designed to export chat conversations from OurDream.ai. It parses the chat HTML, formats messages with clear labels (e.g., [User], [Character], [Narrative], [Inner Dialogue]), and allows you to copy the export to your clipboard or download it as a plain text file. This is useful for archiving role-play stories, analyzing conversations, or backing up data.

No image deblurring, fullscreen galleries, or site modifications—just clean chat export QoL features.

## Features
- **Chat Export**: Collects all messages from the chat container on OurDream.ai pages. Formats them into a readable structure:
  - [User]: User messages.
  - [Character]: Direct character dialogue.
  - [Narrative]: Italicized narrative descriptions (e.g., scene setting or actions).
  - [Inner Dialogue]: Character's inner thoughts (e.g., "Inner Dialogue: ...").
- **Copy to Clipboard**: One-click copy of the formatted chat text via the popup.
- **Download as File**: Save the chat as a .txt file directly from the popup.
- **Domain Toggle**: Enable/disable the extension specifically for ourdream.ai domains to avoid running on unrelated pages.
- **Debug Logging**: Popup includes a debug console for troubleshooting.
- **Privacy-Focused**: No data collection; runs locally. Only activates on matching domains.

The extension is built for simplicity and works on Chrome/Opera.

## Installation Steps
This extension is loaded as an unpacked extension in developer mode. Follow these steps to add it to Chrome (or compatible browsers like Opera):

1. **Download the Repository**:
   - Clone this repo: 
   ```git clone https://github.com/generdio/ourdream-ai-chat-exporter.git```
   - Or download the ZIP from the GitHub page and extract it to a folder (e.g., `ourdream-ai-chat-exporter`).

2. **Open Chrome Extensions Page**:
   - Open Google Chrome.
   - Navigate to `chrome://extensions/` in the address bar.

3. **Enable Developer Mode**:
   - In the top-right corner, toggle "Developer mode" to ON.

4. **Load the Extension**:
   - Click the "Load unpacked" button.
   - Browse to and select the folder where you extracted/cloned the repo.
   - The extension should appear in the list as "Ourdream AI Chat Exporter".

5. **Pin the Extension (Optional)**:
   - Click the puzzle icon in Chrome's toolbar.
   - Find the extension and pin it for quick access.

6. **Test on OurDream.ai**:
   - Visit a chat page on ourdream.ai.
   - Click the extension icon to open the popup.
   - If the status shows "Inactive", click "Enable on this site".
   - Click "Copy Chat to Clipboard" or "Download Chat as File" to export.

## Usage
1. **Open Popup**: Click the extension icon in your toolbar.
2. **Toggle Enable/Disable**: Turns the exporter on/off for the current ourdream.ai domain.
3. **Export Options**:
   - **Copy to Clipboard**: Formats and copies the full chat.
   - **Download as File**: Saves the formatted chat as `ourdream_chat_export.txt`.
4. **Debug Panel**: Displays logs (e.g., domain status) for troubleshooting.

## Example Exported Chat Format
```text
[User]: Hello, how are you?

[Narrative]: The character leans forward, eyes gleaming with interest.

[Character]: I'm doing great, thanks for asking!

[Narrative]: She smiles warmly, brushing a strand of hair behind her ear.

[Inner Dialogue]: They're so cute when they're nervous. Popularity: 95%

[User]: That's good to hear. What have you been up to?

[Character]: Just the usual chaos. Saving the world one sarcastic comment at a time.

[Inner Dialogue]: Gotta keep them hooked. This is getting fun.
```
## Troubleshooting
- **No Chat Data**: Ensure you're on a valid OurDream.ai chat page with the expected HTML structure. Use "Force Run Now" to reload.
- **Extension Not Loading**: Check chrome://extensions/ for errors. Reload the unpacked folder if needed.
- **Browser Compatibility**: Tested on Chrome; should work on Opera/Edge with Manifest V3 support.

## Development
- **Files**:
  - `manifest.json`: Extension config.
  - `background.js`: Service worker for persistence and injection.
  - `content.js`: Parses and exports chats.
  - `popup.html/js`: UI for controls and export.
- To modify: Edit files, then reload the extension in chrome://extensions/.
