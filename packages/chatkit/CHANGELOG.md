# @openai/chatkit

## 1.3.0

### Minor Changes

- 546f1d0: - Add support for Lucide icons via icon names with the `lucide:` prefix
  - Add a `frameTitle` option

## 1.2.0

### Minor Changes

- 19fb9ec: - Add a `chatkit.tool.change` event for tool selection updates.
  - Expose `showHistory()` and `hideHistory()` methods on the ChatKit web component.
  - Support entity tags in start screen prompts.
  - Update the `setComposerValue()` method to accept rich-content segments, optional tool/model selection, and a file list for queued attachments (`content`, `selectedToolId`, `selectedModelId`, `files`).
  - Update the `sendUserMessage()` method to accept rich-content segments plus inference options (`content`, `toolChoice`, `model`).
  - Expand the supported icon set.

## 1.1.0

### Minor Changes

- 8fcee7c: Add `chatkit.effect` event

## 1.0.3

### Patch Changes

- 63c423a: Add `persistent` field to `ToolOption`

## 1.0.2

### Patch Changes

- 3bc87d6: Fix type for Checkbox `defaultChecked`

## 1.0.1

### Patch Changes

- efb17dc: Added missing types for `chatkit.ready` event

## 1.0.0

### Major Changes

- 5e4488e: Initial release
