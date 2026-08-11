interface Signal {
  readonly value: string;
  set(val: string): void;
  attr(name: string): Attr;
  text(): Text;
}

type Sub = (val: string) => void;

export const signal = (value = ''): Signal => {
  const subs: Sub[] = [];

  return {
    get value() {
      return value;
    },
    set(val) {
      if (val !== value) {
        value = val;
        for (let sub of subs) sub(value);
      }
    },
    attr(name) {
      const a = document.createAttribute(name);
      a.value = value;
      subs.push((val) => {
        a.value = val;
      });
      return a;
    },
    text() {
      const t = new Text(value);
      subs.push((val) => {
        t.nodeValue = val;
      });
      return t;
    },
  };
};
