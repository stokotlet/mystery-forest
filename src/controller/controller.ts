import { RED_TEXT, RESET_TEXT } from '../constants';
import { StartState } from '../model/state';
import { StateConstructor } from '../model/interfaces';
export class Game {
  state: InstanceType<StateConstructor> = new StartState();

  setNextStep(actionId: string) {
    const nextStep = this.state.getNextStep(actionId);

    if (!nextStep) {
      console.clear();
      console.log(
        `${RED_TEXT}Проверьте правильность ввода. Вводить необходимо номер действия\n${RESET_TEXT}`,
      );

      this.state.render();
      return;
    }

    this.state = nextStep;
    this.render();
  }

  render() {
    console.clear();
    this.state.render();
  }
}
