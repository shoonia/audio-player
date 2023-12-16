import { readyStore } from '../store';

export const App: JSX.FC = () => {
  return (
    <main ref={readyStore}>
      <h1>Audio Player</h1>
    </main>
  );
}
