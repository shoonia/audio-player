import { signal } from 'jsx-dom-runtime';

import s from './styles.module.css';
import { connect, dispatch } from '../../store';

const enum LABEL {
  PLAY = 'Play',
  PAUSE = 'Pause',
}

export const Player: JSX.FC = () => {
  const label = signal(LABEL.PLAY);
  const disabled = signal(true);

  const audio = new Audio();

  const toggle: JSX.EventListener = () => {
    if (audio.paused) audio.play();
    else audio.pause();
  };

  const seekBy = (delta: number) => {
    const time = audio.currentTime + delta;
    audio.currentTime = time;
    dispatch('set/time', [time, true]);
  };

  let i: number;

  const pause = () => {
    clearInterval(i);
    dispatch('set/time', [audio.currentTime, true]);
    label.set(LABEL.PLAY);
  };

  const tiker = () =>
    dispatch('set/time', [audio.currentTime, false]);

  audio.addEventListener('pause', pause);
  audio.addEventListener('ended', pause);

  audio.addEventListener('play', () => {
    i = setInterval(tiker, 1000);
    label.set(LABEL.PAUSE);
  });

  audio.addEventListener('canplay', () => {
    if (audio.seeking) return;
    if (audio.paused) label.set(LABEL.PLAY);

    disabled.set(false);
    dispatch('set/max', audio.duration);
  });

  connect('url', (state) => {
    if (state.url) audio.src = state.url;
    disabled.set(true);
    audio.currentTime = state.time;
  });

  return (
    <div class={s.player}>
      <button
        type="button"
        class={s.btn}
        on:click={toggle}
        prop:disabled={disabled}
      >
        {label}
      </button>
      <div class={s.controls}>
        <button type="button" class={s.btn} aria-label="Rewind 10 seconds" on:click={() => seekBy(-10)}>
          -10s
        </button>
        <button type="button" class={s.btn} aria-label="Forward 10 seconds" on:click={() => seekBy(10)}>
          +10s
        </button>
      </div>
    </div>
  );
}
