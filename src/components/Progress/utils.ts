const nn = (n: number): string => (n < 10 ? '0' : '') + n;

export const toHHMMSS = (sec: number): string => {
  return `${nn(~~(sec / 3600))}:${nn(~~(sec % 3600 / 60))}:${nn(sec % 60)}`;
}
