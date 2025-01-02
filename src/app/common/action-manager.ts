type Action<T = ActionType, P = string> = {
  type: T;
  payload: P;
};

type ActionType = 'create' | 'read' | 'update' | 'delete' | 'debug';
type ActionCallback = (action: Action) => void;

interface IActionManager<T extends Action = Action<ActionType, string>> {
  subscribe: (cb: ActionCallback) => void;
  dispatch: (action: T) => void;
}

export class ActionManager implements IActionManager {
  private static _actionManagerInstance: IActionManager;
  private readonly _subscriptions: Array<ActionCallback> = [];
  private constructor() {}

  static getInstance(): IActionManager<Action<ActionType, string>> {
    if (!ActionManager._actionManagerInstance) {
      ActionManager._actionManagerInstance = new ActionManager();
    }

    return ActionManager._actionManagerInstance;
  }

  subscribe(cb: ActionCallback): void {
    this._subscriptions.push(cb);
  }

  dispatch(action: Action): void {
    this._subscriptions.forEach(callback => callback(action));
  }
}
