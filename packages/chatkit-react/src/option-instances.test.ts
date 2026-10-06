import { describe, expect, it } from 'vitest';
import type { ChatKitOptions, HostedApiConfig } from '@openai/chatkit';
import {
  deepEqualIgnoringFns,
  withLatestFunctionWrappers,
} from './useStableOptions';

class HostedApi implements HostedApiConfig {
  #secret: string;
  constructor(secret: string) {
    this.#secret = secret;
  }
  async getClientSecret(current: string | null): Promise<string> {
    return current === null ? this.#secret : `${this.#secret}-refreshed`;
  }
}

describe('non-plain option values', () => {
  it('preserves a structurally valid API instance and its prototype method', async () => {
    const api = new HostedApi('synthetic-first');
    const ref: { current: ChatKitOptions } = { current: { api } };
    const options = withLatestFunctionWrappers(ref);
    expect(options.api).toBe(api);
    expect(await (options.api as HostedApiConfig).getClientSecret(null)).toBe(
      'synthetic-first',
    );
    expect(await (options.api as HostedApiConfig).getClientSecret('old')).toBe(
      'synthetic-first-refreshed',
    );
  });

  it('detects a replacement instance and preserves the newly shaped value', async () => {
    const first: ChatKitOptions = { api: new HostedApi('synthetic-first') };
    const second: ChatKitOptions = { api: new HostedApi('synthetic-second') };
    expect(deepEqualIgnoringFns(first, second)).toBe(false);
    const next = withLatestFunctionWrappers({ current: second });
    expect(next.api).toBe(second.api);
    expect(await (next.api as HostedApiConfig).getClientSecret(null)).toBe(
      'synthetic-second',
    );
  });

  it.each([
    ['date', new Date(0)],
    ['map', new Map([['key', 'value']])],
    ['set', new Set(['value'])],
    ['bytes', new Uint8Array([0, 255])],
    ['url', new URL('https://example.invalid/fixture')],
  ])('preserves the identity and prototype of %s leaves', (_name, value) => {
    const ref = { current: { nested: [value] } };
    const result = withLatestFunctionWrappers(ref);
    expect(result).not.toBe(ref.current);
    expect(result.nested).not.toBe(ref.current.nested);
    expect(result.nested[0]).toBe(value);
  });

  it('continues refreshing functions in surrounding plain objects', () => {
    const instance = new HostedApi('synthetic');
    const ref = {
      current: {
        api: instance,
        settings: {
          value: 1,
          read() {
            return this.value;
          },
        },
      },
    };
    const result = withLatestFunctionWrappers(ref);
    expect(result.settings.read()).toBe(1);
    ref.current = {
      api: instance,
      settings: {
        value: 2,
        read() {
          return this.value * 3;
        },
      },
    };
    expect(result.settings.read()).toBe(6);
    expect(result.api).toBe(instance);
  });

  it('continues wrapping null-prototype plain objects', () => {
    const obj = Object.assign(Object.create(null), {
      value: 3,
      read() {
        return this.value;
      },
    });
    const ref = { current: { obj } };
    const result = withLatestFunctionWrappers(ref);
    expect(result.obj).not.toBe(obj);
    expect(result.obj.read()).toBe(3);
    ref.current.obj = Object.assign(Object.create(null), {
      value: 4,
      read() {
        return this.value * 2;
      },
    });
    expect(result.obj.read()).toBe(8);
  });
});
