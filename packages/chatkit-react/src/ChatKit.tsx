import * as React from 'react';
import type { ChatKitControl, ToEventHandlerKey } from './useChatKit';
import type { OpenAIChatKit, ChatKitEvents } from '@openai/chatkit';

export interface ChatKitProps extends React.HTMLAttributes<OpenAIChatKit> {
  control: ChatKitControl;
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'openai-chatkit': React.DetailedHTMLProps<
        React.HTMLAttributes<OpenAIChatKit>,
        OpenAIChatKit
      >;
    }
  }
}

export const ChatKit = React.forwardRef<OpenAIChatKit, ChatKitProps>(
  function ChatKit({ control, ...htmlProps }, forwardedRef) {
    const ref = React.useRef<OpenAIChatKit | null>(null);

    React.useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      // Fast path: element is already defined
      if (customElements.get('openai-chatkit')) {
        el.setOptions(control.options);
        return;
      }
      // Fallback path: wait for definition
      let active = true;
      customElements.whenDefined('openai-chatkit').then(() => {
        if (active) {
          el.setOptions(control.options);
        }
      });
      return () => {
        active = false;
      };
    }, [control.options]);

    return (
      <openai-chatkit
        ref={(chatKit) => {
          ref.current = chatKit;

          control.setInstance(chatKit);

          if (typeof forwardedRef === 'function') {
            forwardedRef(chatKit);
          } else if (forwardedRef) {
            forwardedRef.current = chatKit;
          }

          if (!ref.current) {
            return;
          }

          const events: {
            [K in keyof ChatKitEvents]: ToEventHandlerKey<K>;
          } = {
            'chatkit.error': 'onError',
            'chatkit.response.end': 'onResponseEnd',
            'chatkit.response.start': 'onResponseStart',
            'chatkit.log': 'onLog',
            'chatkit.thread.change': 'onThreadChange',
            'chatkit.thread.load.start': 'onThreadLoadStart',
            'chatkit.thread.load.end': 'onThreadLoadEnd',
          };

          const eventNames = Object.keys(events) as (keyof ChatKitEvents)[];

          for (const event of eventNames) {
            ref.current.addEventListener(event, (e) => {
              const handler = control.handlers[events[event]];
              if (typeof handler === 'function') {
                handler(e.detail as any);
              }
            });
          }
        }}
        {...htmlProps}
      />
    );
  },
);
