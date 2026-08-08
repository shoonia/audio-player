import { useAttr, useText } from 'jsx-dom-runtime';

export const signal = (value = '') => {
  const subs = new Set<(val: string) => void>();

  return {
    get value() {
      return value;
    },
    attr(name: string) {
      const [a, update] = useAttr(name, value);
      subs.add(update);
      return a;
    },
    text() {
      const [t, update] = useText(value);
      subs.add(update);
      return t;
    },
    set(val: string) {
      value = val;
      subs.forEach(update => update(val));
    },
  };
};
