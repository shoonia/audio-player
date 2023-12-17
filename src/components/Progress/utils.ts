const nn = (n: number): string => (n < 10 ? '0' : '') + n;

export const toHHMMSS = (seconds: number): string => {
  const hours = ~~(seconds / 3600);
  const minutes = ~~((seconds % 3600) / 60);

  return `${nn(hours)}:${nn(minutes)}:${nn((seconds % 60))}`;
}
