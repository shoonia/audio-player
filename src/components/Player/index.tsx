import { useText } from 'jsx-dom-runtime';

import { _btn } from './styles.module.css';
import { connect, setState } from '../../store';

const enum LABEL {
  PLAY = 'Play',
  PAUSE = 'Pause',
}

export const Player: JSX.FC = () => {
  const [label, setLabel] = useText(LABEL.PLAY);

  const ready: JSX.Ref<HTMLButtonElement> = (button) => {
    const audio = new Audio();

    let i: number;

    const setTime = () => setState({ 
      time: ~~audio.currentTime,
    });

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
      setState({  max: ~~audio.duration });
    });

    connect('url', (state) => {
      if (state.url) audio.src = state.url;
      button.disabled = true;
      audio.currentTime = state.time;
    });
  };

  return (
    <button ref={ready} class={_btn} type="button" disabled>
      {label}
    </button>
  );
}
