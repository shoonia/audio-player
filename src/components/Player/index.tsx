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

  const button = useRef<HTMLButtonElement>();
  const [label, setLabel] = useText(LABEL.PLAY);
  const [duration, setDuration] = useText(t);
  const [progress, setProgress] = useText(t);

  const ready: RefCallback<HTMLAudioElement> = (audio) => {
    let i: number;

    const setTime = () => {
      const i = ~~audio.currentTime

      setProgress(toHHMMSS(i));
      dispatch('set/time', i);
    };

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
      button.current.disabled = false;
      setLabel(LABEL.PLAY);
      setDuration(toHHMMSS(~~audio.duration));
    });

    connect('url', (state) => {
      audio.src = state.url;
      audio.currentTime = state.time;
    });

    const off = connect(() => {
      off();
      button.current.addEventListener('click', () => {
        if (audio.paused) audio.play();
        else audio.pause();
      });
    });
  };

  return (
    <>
      <div class={_time}>
        <audio ref={ready} preload="metadata" />
        <strong>{duration}</strong> / {progress}
      </div>
      <button ref={button} class={_btn} type="button" disabled>
        {label}
      </button>
    </>
  );
}
