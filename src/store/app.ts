import type { StoreonModule } from 'storeon-velo';
import { sendAudioData, getAudioData } from './api';

import type { IEvets, IState } from './types';
import type { AudioData } from './api';

export const app: StoreonModule<IState, IEvets> = (store) => {
  store.on('@init', () => {
    return {
      url: '',
      max: 0,
      time: 0,
    };
  });

  store.on('set/url', (state, url) => {
    if (state.url !== url) {
      sendAudioData({ url, time: 0 });
      return {
        url,
        max: 0,
        time: 0,
      };
    }
  });

  store.on('set/time', (state, [time, force]) => {
    const data: AudioData = { time: ~~time };

    if (force || data.time % 10 === 0 && state.time !== data.time) {
      sendAudioData(data);
    }

    return data;
  });

  store.on('set/max', (_, max) => {
    return { max: ~~max };
  });

  getAudioData().then(store.set);
}
