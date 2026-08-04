const nn = (n: number): string => n.toString().padStart(2, '0');

export const toHHMMSS = (sec: number): string => {
  return `${nn(~~(sec / 3600))}:${nn(~~(sec % 3600 / 60))}:${nn(sec % 60)}`;
}
