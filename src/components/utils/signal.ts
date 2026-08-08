import { useAttr, useText } from 'jsx-dom-runtime';

interface Signal {
  readonly value: string;
  set(val: string): void;
  attr(name: string): Attr;
  text(): Text;
}

export const signal = (value = ''): Signal => {
  const subs = new Set<(val: string) => void>();

  return {
    get value() {
      return value;
    },
    set(val) {
      value = val;
      subs.forEach(update => update(val));
    },
    attr(name) {
      const [a, update] = useAttr(name, value);
      subs.add(update);
      return a;
    },
    text() {
      const [t, update] = useText(value);
      subs.add(update);
      return t;
    },
  };
};
