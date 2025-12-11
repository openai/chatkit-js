# @openai/chatkit

Type declarations for the ChatKit Web Component.

## Setup

If you install `@openai/chatkit` and import its types directly, no extra configuration is needed.

Add `@openai/chatkit` to `compilerOptions.types` in your `tsconfig.json` when you want the `openai-chatkit` element and its CustomEvents to be available globally (for example, when using the custom element in JSX without an explicit import).

```json
{
  "compilerOptions": {
    "types": ["@openai/chatkit"]
  }
}
```
