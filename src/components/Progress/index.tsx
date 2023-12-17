import { useText, type RefCallback } from 'jsx-dom-runtime';

import { _box, _progress } from './styles.module.css';
import { connect, getState } from '../../store';
import { toHHMMSS } from './utils';

export const Progress: JSX.FC = () => {
  const s = getState();

  const [max, setMax] = useText(toHHMMSS(s.max));
  const [time, setTime] = useText(toHHMMSS(s.time));

  const ready: RefCallback<HTMLProgressElement> = (progress) => {
    connect('max', (state) => {
      progress.max = state.max;
      setMax(toHHMMSS(state.max));
    });

    connect('time', (state) => {
      progress.value = state.time;
      setTime(toHHMMSS(state.time));
    });
  }

  return (
    <div class={_box}>
      <strong>{max}</strong> / {time}
      <progress
        ref={ready}
        class={_progress}
        max={s.max}
        value={s.time}
      />
    </div>
  );
}
