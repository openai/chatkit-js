import { describe, expect, it, vitest } from 'vitest';

import {
  deepEqualIgnoringFns,
  withLatestFunctionWrappers,
} from './useStableOptions';

describe('deepEqualIgnoringFns', () => {
  it('compares primitives with Object.is semantics (including -0 and NaN)', () => {
    expect(deepEqualIgnoringFns(1, 1)).toBe(true);
    expect(deepEqualIgnoringFns('a', 'a')).toBe(true);
    expect(deepEqualIgnoringFns(true, true)).toBe(true);
    expect(deepEqualIgnoringFns(null, null)).toBe(true);
    expect(deepEqualIgnoringFns(undefined, undefined)).toBe(true);

    expect(deepEqualIgnoringFns(NaN, NaN)).toBe(true);
    expect(deepEqualIgnoringFns(0, -0)).toBe(false);
    expect(deepEqualIgnoringFns('1', 1)).toBe(false);
    expect(deepEqualIgnoringFns(null, undefined)).toBe(false);
  });

  it('only checks that functions are still functions when comparing', () => {
    const a = { x: 1, onClick: () => 1 };
    const b = { x: 1, onClick: () => 2 };
    const c = { x: 1, onClick: null };

    expect(deepEqualIgnoringFns(a, b)).toBe(true);
    expect(deepEqualIgnoringFns(a, c)).toBe(false);
  });

  it('detects inequality when non-function fields differ', () => {
    const a = { x: 1, y: { z: 3 }, f: () => {} };
    const b = { x: 2, y: { z: 3 }, f: () => {} };
    const c = { x: 1, y: { z: 4 }, f: () => {} };

    expect(deepEqualIgnoringFns(a, b)).toBe(false);
    expect(deepEqualIgnoringFns(a, c)).toBe(false);
  });

  it('handles arrays deeply (order & length matter)', () => {
    expect(deepEqualIgnoringFns([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEqualIgnoringFns([1, 2, 3], [1, 3, 2])).toBe(false);
    expect(deepEqualIgnoringFns([1, () => {}, 3], [1, () => {}, 3])).toBe(true);
    expect(deepEqualIgnoringFns([1, 2], [1, 2, 3])).toBe(false);
  });

  it('returns false when object keys differ', () => {
    const a = { x: 1, y: 2 };
    const b = { x: 1, y: 2, z: 3 };
    const c = { x: 1 };

    expect(deepEqualIgnoringFns(a, b)).toBe(false);
    expect(deepEqualIgnoringFns(a, c)).toBe(false);
  });

  it('short-circuits on first observable difference (sanity check)', () => {
    const a = { a: 1, b: { c: 2 }, d: 3 };
    const b = { a: 999, b: { c: 2 }, d: 3 };
    expect(deepEqualIgnoringFns(a, b)).toBe(false);
  });

  it('supports cyclic references and compares shape correctly', () => {
    const a: Record<string, unknown> = { x: 1 };
    a.self = a;

    const b: Record<string, unknown> = { x: 1 };
    b.self = b;

    const c: Record<string, unknown> = { x: 2 };
    c.self = c;

    expect(deepEqualIgnoringFns(a, b)).toBe(true);
    expect(deepEqualIgnoringFns(a, c)).toBe(false);
  });

  it('treats non-plain objects (Date/Map/Set) as unequal unless same reference', () => {
    const d1 = new Date(0);
    const d2 = new Date(0);
    const dRef = d1;

    expect(deepEqualIgnoringFns(d1, d2)).toBe(false);
    expect(deepEqualIgnoringFns(d1, dRef)).toBe(true);

    const m1 = new Map([['k', 1]]);
    const m2 = new Map([['k', 1]]);
    const mRef = m1;

    expect(deepEqualIgnoringFns(m1, m2)).toBe(false);
    expect(deepEqualIgnoringFns(m1, mRef)).toBe(true);

    const s1 = new Set([1, 2]);
    const s2 = new Set([1, 2]);
    const sRef = s1;

    expect(deepEqualIgnoringFns(s1, s2)).toBe(false);
    expect(deepEqualIgnoringFns(s1, sRef)).toBe(true);
  });

  it('handles nullish and primitive/object cross types', () => {
    expect(deepEqualIgnoringFns(null, {})).toBe(false);
    expect(deepEqualIgnoringFns(undefined, {})).toBe(false);
    expect(deepEqualIgnoringFns(1, {})).toBe(false);
    expect(deepEqualIgnoringFns([], {})).toBe(false);
  });

  it('ignores function differences deeply nested', () => {
    const a = { a: { b: { c: { f: () => 'a' } } } };
    const b = { a: { b: { c: { f: () => 'b' } } } };
    expect(deepEqualIgnoringFns(a, b)).toBe(true);
  });

  it('compares arrays with nested objects and ignored functions', () => {
    const a = [{ x: 1, f: () => {} }, { y: 2 }];
    const b = [{ x: 1, f: () => 'changed' }, { y: 2 }];
    const c = [{ x: 1, f: () => {} }, { y: 999 }];
    expect(deepEqualIgnoringFns(a, b)).toBe(true);
    expect(deepEqualIgnoringFns(a, c)).toBe(false);
  });
});

const latestRef = <T>(current: T) => ({ current });

describe('withLatestFunctionWrappers', () => {
  it('wraps top-level functions and calls the latest version', () => {
    const ref = latestRef({
      value: 1,
      fn: (x: number) => x + 1,
    });

    const wrapped = withLatestFunctionWrappers(ref);
    expect(typeof wrapped.fn).toBe('function');
    expect(wrapped.fn(1)).toBe(2);

    ref.current = { value: 1, fn: (x: number) => x + 100 };
    expect(wrapped.fn(1)).toBe(101);
  });

  it('preserves `this` binding to the latest parent object', () => {
    const ref = latestRef({
      mult: 2,

      times(this: any, x: number) {
        return this.mult * x;
      },
    });

    const wrapped = withLatestFunctionWrappers(ref);
    expect(wrapped.times(3)).toBe(ref.current.times(3));

    ref.current = {
      mult: 5,

      times(this: any, x: number) {
        return this.mult * x;
      },
    };

    expect(wrapped.times(3)).toBe(ref.current.times(3));
  });

  it('handles nested structures and arrays', () => {
    const ref = latestRef({
      handlers: [
        {
          onClick: (n: number) => n + 1,
        },
        {
          onClick: (n: number) => n + 2,
        },
      ],
    });

    const wrapped = withLatestFunctionWrappers(ref);
    expect(wrapped.handlers).toHaveLength(2);
    expect(wrapped.handlers[0].onClick(1)).toBe(2);
    expect(wrapped.handlers[1].onClick(1)).toBe(3);

    ref.current = {
      handlers: [
        { onClick: (n: number) => n + 10 },
        { onClick: (n: number) => n + 20 },
      ],
    };

    expect(wrapped.handlers[0].onClick(1)).toBe(11);
    expect(wrapped.handlers[1].onClick(1)).toBe(21);
  });

  it('produces a new object/array identity but preserves primitives', () => {
    const base = {
      a: 1,
      b: 'x',
      c: null as null,
      d: undefined as undefined,
      obj: { k: 1, f: () => 1 },
      arr: [1, 2, () => 3],
    };
    const ref = latestRef(base);

    const wrapped = withLatestFunctionWrappers(ref);

    expect(wrapped).not.toBe(base);
    expect(wrapped.obj).not.toBe(base.obj);
    expect(wrapped.arr).not.toBe(base.arr);

    expect(wrapped.a).toBe(1);
    expect(wrapped.b).toBe('x');
    expect(wrapped.c).toBeNull();
    expect(wrapped.d).toBeUndefined();

    expect(typeof wrapped.obj.f).toBe('function');
    expect(typeof wrapped.arr[2]).toBe('function');
  });

  it('returns undefined if the latest function is missing (shape drift)', () => {
    const fn = vitest.fn((x: number) => x + 1);
    const ref = latestRef<{ maybe: { fn?: (x: number) => number } }>({
      maybe: { fn },
    });

    const wrapped = withLatestFunctionWrappers(ref);
    expect(wrapped.maybe.fn?.(1)).toBe(2);

    ref.current = { maybe: {} };

    expect(wrapped.maybe.fn?.(1)).toBeUndefined();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
