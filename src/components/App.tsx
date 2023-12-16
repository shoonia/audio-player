import { readyStore } from '../store';
import { Input } from './Input';
import { Player } from './Player';

export const App: JSX.FC = () => {
  return (
    <main ref={readyStore}>
      <h1>Audio Player</h1>
      <Input />
      <Player />
    </main>
  );
}
