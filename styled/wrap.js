import Styled from 'styled-components';

const Wrap = Styled.div`
	height:100%;
	margin:0;
`;

Wrap.Inner = Styled.div`
  min-height: 100%;
  margin-bottom:-300px;
`;

Wrap.Push = Styled.div`
	height: 200px;
`;

export default Wrap;