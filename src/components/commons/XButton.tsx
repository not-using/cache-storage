import { ReactComponent as XIcon } from 'assets/img/x.svg';
import { ComponentProps } from 'react';
import { styled } from 'styled-components';

interface Props extends ComponentProps<'button'> {
  size: number;
}
const XButton = ({ size, ...rest }: Props) => {
  return (
    <StyledButton $size={size} {...rest}>
      <XIcon width={size} />
    </StyledButton>
  );
};

export default XButton;

const StyledButton = styled.button<{ $size: number }>`
  background-color: #a7afb7;
  border: none;
  cursor: pointer;
  color: white;
  display: block;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
`;
