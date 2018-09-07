import styled from 'styled-components';
import { baseProps } from './headings';

const P = styled.p`
  ${baseProps};
`;

const Span = styled.span`
  ${baseProps};
`;

const Body = styled.div`
  ${baseProps};
`;

const Strong = styled.strong`
  ${baseProps};
  font-weight: 500;
`;

const Em = styled.em`
  ${baseProps};
`;
const Ul = styled.ul`
  ${baseProps};
`;
const Ol = styled.ol`
  ${baseProps};
`;

const Li = styled.li`
  ${baseProps};
`;

const Pre = styled.pre`
  ${baseProps};
`;

const Small = styled.small`
  font-size: 12px;
  ${baseProps};
`;

Body.p = P;
Body.span = Span;
Body.strong = Strong;
Body.em = Em;
Body.ul = Ul;
Body.ol = Ol;
Body.li = Li;
Body.oli = Li;
Body.pre = Pre;
Body.small = Small;

export default Body;
