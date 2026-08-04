import { useText } from 'jsx-dom-runtime';

import { _box, _progress } from './styles.module.css';
import { connect } from '../../store';
import { toHHMMSS } from './utils';

export const Progress: JSX.FC = () => {
  const [max, setMax] = useText(toHHMMSS(0));
  const [time, setTime] = useText(toHHMMSS(0));

  const ready: JSX.Ref<HTMLProgressElement> = (progress) => {
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
        max={0}
        value={0}
      />
    </div>
  );
}
