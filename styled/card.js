import { Card as RebassCard } from 'rebass';

export const Card = RebassCard.extend`
  padding: 30px;
  text-align: ${({ textAlign }) => textAlign || 'left'};
  box-shadow: 0 0 2px gray;
`;
