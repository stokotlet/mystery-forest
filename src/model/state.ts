import { RESET_TEXT, BOLD_TEXT } from '../constants';
import { IStateProps, StateConstructor } from './interfaces';

export class Action<T extends State = State> {
  constructor(
    public actionId: string,
    public actionTitle: string,
    public step: StateConstructor<T>,
  ) {
    this.actionId = actionId;
    this.actionTitle = actionTitle;
    this.step = step;
  }
}

export class State {
  readonly title: string;
  readonly text: string;
  protected readonly actionList?: Action[];

  constructor({ actionList, text, title }: IStateProps) {
    this.actionList = actionList;
    this.text = text;
    this.title = title;
  }

  getNextStep = (actionId: string) => {
    const userSelectedAction = this.actionList?.find((action) => action.actionId === actionId);

    if (!userSelectedAction) {
      return null;
    }

    const Step = userSelectedAction.step;

    return new Step();
  };

  render() {
    console.log(`${BOLD_TEXT}${this.title}\n${RESET_TEXT}`);
    console.log(`${this.text}\n`);
    this.actionList?.forEach((action, index) => {
      console.log(`${index + 1}. ${action.actionTitle}`);
    });
  }
}

export class StartState extends State {
  constructor() {
    super({
      actionList: [
        new Action('1', 'Направо', TurnOnTheRightState),
        new Action('2', 'Налево', TurnOnTheLeftState),
      ],
      text: 'Вы просыпаетесь в центре густого леса, окруженного туманом. Единственный звук, который вы слышите, — это ветер, шелестящий в листве деревьев. Перед вами две тропинки. Одна ведет направо, другая — налево.',
      title: 'Начало',
    });
  }
}

export class TurnOnTheRightState extends State {
  constructor() {
    super({
      actionList: [
        new Action('1', 'Перейти через мост', OldBridgeState),
        new Action('2', 'Вернуться назад', GoBack),
      ],
      text: 'Вы поворачиваете направо и идёте по узкой тропинке. Через некоторое время перед вами появляется старый мост, ведущий через бурную реку.',
      title: 'Направо',
    });
  }
}

class OldBridgeState extends State {
  constructor() {
    super({
      actionList: [new Action('1', 'Конец игры', EndOfGame)],
      text: 'Вы смело идёте по скрипящим доскам моста, но в середине пути слышите треск. Мост обрушивается под вами, и вы падаете в холодную воду реки. Вы теряете сознание...',
      title: 'Перейти через мост',
    });
  }
}

class GoBack extends State {
  constructor() {
    super({
      actionList: [new Action('1', 'К развилке', StartState)],
      text: 'Вы решаете не рисковать и возвращаетесь к развилке.',
      title: 'Вернуться назад',
    });
  }
}

class TurnOnTheLeftState extends State {
  constructor() {
    super({
      actionList: [
        new Action('1', 'Войти в хижину', EnterToHouseState),
        new Action('2', 'Постучать в дверь', KnockOnTheDoorState),
      ],
      text: 'Вы сворачиваете налево, и тропинка выводит вас к небольшой хижине. Из окна виден тусклый свет, а дверь приоткрыта.',
      title: 'Налево',
    });
  }
}

class EnterToHouseState extends State {
  constructor() {
    super({
      actionList: [new Action('1', 'Конец игры', EndOfGame)],
      text: 'Вы решаете войти в хижину, но как только переступаете порог, дверь захлопывается за вашей спиной. Внутри пусто, только звук капающей воды раздается в тишине. Кажется, что вы попали в ловушку.',
      title: 'Войти в хижину',
    });
  }
}

class KnockOnTheDoorState extends State {
  constructor() {
    super({
      actionList: [new Action('1', 'Конец игры', EndOfGame)],
      text: 'Вы стучите в дверь, и через мгновение её открывает пожилая женщина с добрым взглядом. Она предлагает вам войти и отдохнуть. Вы чувствуете себя в безопасности и продолжаете путь с новыми силами.',
      title: 'Постучать в дверь',
    });
  }
}

export class EndOfGame extends State {
  constructor() {
    super({
      actionList: [],
      text: 'Конец игры',
      title: 'Конец игры',
    });
  }
  render() {
    process.exit(0);
  }
}
