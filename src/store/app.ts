import type { StoreonModule } from 'storeon-velo';

import type { IEvets, IState } from './types';

const urlKey = 'audio-player-url'

export const app: StoreonModule<IState, IEvets> = (store) => {
  store.on('@init', () => {
    return {
      url: localStorage.getItem(urlKey) ?? '',
    };
  });

  store.on('set/url', (_, url) => {
    localStorage.setItem(urlKey, url);

    return { url };
  });
}
