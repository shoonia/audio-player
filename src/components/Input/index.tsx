import { useRef, type RefObject } from 'jsx-dom-runtime';

import { _box, _label, _url, _btn } from './styles.module.css';
import { connect, dispatch } from '../../store';

export const Input: JSX.FC = () => {
  const input: RefObject<HTMLInputElement> = useRef();

  const clickHandler: EventListener = () =>
    dispatch('set/url', input.current.value);

  connect('url', (state) => {
    input.current.value = state.url;
  });

  return (
    <div class={_box}>
      <label class={_label} aria-label="audio source">
        <input ref={input} class={_url} type="url" autocomplete="url" />
      </label>
      <button type="button" class={_btn} onclick={clickHandler} aria-label="add">
        +
      </button>
    </div>
  );
};
