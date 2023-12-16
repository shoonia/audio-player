export interface IState {
  readonly url: string;
  readonly time: number;
}

export interface IEvets {
  'set/url': string;
  'set/time': number;
}
