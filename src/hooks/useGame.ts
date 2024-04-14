import { useEffect, useState } from 'react';
import { Deck, PlayingCard } from '../utils/deck-utils';

export default function useGame() {
  const [deck, setDeck] = useState(new Deck().deck);
  const [clickedCards, setClickedCards] = useState<PlayingCard[]>([]);
  const [score, setScore] = useState(0);
  const [scoreDiff, setScoreDiff] = useState(0);
  const [gameWon, setGameWon] = useState(false);

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

  const addAnimationToClickedCards = (animationName: string) => {
    for (const card of clickedCards) {
      card.activeAnimations = animationName;
    }

    setDeck((prev) => [...prev]);
  };

  const removeAnimationFromClickedCards = () => {
    for (const card of clickedCards) {
      card.activeAnimations = '';
    }
  };

  /**
   * Perform an action after a certain amount of time.
   * @param callback The callback to execute.
   */
  const performAction = (
    callback?: () => void,
    animation?: {
      name: string;
      condition: boolean;
    },
    time: number = 800
  ) => {
    enableCards(false);

    // The action to perform.
    const action = () => {
      animation?.condition && removeAnimationFromClickedCards();
      callback && callback();
      flipCards();
      resetClickedCards();
      enableCards(true);
    };

    // Add animation to the clicked cards.
    setTimeout(() => {
      animation?.condition && addAnimationToClickedCards(animation.name);
    }, time);

    // Let the user see the cards for a while.
    setTimeout(action, time + (animation?.condition ? 300 : 0));
  };

  /**
   * Increase the score.
   * @param reason The reason for increasing the score.
   */
  const increaseScore = (reason: string) => {
    switch (reason) {
      case 'match':
        setScoreDiff(10);
        setScore(score + 10);
        break;
      default:
        break;
    }
  };

  /**
   * Decrease the score.
   * @param reason The reason for decreasing the score.
   */
  const decreaseScore = (reason: string) => {
    if (score === 0) return;
    switch (reason) {
      case 'mismatch':
        setScoreDiff(-1);
        setScore(score - 1);
        break;
      default:
        break;
    }
  };

  /**
   * Check for different conditions and perform actions accordingly.
   */
  const checkState = () => {
    // If two cards are clicked, check if they match.
    if (clickedCards.length === 2) {
      const matched = clickedCards[0].value === clickedCards[1].value;
      performAction(
        () => {
          if (matched) {
            removeMatchedCards();
            increaseScore('match');
          } else {
            decreaseScore('mismatch');
          }
        },
        { name: 'move-up', condition: matched }
      );
    }
  };

  /**
   * Check if the player has won the game.
   */
  const checkWin = () => {
    if (deck.filter((card) => card.value !== 'jack').length === 0) {
      setGameWon(true);
    }
  };

  /**
   * Reset the game.
   */
  const resetGame = () => {
    setDeck(new Deck().deck);
    setClickedCards([]);
    setScore(0);
    setScoreDiff(0);
    setGameWon(false);
  };

  useEffect(() => {
    checkState();
    checkWin();
  }, [clickedCards]);

  return { clickedCards, deck, score, scoreDiff, gameWon, addClickedCard, setDeck, resetGame };
}
