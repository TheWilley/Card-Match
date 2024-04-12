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
    <div className='text-[#f16295] font-mono mt-2'>
      <span className='text-6xl bg-white rounded-lg p-1'>{props.score}</span>
      <span ref={scoreRef} className='score text-xl'>{props.scoreDiff}</span>
    </div>
  );
}

export default Score;
