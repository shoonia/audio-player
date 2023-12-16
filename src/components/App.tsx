import { _main, _title } from './App.module.css';
import { readyStore } from '../store';
import { Input } from './Input';
import { Player } from './Player';

export const App: JSX.FC = () => {
  return (
    <main ref={readyStore} class={_main}>
      <h1 class={_title}>Audio Player</h1>
      <Input />
      <Player />
    </main>
  );
}
