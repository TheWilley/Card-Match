import { useEffect, useRef } from 'react';
import highscoreImage from '../assets/highscore.png';

type Props = {
  score: number;
  highscore: number;
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
      className='capirola sticky top-0 z-30 flex overflow-hidden rounded-none border-b-2 bg-white text-[#f16295] transition-height duration-1000 ease-in-out md:rounded-bl-lg md:rounded-br-lg md:border-l-2 md:border-r-2'
      style={{ height: props.gameWon ? '100vh' : '4rem' }}
    >
      <div className='m-auto'>
        <span className='text-6xl'>{props.score}</span>
        <span ref={scoreRef} className='scorediff text-xl'>
          {props.scoreDiff}
        </span>
        <hr className='mt-2 border-2 border-dashed border-pink-300' />
        <button
          className='capirola text-md mb-4 mt-4 block rounded-full border-2 p-3 transition-all ease-in-out hover:bg-pink-500 hover:text-white'
          onClick={props.resetGame}
        >
          Play Again
        </button>
        <hr className='mb-2 border-2 border-dashed border-pink-300' />
        <div className='relative'>
          <span className='text-6xl'>{props.highscore}</span>
          <img src={highscoreImage} className='absolute left-28 top-0 w-28' />
        </div>
      </div>
    </div>
  );
}

export default Score;
