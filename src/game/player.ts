export default class Player {
  static create(name: string) {
    return new Player(name);
  }

  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }
}