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
      sendAudioData({ url: newUrl, time: 0 });
      return {
        url: newUrl,
        max: 0,
        time: 0,
      };
    }
  });

  store.on('set/time', ({ time }, newTime) => {
    if (time !== newTime) {
      if (newTime % 10 === 0) {
        sendAudioData({ time: newTime });
      }
      return {
        time: newTime,
      };
    }
  });

  getAudioData().then(store.set);
}
