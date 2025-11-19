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

const EVENT_HANDLER_MAP: {
  [K in keyof ChatKitEvents]: ToEventHandlerKey<K>;
} = {
  'chatkit.error': 'onError',
  'chatkit.response.end': 'onResponseEnd',
  'chatkit.response.start': 'onResponseStart',
  'chatkit.log': 'onLog',
  'chatkit.thread.change': 'onThreadChange',
  'chatkit.thread.load.start': 'onThreadLoadStart',
  'chatkit.thread.load.end': 'onThreadLoadEnd',
  'chatkit.ready': 'onReady',
};

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

    React.useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const eventNames = Object.keys(EVENT_HANDLER_MAP) as (keyof ChatKitEvents)[];
      const listeners = eventNames.map((eventName) => {
        const listener = (e: Event) => {
          const handler = control.handlers[EVENT_HANDLER_MAP[eventName]];
          if (typeof handler === 'function') {
            handler((e as CustomEvent).detail as any);
          }
        };
        el.addEventListener(eventName as string, listener as EventListener);
        return { eventName, listener };
      });

      return () => {
        for (const { eventName, listener } of listeners) {
          el.removeEventListener(eventName as string, listener as EventListener);
        }
      };
    }, [control.handlers]);

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
        }}
        {...htmlProps}
      />
    );
  },
);
