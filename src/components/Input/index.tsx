import s from './styles.module.css';
import { connect, dispatch } from '../../store';
import { signal } from '../utils/signal';

export const Input: JSX.FC = () => {
  const input = signal();

  const clickHandler: JSX.EventListener = () =>
    dispatch('set/url', input.value.trim());

  connect('url', (state) => {
    input.set(state.url);
  });

  return (
    <div class={s.box}>
      <label class={s.label} aria-label="audio source">
        <input
          type="url"
          name="url"
          class={s.url}
          autocomplete="on"
          attributes={input.attr('value')}
        />
      </label>
      <button
        type="button"
        class={s.btn}
        on:click={clickHandler}
        aria-label="add"
      >
        +
      </button>
    </div>
  );
};
