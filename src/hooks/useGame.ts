import { useEffect, useState } from 'react';
import { Deck, PlayingCard } from '../utils/deck-utils';
import lodash from 'lodash';

export default function useGame() {
  const [deck, setDeck] = useState(new Deck().deck);
  const [clickedCards, setClickedCards] = useState<PlayingCard[]>([]);
  const [score, setScore] = useState(0);
  const [scoreDiff, setScoreDiff] = useState(0);

  /**
   * Add clicked card to the clicked cards array.
   * @param card The card to add.
   */
  const addClickedCard = (card: PlayingCard) => {
    if (card.display) return;
    card.display = !card.display;
    setDeck([...deck]);
    setClickedCards((prev) => [...prev, card]);
  };

  /**
   * Enable or disable all cards.
   * @param state The state to set.
   */
  const enableCards = (state: boolean) => {
    for (const card of deck) {
      card.enabled = state;
    }
  };

  /**
   * Flip the cards back.
   */
  const flipCards = () => {
    for (const card of clickedCards) {
      card.display = false;
    }
  };

  /**
   * Reset the clicked cards array.
   */
  const resetClickedCards = () => {
    setClickedCards([]);
  };

  /**
   * Remove a card from the deck.
   * @param card The card to remove.
   */
  const removeCard = (card: PlayingCard) => {
    setDeck((prev) => prev.filter((c) => c.id !== card.id));
  };

  /**
   * Remove the matched cards from the deck.
   */
  const removeMatchedCards = () => {
    for (const card of clickedCards) {
      removeCard(card);
    }
  };

  /**
   * Shuffle the deck.
   */
  const shuffleDeck = () => {
    setDeck(lodash.shuffle(deck));
  };

  /**
   * Remove a joker from the deck.
   */
  const removeAJoker = () => {
    const joker = deck.find((card) => card.value === 'joker');
    joker && removeCard(joker);
  };

  /**
   * Perform an action after a certain amount of time.
   * @param callback The callback to execute.
   */
  const performAction = (callback?: () => void, time: number = 800) => {
    enableCards(false);
    // Let the user see the cards for a while.
    setTimeout(() => {
      callback && callback();
      flipCards();
      resetClickedCards();
      enableCards(true);
    }, time);
  };

  const increaseScore = (reason: string) => {
    switch (reason) {
      case 'match':
        setScoreDiff(10);
        setScore(score + 10);
        break;
      case 'joker':
        setScoreDiff(5);
        setScore(score + 5);
        break;
      default:
        break;
    }
  };

  const decreaseScore = (reason: string) => {
    if (score === 0) return;
    switch (reason) {
      case 'mismatch':
        setScoreDiff(-2);
        setScore(score - 2);
        break;
      default:
        break;
    }
  };

  /**
   * Check for different conditions and perform actions accordingly.
   */
  const check = () => {
    // If clikedcard has joker, shuffle the deck.
    if (clickedCards.some((card) => card.value === 'joker')) {
      performAction(() => {
        shuffleDeck();
        removeAJoker();
      });
    }

    // If two cards are clicked, check if they match.
    if (clickedCards.length === 2) {
      const matched = clickedCards[0].value === clickedCards[1].value;
      performAction(() => {
        if (matched) {
          removeMatchedCards();
          increaseScore('match');
        } else {
          decreaseScore('mismatch');
        }
      });
    }
  };

  useEffect(() => {
    check();
  }, [clickedCards]);

  return { clickedCards, deck, score, scoreDiff, addClickedCard, setDeck };
}
