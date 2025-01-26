import { Game } from './controller/controller';
import { View } from './view/view';
const game = new Game();

const view = new View(game);
view.render();
