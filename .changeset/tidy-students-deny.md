---
'@openai/chatkit': minor
---

- Add a `chatkit.tool.change` event for tool selection updates.
- Expose `showHistory()` and `hideHistory()` methods on the ChatKit web component.
- Support entity tags in start screen prompts.
- Update the `setComposerValue()` method to accept rich-content segments, optional tool/model selection, and a file list for queued attachments (`content`, `selectedToolId`, `selectedModelId`, `files`).
- Update the `sendUserMessage()` method to accept rich-content segments plus inference options (`content`, `toolChoice`, `model`).
- Expand the supported icon set.
