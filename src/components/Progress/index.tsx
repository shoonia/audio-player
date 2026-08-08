import { signal } from '../utils/signal';

import s from './styles.module.css';
import { connect } from '../../store';
import { toHHMMSS } from './utils';

export const Progress: JSX.FC = () => {
  const maxText = signal();
  const timeText = signal();

  const maxAttr = signal('0');
  const valueAttr = signal('0');

  connect('max', (state) => {
    maxText.set(toHHMMSS(state.max));
    maxAttr.set(state.max + '');
  });

  connect('time', (state) => {
    timeText.set(toHHMMSS(state.time));
    valueAttr.set(state.time + '');
  });

  return (
    <div class={s.box}>
      <strong>{maxText.text()}</strong> / {timeText.text()}
      <progress
        class={s.progress}
        attributes={[maxAttr.attr('max'), valueAttr.attr('value')]}
      />
    </div>
  );
}
