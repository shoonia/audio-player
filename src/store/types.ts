export interface IState {
  readonly url: string;
  readonly time: number;
  readonly max: number;
}

export interface IEvets {
  'set/url': string;
  'set/time': readonly [time: number, force: boolean];
  'set/max': number;
}
