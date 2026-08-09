import { useText } from 'jsx-dom-runtime';

import s from './styles.module.css';
import { connect, setState, dispatch } from '../../store';

const enum LABEL {
  PLAY = 'Play',
  PAUSE = 'Pause',
}

export const Player: JSX.FC = () => {
  const [label, setLabel] = useText(LABEL.PLAY);

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

  const ready: JSX.Ref<HTMLButtonElement> = (button) => {
    let i: number;

    const pause = () => {
      clearInterval(i);
      dispatch('set/time', [audio.currentTime, true]);
      setLabel(LABEL.PLAY);
    };

    const tiker = () =>
      dispatch('set/time', [audio.currentTime, false]);

    audio.addEventListener('pause', pause);
    audio.addEventListener('ended', pause);

    audio.addEventListener('play', () => {
      i = setInterval(tiker, 1000);
      setLabel(LABEL.PAUSE);
    });

    audio.addEventListener('canplay', () => {
      if (audio.seeking) return;
      if (audio.paused) setLabel(LABEL.PLAY);

      button.disabled = false;
      dispatch('set/max', audio.duration);
    });

    connect('url', (state) => {
      if (state.url) audio.src = state.url;
      button.disabled = true;
      audio.currentTime = state.time;
    });
  };

  return (
    <div class={s.player}>
      <button
        ref={ready}
        type="button"
        class={s.btn}
        on:click={toggle}
        disabled
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
