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

  store.on('set/url', (s, url) => {
    if (s.url !== url) {
      sendAudioData({ url, time: 0 });
      return {
        url,
        max: 0,
        time: 0,
      };
    }
  });

  store.on('set/time', (s, { time, force }) => {
    if (force || s.time !== time && time % 10 === 0) {
      sendAudioData({ time });
    }

    return { time };
  });

  getAudioData().then(store.set);
}
