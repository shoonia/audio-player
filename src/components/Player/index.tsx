import { type RefCallback, useRef, useText } from 'jsx-dom-runtime';

import { _audio, _btn } from './styles.module.css';
import { connect, dispatch } from '../../store';

const enum LABEL {
  PLAY = 'Play',
  PAUSE = 'Pause',
}

export const Player: JSX.FC = () => {
  const [label, setLabel] = useText(LABEL.PLAY);
  const button = useRef<HTMLButtonElement>();

  const ready: RefCallback<HTMLAudioElement> = (audio) => {
    let i: number;

    const setTime = () =>
      dispatch('set/time', ~~audio.currentTime);

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
    });

    connect('url', (state) => {
      audio.src = state.url;
      audio.currentTime = state.time;
    });


    const disconnect = connect(() => {
      button.current.addEventListener('click', () => {
        if (audio.paused) audio.play();
        else audio.pause();
      });

      disconnect();
    });
  }

  return (
    <div>
      <audio
        ref={ready}
        class={_audio}
        preload="metadata"
        controls
        controlsList="nodownload"
      />
      <div>
        <button ref={button} class={_btn} type="button" disabled>
          {label}
        </button>
      </div>
    </div>
  )
}
