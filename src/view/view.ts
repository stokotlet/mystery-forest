import readline from 'readline';
import { Game } from '../controller/controller';

export class View {
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  render() {
    const readLine = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const handleUserChoice = (choice: string) => {
      this.game.setNextStep(choice);
      readLine.question('\nВведите цифру выбранного вами ответа: ', (answer) => {
        handleUserChoice(answer);
      });
    };

    this.game.render();

    readLine.question('\nВведите цифру выбранного вами ответа: ', (answer) => {
      handleUserChoice(answer);
    });
  }
}
