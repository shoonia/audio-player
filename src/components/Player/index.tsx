import { type RefCallback, useRef, useText } from 'jsx-dom-runtime';

import { _time, _btn } from './styles.module.css';
import { connect, dispatch } from '../../store';
import { toHHMMSS } from './utils';

const enum LABEL {
  PLAY = 'Play',
  PAUSE = 'Pause',
}

export const Player: JSX.FC = () => {
  const t = toHHMMSS(0)

  const [label, setLabel] = useText(LABEL.PLAY);
  const [duration, setDuration] = useText(t);
  const [progress, setProgress] = useText(t);

  const ready: RefCallback<HTMLButtonElement> = (button) => {
    const audio = new Audio();

    let i: number;

    const setTime = () => {
      const c = ~~audio.currentTime;

      setProgress(toHHMMSS(c));
      dispatch('set/time', c);
    };

    button.addEventListener('click', () => {
      if (audio.paused) audio.play();
      else audio.pause();
    });

    audio.addEventListener('play', () => {
      i = setInterval(setTime, 1000);
      setLabel(LABEL.PAUSE);
    });

    audio.addEventListener('pause', () => {
      clearInterval(i);
      setTime();
      setLabel(LABEL.PLAY);
    });

    audio.addEventListener('canplay', () => {
      button.disabled = false;
      setLabel(LABEL.PLAY);
      setDuration(toHHMMSS(~~audio.duration));
      setProgress(toHHMMSS(~~audio.currentTime));
    });

    connect('url', (state) => {
      button.disabled = true;
      audio.src = state.url;
      audio.currentTime = state.time;
      setDuration(t);
      setProgress(t);
    });
  };

  return (
    <>
      <div class={_time}>
        <strong>{duration}</strong> / {progress}
      </div>
      <button ref={ready} class={_btn} type="button" disabled>
        {label}
      </button>
    </>
  );
}
