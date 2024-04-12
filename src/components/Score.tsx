import { useEffect, useRef } from 'react';

type Props = {
  score: number;
  scoreDiff: number;
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
    <div className='text-[#f16295] font-mono sticky top-0 z-30 bg-white md:rounded-bl-lg rounded-none md:rounded-br-lg md:border-l-2 border-b-2 md:border-r-2'>
      <span className='text-6xl'>{props.score}</span>
      <span ref={scoreRef} className='score text-xl'>
        {props.scoreDiff}
      </span>
    </div>
  );
}

export default Score;
