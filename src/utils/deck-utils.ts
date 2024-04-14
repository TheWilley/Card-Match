import lodash from 'lodash';

export class PlayingCard {
  private _id: number;
  private _suit: string;
  private _color: string;
  private _value: string;
  private _image: [number, number];
  private _display: boolean;
  private _activeAnimation: string;
  private _enabled: boolean;

  constructor(
    id: number,
    suit: string,
    color: string,
    value: string,
    image: [number, number],
    display: boolean = false,
    activeAnimation: string,
    enabled: boolean = true
  ) {
    this._id = id;
    this._suit = suit;
    this._color = color;
    this._value = value;
    this._image = image;
    this._display = display;
    this._activeAnimation = activeAnimation;
    this._enabled = enabled;
  }

  get id() {
    return this._id;
  }

  get suit() {
    return this._suit;
  }

  get color() {
    return this._color;
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

  get activeAnimations() {
    return this._activeAnimation;
  }

  get enabled() {
    return this._enabled;
  }

  set display(display: boolean) {
    this._display = display;
  }

  set activeAnimations(activeAnimations: string) {
    this._activeAnimation = activeAnimations;
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
    'joker',
  ];
  private _deck: PlayingCard[] = [];
  private getColor(suit: string) {
    return suit === 'clubs' || suit === 'spades' ? 'black' : 'red';
  }

  constructor() {
    let index = 0;
    this._suits.forEach((suit, i) => {
      this._values.forEach((value, e) => {
        this._deck.push(
          new PlayingCard(
            index,
            suit,
            this.getColor(suit),
            value,
            [i, e],
            false,
            '',
            true
          )
        );
        index++;
      });
    });

    // Shuffle the deck
    this._deck = lodash.shuffle(this._deck);
  }

  get deck() {
    return this._deck;
  }
}
