import { createStoreon } from 'storeon-velo';

import type { IState, IEvets } from './types';
import { app } from './app';

export const { readyStore, dispatch, connect, getState } = createStoreon<IState, IEvets>([
  app,
]);
