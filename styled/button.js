import Styled from 'styled-components';
import { space, display } from 'styled-system';

const Button = Styled.button`
	padding: 18px 28px;
	border: 0;
	background-color: #3700ff;
	color: #fff;
	font-size: 16px;
	font-weight: 500;
	cursor: pointer;
	${space};
	${display};
`;

export default Button;
