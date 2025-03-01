import { TCharacter } from '~/api/types';

class CharactersState {
  public total: number = 0;
  private _characters: TCharacter[] = [];
  private _current: number[] = [];
  private _selected: number[] = [];
  private _callbacks: ((ids: number[]) => void)[] = [];

  get characters(): TCharacter[] {
    return this._characters;
  }

  get selected(): number[] {
    return this._selected;
  }

  get current(): number[] {
    return this._current;
  }

  public add = (characters: TCharacter[]) => {
    this._current = characters.map((item) => item.id);
    characters.forEach((item) => {
      if (!this.exists(item.id)) this._characters.push(item);
    });
  };

  public switch = (character: TCharacter) => {
    const index = this._selected.indexOf(character.id);
    if (index !== -1) this._selected.splice(index, 1);
    else this._selected.push(character.id);
    this.emit();
  };

  public exists = (id: number) => this._characters.findIndex((item) => item.id === id) !== -1;

  public clear = () => {
    this._selected = [];
    this.emit();
  };

  public subscribe = (callback: (ids: number[]) => void) => {
    if (this._callbacks.includes(callback)) return;
    this._callbacks.push(callback);
  };

  public unsubscribe = (callback: (ids: number[]) => void) => {
    const index = this._callbacks.indexOf(callback);
    if (index !== -1) this._callbacks.splice(index, 1);
  };

  private emit = () => {
    this._callbacks.forEach((callback) => callback([...this._selected]));
  };
}

export const charactersState = new CharactersState();
