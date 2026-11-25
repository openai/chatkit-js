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

## Widget icons

The `Widgets.WidgetIcon` type lists the built-in icon names accepted by widgets,
including `clock` and `dot`. For other icons, use a prefixed
[Lucide icon name](https://lucide.dev/icons/), such as `lucide:settings`,
`lucide:play`, or `lucide:music`. Vendor-prefixed icon names are also accepted
by the server SDK; their availability depends on the deployment.

```ts
import type { Widgets } from '@openai/chatkit';

const button: Widgets.Button = {
  type: 'Button',
  iconStart: 'lucide:settings',
  label: 'Settings',
};
```
