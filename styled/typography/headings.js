import styled, { css } from 'styled-components';
import {
  color,
  fontSize,
  fontWeight,
  fontFamily,
  textStyle,
  textAlign,
  lineHeight,
  opacity,
  borders,
  borderRadius,
  width,
  maxWidth,
  display,
  space,
  fontStyle,
} from 'styled-system';

export const baseProps = css`
  color: rgba(20, 33, 68, 1);
  ${color};
  ${fontSize};
  ${fontWeight};
  ${fontFamily};
  ${textStyle};
  ${lineHeight};
  ${opacity};
  ${textAlign};
  ${maxWidth};
  ${width};
  ${borders};
  ${display};
  ${borderRadius};
  ${maxWidth};
  ${space};
  ${fontStyle};
`;

const headerProps = css`
  font-family: 'Plex', monospace;
  ${baseProps};
`;
const H1 = styled.h1`
  ${headerProps};
`;
const H2 = styled.h2`
  ${headerProps};
`;
const H3 = styled.h3`
  ${headerProps};
`;
const H4 = styled.h4`
  ${headerProps};
`;
const H5 = styled.h5`
  ${headerProps};
`;
const H6 = styled.h6`
  ${headerProps};
`;

export { H1, H2, H3, H4, H5, H6 };
