import { useRef } from 'jsx-dom-runtime';

import s from './styles.module.css';
import { connect, dispatch } from '../../store';

export const Input: JSX.FC = () => {
  const input = useRef<HTMLInputElement>();

  const clickHandler: JSX.EventListener = () =>
    dispatch('set/url', input.current.value.trim());

  connect('url', (state) => {
    input.current.value = state.url;
  });

  return (
    <details class={s.details}>
      <summary class={s.summary}>
        Audio source
      </summary>
      <div class={s.box}>
        <label class={s.label} aria-label="audio source">
          <input
            ref={input}
            type="url"
            name="url"
            class={s.url}
            autocomplete="on"
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
    </details>
  );
};
