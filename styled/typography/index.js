import styled from 'styled-components';
import PropTypes from 'prop-types';
import { color, space } from 'styled-system';

import { H1, H2, H3, H4, H5, H6 } from './headings';
import Body from './body';

const Type = styled.div``;

Type.h1 = H1;
Type.h2 = H2;
Type.h3 = H3;
Type.h4 = H4;
Type.h5 = H5;
Type.h6 = H6;
Type.p = Body.p;
Type.span = Body.span;
Type.strong = Body.strong;
Type.em = Body.em;
Type.ul = Body.ul;
Type.ol = Body.ol;
Type.li = Body.li;
Type.oli = Body.oli;
Type.pre = Body.pre;

const basePropTypes = {
  sub: PropTypes.bool,
  large: PropTypes.bool,
  padding: PropTypes.string,
  margin: PropTypes.string,
  color: PropTypes.string,
  light: PropTypes.bool,
  size: PropTypes.string,
  align: PropTypes.string,
  ...color.propTypes,
  ...space.propTypes,
};

Type.h1.propTypes = {
  ...basePropTypes,
};
Type.h2.propTypes = {
  ...basePropTypes,
};
Type.h3.propTypes = {
  ...basePropTypes,
};
Type.h4.propTypes = {
  ...basePropTypes,
};
Type.h5.propTypes = {
  ...basePropTypes,
};
Type.h6.propTypes = {
  ...basePropTypes,
};
Type.p.propTypes = {
  ...basePropTypes,
};
Type.strong.propTypes = {
  ...basePropTypes,
};
Type.em.propTypes = {
  ...basePropTypes,
};
Type.ul.propTypes = {
  ...basePropTypes,
};
Type.ol.propTypes = {
  ...basePropTypes,
};
Type.li.propTypes = {
  ...basePropTypes,
};
Type.oli.propTypes = {
  ...basePropTypes,
};
Type.pre.propTypes = {
  ...basePropTypes,
};

Type.propTypes = {
  ...basePropTypes,
};

export { Type };
