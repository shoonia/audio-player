export interface IState {
  readonly url: string;
  readonly time: number;
  readonly max: number;
}

export interface IEvets {
  'set/url': string;
  'set/time': number;
  'set/max': number;
}
