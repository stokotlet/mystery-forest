import { Action, EndOfGame, State } from './state';

export interface IStateProps {
  title: string;
  text: string;
  actionList?: Action[];
}

export type StateConstructor<T extends State | EndOfGame = State | EndOfGame> = new () => T;
