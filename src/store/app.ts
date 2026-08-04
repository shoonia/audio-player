import type { StoreonModule } from 'storeon-velo';
import { sendAudioData, getAudioData } from './api';

import type { IEvets, IState } from './types';

export const app: StoreonModule<IState, IEvets> = (store) => {
  store.on('@init', () => {
    return {
      url: '',
      max: 0,
      time: 0,
    };
  });

  store.on('set/url', ({ url }, newUrl) => {
    if (url !== newUrl) {
      sendAudioData({ url, time: 0 });

      return {
        url: newUrl,
        max: 0,
        time: 0,
      };
    }
  });

  getAudioData().then(store.set);
}
