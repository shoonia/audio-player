import s from './App.module.css';
import { readyStore } from '../store';
import { Input } from './Input';
import { Progress } from './Progress';
import { Player } from './Player';

export const App: JSX.FC = () => (
  <main ref={readyStore} class={s.main}>
    <h1 class={s.title}>
      Audio Player
    </h1>
    <Progress />
    <Player />
    <Input />
  </main>
);
