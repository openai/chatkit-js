import type { OpenAIChatKit } from './index';

declare global {
  interface HTMLElementTagNameMap {
    'openai-chatkit': OpenAIChatKit;
  }

  namespace JSX {
    interface IntrinsicElements {
      'openai-chatkit': Partial<OpenAIChatKit>;
    }
  }
}

export {};
