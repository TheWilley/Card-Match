export class PlayingCard {
  private _id: number;
  private _suit: string;
  private _value: string;
  private _image: [number, number];
  private _display: boolean;
  private _enabled: boolean;

  constructor(
    id: number,
    suit: string,
    value: string,
    image: [number, number],
    display: boolean = false,
    enabled: boolean = true
  ) {
    this._id = id;
    this._suit = suit;
    this._value = value;
    this._image = image;
    this._display = display;
    this._enabled = enabled;
  }

  get id() {
    return this._id;
  }

  get suit() {
    return this._suit;
  }

  get value() {
    return this._value;
  }

  get image() {
    return this._image;
  }

  get display() {
    return this._display;
  }

  get enabled() {
    return this._enabled;
  }

  set display(display: boolean) {
    this._display = display;
  }

  set enabled(enabled: boolean) {
    this._enabled = enabled;
  }
}

export class Deck {
  private _suits = ['clubs', 'diamonds', 'spades', 'hearts'];
  private _values = [
    'ace',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'jack',
    'queen',
    'king',
    'joker'
  ];
  private _deck: PlayingCard[] = [];

  constructor() {
    let index = 0;
    this._suits.forEach((suit, i) => {
      this._values.forEach((value, e) => {
        this._deck.push(new PlayingCard(index, suit, value, [i, e]));
        index++;
      });
    });
  }

  get deck() {
    return this._deck;
  }
}
