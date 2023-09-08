import { ComponentProps, forwardRef } from 'react';
import styled from 'styled-components';

const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  ({ ...rest }, ref) => {
    return <StyledInput {...rest} ref={ref} />;
  },
);

export default Input;

const StyledInput = styled.input`
  border: 0;
  cursor: text;
`;
