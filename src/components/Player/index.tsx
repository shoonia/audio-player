import type { RefCallback } from 'jsx-dom-runtime';

import { connect, dispatch } from '../../store';

export const Player: JSX.FC = () => {
  const ready: RefCallback<HTMLAudioElement> = (audio) => {
    let i: number;

    const setTime = () =>
      dispatch('set/time', ~~audio.currentTime);

    audio.addEventListener('play', () => {
      i = setInterval(setTime, 1000);
    });

    audio.addEventListener('pause', () => {
      clearInterval(i);
      setTime();
    });

    connect('url', (state) => {
      audio.src = state.url;
      audio.currentTime = state.time;
    });
  }

  return (
    <div>
      <audio
        ref={ready}
        preload="metadata"
        controls
      />
    </div>
  )
}
