import { Card as RebassCard } from 'rebass';
import Styled from 'styled-components';

const Card = RebassCard.extend`
  padding: 0;
  text-align: ${({ textAlign }) => textAlign || 'left'};
  box-shadow: 0 0 3px #aaa;
  box-radius: 3px;
`;

Card.HeaderBig = Styled.div`
	margin:0;
	padding:30px 60px;
	background-color: rgb(32,12,43);
	color: #fff;
`;

Card.Header = Styled.div`
	margin:0;
	padding:20px 40px;
	background-color: rgb(32,12,43);
	color: #fff;
`;

Card.Content = Styled.div`
	padding: 40px;
`;

export default Card;
