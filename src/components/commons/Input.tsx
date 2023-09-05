import { ComponentProps } from 'react';
import styled from 'styled-components';

const Input = ({ ...rest }: ComponentProps<'input'>) => {
  return <StyledInput {...rest} />;
};

export default Input;

const StyledInput = styled.input`
  border: 0;
  cursor: text;
`;
