import Styled from 'styled-components';

export const Section = Styled.section`
  border: 1px solid #C4D8E5;
  border-radius: 6px;
  background: white;
  box-shadow: 0 0 2em rgba(0, 0, 0, 0.1);
  h2 {
    padding: 1.5em;
    border-bottom: 1px solid #c4d8e5;
    position: relative;
    text-transform: capitalize;
    margin: 0;
    font-size: 16px;
  }
`;

export const Cell = Styled.a`
  border-top: 1px solid #dceaf2;
  color: #403F83;
  display: block;
  padding: 1.5em;
  position: relative;

  &:first-of-type {
    border-top: none;
  }
`;

export const Primary = Styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export const Secondary = Styled.div`
  color: #9ebed6;
  font-size: 13px;
  margin-top: 0.25em;
`;

export const Tertiary = Styled.div`
  position: absolute;
  top: 50%;
  right: 1.5em;
  transform: translateY(-50%);
`;
