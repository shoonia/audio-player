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

  const ready: JSX.Ref<HTMLButtonElement> = (button) => {
    let i: number;

    const setTime = (force: boolean) =>
      dispatch('set/time', { time: ~~audio.currentTime, force });

    audio.addEventListener('play', () => {
      i = setInterval(setTime, 1000, false);
      setLabel(LABEL.PAUSE);
    });

    audio.addEventListener('pause', () => {
      clearInterval(i);
      setTime(true);
      setLabel(LABEL.PLAY);
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
    <button
      ref={ready}
      type="button"
      class={s.btn}
      on:click={toggle}
      disabled
    >
      {label}
    </button>
  );
}
