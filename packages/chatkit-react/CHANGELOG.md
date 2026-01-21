# @openai/chatkit-react

## 1.4.3

### Patch Changes

- Updated dependencies [ec7afe0]
  - @openai/chatkit@1.5.0

## 1.4.2

### Patch Changes

- Updated dependencies [aa31766]
  - @openai/chatkit@1.4.0

## 1.4.1

### Patch Changes

- Updated dependencies [546f1d0]
  - @openai/chatkit@1.3.0

## 1.4.0

### Minor Changes

- 19fb9ec: - Add `onToolChange` to `UseChatKitOptions`.
  - Expose `showHistory()` and `hideHistory()` methods.
  - Support entity tags in start screen prompts.
  - Update the `setComposerValue()` method to accept rich-content segments, optional tool/model selection, and a file list for queued attachments (`content`, `selectedToolId`, `selectedModelId`, `files`).
  - Update the `sendUserMessage()` method to accept rich-content segments plus inference options (`content`, `toolChoice`, `model`).
  - Expand the supported icon set.

### Patch Changes

- Updated dependencies [19fb9ec]
  - @openai/chatkit@1.2.0

## 1.3.0

### Minor Changes

- 8fcee7c: Add `onEffect` to `UseChatKitOptions`

### Patch Changes

- Updated dependencies [8fcee7c]
  - @openai/chatkit@1.1.0

## 1.2.3

### Patch Changes

- 7107130: Fix event handlers registered multiple times

## 1.2.2

### Patch Changes

- Updated dependencies [63c423a]
  - @openai/chatkit@1.0.3

## 1.2.1

### Patch Changes

- Updated dependencies [3bc87d6]
  - @openai/chatkit@1.0.2

## 1.2.0

### Minor Changes

- 0f922cb: Add `onReady` to `UseChatKitOptions`

### Patch Changes

- Updated dependencies [efb17dc]
  - @openai/chatkit@1.0.1

## 1.1.1

### Patch Changes

- 7385e2f: Fix issue where ref was not being set

## 1.1.0

### Minor Changes

- 3de3243: Exposed a ref to the underlying `OpenAIChatKit` DOM element in the return value of `useChatKit`

### Patch Changes

- 3de3243: Removed usage of React 19 only ref callback cleanup function

## 1.0.0

### Major Changes

- 5e4488e: Initial release

### Patch Changes

- Updated dependencies [5e4488e]
  - @openai/chatkit@1.0.0
