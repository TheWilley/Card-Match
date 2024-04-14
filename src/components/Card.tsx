import { PlayingCard } from '../utils/deck-utils';

type Props = {
  card: PlayingCard;
  frontImage: string;
  backImage: string;
  activeAnimation: string;
  onClick?: () => void;
};

function Card(props: Props) {
  return (
    <div className={`flip-card ${props.activeAnimation}`}>
      <div className={`flip-card-inner ${!props.card.display && 'flip-card-flip'}`}>
        <div className='flip-card-back'>
          <img
            onClick={() => props.card.enabled && props.onClick && props.onClick()}
            key={props.card.id}
            src={props.frontImage}
            className='flip-card'
            alt={props.card.value}
          />
        </div>
        <div className='flip-card-front'>
          <img
            onClick={() => props.card.enabled && props.onClick && props.onClick()}
            key={props.card.id}
            src={props.backImage}
            className='flip-card'
            alt='back'
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
