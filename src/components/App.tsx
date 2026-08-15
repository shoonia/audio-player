import s from './App.module.css';
import { readyStore } from '../store';
import { Input } from './Input';
import { Progress } from './Progress';
import { Player } from './Player';
import { Reload } from './Reload';

export const App: JSX.FC = () =>
  <div class={s.main} ref={readyStore}>
    <Reload />
    <main>
      <h1 class={s.title}>
        Audio Player
      </h1>
      <Progress />
      <Player />
      <Input />
    </main>
  </div>;
