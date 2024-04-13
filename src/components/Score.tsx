import { useEffect, useRef } from 'react';

type Props = {
  score: number;
  scoreDiff: number;
  gameWon: boolean;
  resetGame: () => void;
};

function Score(props: Props) {
  const scoreRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Add animation class
    const scoreElement = scoreRef.current;
    const scoreType = props.scoreDiff < 0 ? 'negative-score' : 'positive-score';
    if (scoreElement) {
      scoreElement.classList.add(scoreType);
      setTimeout(() => {
        scoreElement.classList.remove(scoreType);
      }, 500);
    }
  }, [props.score, props.scoreDiff]);

  return (
    <div
      className='capirola transition-height sticky top-0 z-30 flex overflow-hidden rounded-none border-b-2 bg-white text-[#f16295] duration-1000 ease-in-out md:rounded-bl-lg md:rounded-br-lg md:border-l-2 md:border-r-2'
      style={{ height: props.gameWon ? '100vh' : '4rem' }}
    >
      <div className='m-auto'>
        <span className='text-6xl'>{props.score}</span>
        <span ref={scoreRef} className='scorediff text-xl'>
          {props.scoreDiff}
        </span>
        <button
          className='capirola text-md block rounded-full border-2 p-3 transition-all ease-in-out hover:bg-pink-500 hover:text-white'
          style={{ opacity: props.gameWon ? 1 : 0 }}
          onClick={props.resetGame}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default Score;
