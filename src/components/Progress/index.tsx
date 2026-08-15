import { signal } from 'jsx-dom-runtime';

import s from './styles.module.css';
import { connect } from '../../store';
import { toHHMMSS } from './utils';

export const Progress: JSX.FC = () => {
  const maxText = signal();
  const timeText = signal();

  const maxAttr = signal(0);
  const valueAttr = signal(0);

  connect('max', (state) => {
    maxText.set(toHHMMSS(state.max));
    maxAttr.set(state.max);
  });

  connect('time', (state) => {
    timeText.set(toHHMMSS(state.time));
    valueAttr.set(state.time);
  });

  return (
    <div class={s.box}>
      <strong>{maxText}</strong> / {timeText}
      <progress
        class={s.progress}
        max={maxAttr}
        value={valueAttr}
      />
    </div>
  );
}
