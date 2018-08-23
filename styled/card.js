import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { margin, padding, width } from 'styled-system';
// import { Card as RebassCard } from 'rebass';

export const Card = styled(Paper)`
  padding: 30px;
  text-align: ${({ textAlign }) => textAlign || 'left'};
  ${margin};
  ${padding};
  ${width};
`;
