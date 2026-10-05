// @vitest-environment happy-dom
import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { ChatKit } from './ChatKit';
import type { ChatKitControl } from './useChatKit';

class TestChatKit extends HTMLElement {
  setOptions = vi.fn(() => {
    this.dispatchEvent(new CustomEvent('chatkit.ready'));
    this.dispatchEvent(
      new CustomEvent('chatkit.error', {
        detail: { error: new Error('Synthetic configuration error') },
      }),
    );
  });
}

let container: HTMLDivElement;
let root: Root;
let mounted = false;

function control(handlers: ChatKitControl['handlers'] = {}): ChatKitControl {
  return {
    options: {
      api: { url: '/synthetic-api', domainKey: 'synthetic-domain-key' },
    },
    handlers,
    setInstance: vi.fn(),
  };
}

async function render(value: ChatKitControl, strict = false) {
  await React.act(async () => {
    const child = <ChatKit control={value} />;
    root.render(strict ? <React.StrictMode>{child}</React.StrictMode> : child);
  });
  return container.querySelector('openai-chatkit') as TestChatKit;
}

beforeAll(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  customElements.define('openai-chatkit', TestChatKit);
});
beforeEach(() => {
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
  mounted = true;
});
afterEach(async () => {
  if (mounted) await React.act(async () => root.unmount());
  container.remove();
  vi.restoreAllMocks();
});

describe('ChatKit event subscription', () => {
  it('receives synchronous ready and error events from initial configuration', async () => {
    const onReady = vi.fn();
    const onError = vi.fn();
    const element = await render(control({ onReady, onError }));
    expect(element.setOptions).toHaveBeenCalledTimes(1);
    expect(onReady).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith({
      error: expect.objectContaining({
        message: 'Synthetic configuration error',
      }),
    });
  });

  it('uses current handlers for events emitted by updated options', async () => {
    const first = vi.fn();
    const second = vi.fn();
    await render(control({ onReady: first }));
    first.mockClear();
    await render(control({ onReady: second }));
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });

  it('has exactly one listener per event during Strict Mode effect replay', async () => {
    const onReady = vi.fn();
    const element = await render(control({ onReady }), true);
    expect(onReady).toHaveBeenCalledTimes(element.setOptions.mock.calls.length);
    onReady.mockClear();
    element.dispatchEvent(new CustomEvent('chatkit.ready'));
    expect(onReady).toHaveBeenCalledTimes(1);
  });

  it('receives configuration events when the definition arrives later', async () => {
    let define!: () => void;
    const definition = new Promise<CustomElementConstructor>((resolve) => {
      define = () => resolve(TestChatKit);
    });
    vi.spyOn(customElements, 'get').mockReturnValue(undefined);
    vi.spyOn(customElements, 'whenDefined').mockReturnValue(definition);
    const onReady = vi.fn();
    const element = await render(control({ onReady }));
    expect(element.setOptions).not.toHaveBeenCalled();
    await React.act(async () => define());
    expect(onReady).toHaveBeenCalledTimes(1);
  });

  it('does not configure an unmounted element after late definition', async () => {
    let define!: () => void;
    const definition = new Promise<CustomElementConstructor>((resolve) => {
      define = () => resolve(TestChatKit);
    });
    vi.spyOn(customElements, 'get').mockReturnValue(undefined);
    vi.spyOn(customElements, 'whenDefined').mockReturnValue(definition);
    const element = await render(control());
    await React.act(async () => root.unmount());
    mounted = false;
    await React.act(async () => define());
    expect(element.setOptions).not.toHaveBeenCalled();
  });

  it('removes subscriptions on unmount', async () => {
    const onReady = vi.fn();
    const element = await render(control({ onReady }));
    onReady.mockClear();
    await React.act(async () => root.unmount());
    mounted = false;
    element.dispatchEvent(new CustomEvent('chatkit.ready'));
    expect(onReady).not.toHaveBeenCalled();
  });
});
