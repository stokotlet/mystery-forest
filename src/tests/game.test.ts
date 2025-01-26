import { expect, it, beforeEach, describe } from '@jest/globals';
import { Game } from '../controller/controller';
import { TurnOnTheRightState } from '../model/state';

describe('game test', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  it('should turn on the right', () => {
    game = new Game();
    game.setNextStep('1');

    expect(game.state).toBeInstanceOf(TurnOnTheRightState);
  });

  it('should output message', () => {
    game = new Game();
    const EXPECTED_TEXT =
      'Вы смело идёте по скрипящим доскам моста, но в середине пути слышите треск. Мост обрушивается под вами, и вы падаете в холодную воду реки. Вы теряете сознание...';

    game.setNextStep('1');
    game.setNextStep('1');

    expect(game.state.text).toBe(EXPECTED_TEXT);
  });

  it('should handle wrong action', () => {
    game = new Game();
    expect(game.setNextStep('unknownAction')).toBeUndefined();
  });
});
