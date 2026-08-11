import { dispatch } from "../../store";
import s from "./styles.module.css";

export const Reload: JSX.FC = () => (
  <button
    type="button"
    on:click={() => dispatch('@ready')}
    class={s.btn}
  >
    Reload
  </button>
);
