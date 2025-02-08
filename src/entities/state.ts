import { TCharacter } from '~/api/types';

class StateManager {
  private _characters: TCharacter[] = [];

  get characters() {
    return this._characters;
  }

  set characters(data: TCharacter[]) {
    this._characters = [...data];
  }
}

const stateManager = new StateManager();
export default stateManager;
