import styled from 'styled-components';

const Wrap = styled.div`
  height: 100%;
  margin: 0;
`;

Wrap.Inner = styled.div`
  min-height: 100%;
  margin-bottom: -300px;
`;

Wrap.Push = styled.div`
  height: 200px;
`;

export default Wrap;
