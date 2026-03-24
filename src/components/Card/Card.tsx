import { Card as AntCard } from 'antd';
import type { CardProps } from './Card.types';

function Card(props: CardProps) {
  return <AntCard {...props} />;
}

export default Card;
