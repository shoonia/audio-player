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
  }

  const setTime = (force: boolean, t = 0) => {
    const current = ~~(audio.currentTime += t);
    const duration = ~~audio.duration;
    const time = current < 0 ? 0 : current > duration ? duration : current;
    dispatch('set/time', { time, force });
  };

  const ready: JSX.Ref<HTMLButtonElement> = (button) => {
    let i: number;

    const pause = () => {
      clearInterval(i);
      setTime(true);
      setLabel(LABEL.PLAY);
    };

    audio.addEventListener('pause', pause);
    audio.addEventListener('ended', pause);

    audio.addEventListener('play', () => {
      i = setInterval(setTime, 1000, false);
      setLabel(LABEL.PAUSE);
    });

    audio.addEventListener('canplay', () => {
      button.disabled = false;
      setLabel(LABEL.PLAY);
      setState({ max: ~~audio.duration });
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
        <button type="button" class={s.btn} on:click={() => setTime(true, -10)}>
          - 10s
        </button>
        <button type="button" class={s.btn} on:click={() => setTime(true, 10)}>
          + 10s
        </button>
      </div>
    </div>
  );
}
