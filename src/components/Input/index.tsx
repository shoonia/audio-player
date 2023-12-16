import { useRef, type RefObject } from 'jsx-dom-runtime';

import { connect, dispatch } from '../../store';

export const Input: JSX.FC = () => {
  const input: RefObject<HTMLInputElement> = useRef();

  const clickHandler: EventListener = () =>
    dispatch('set/url', input.current.value);

  connect('url', (state) => {
    input.current.value = state.url;
  });

  return (
    <div>
      <input ref={input} type="url" autocomplete="url" />
      <button type="button" onclick={clickHandler}>
        Add
      </button>
    </div>
  );
};
