import type { StoreonModule } from 'storeon-velo';

import type { IEvets, IState } from './types';

const enum KEY {
  URL = 'audio-player-url',
  TIME = 'audio-player-time',
  MAX = 'audio-player-max',
}

export const app: StoreonModule<IState, IEvets> = (store) => {
  const url = new URL(location.href);

  store.on('@init', () => {
    return {
      url: localStorage.getItem(KEY.URL) ?? '',
      max: ~~Number(localStorage.getItem(KEY.MAX)),
      time: ~~Number(url.searchParams.get('time') ?? localStorage.getItem(KEY.TIME)),
    };
  });

  store.on('set/url', ({ url }, newUrl) => {
    if (url !== newUrl) {
      localStorage.setItem(KEY.URL, newUrl);
      localStorage.removeItem(KEY.TIME);
      localStorage.removeItem(KEY.MAX);

      return {
        url: newUrl,
        max: 0,
        time: 0,
      };
    }
  });

  store.on('set/time', ({ time }, newTime) => {
    if (time !== newTime) {
      localStorage.setItem(KEY.TIME, '' + newTime);
      history.replaceState('', '', '?time=' + newTime);

      return {
        time: newTime,
      };
    }
  });

  store.on('set/max', ({ max }, newMax) => {
    if (max !== newMax) {
      localStorage.setItem(KEY.MAX, '' + newMax);

      return {
        max: newMax,
      };
    }
  });
}
