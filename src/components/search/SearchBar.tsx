import { ComponentProps } from 'react';
import styled from 'styled-components';
import Input from 'components/commons/Input';
import { ReactComponent as SearchIcon } from 'asset/img/search.svg';

type Props = ComponentProps<'form'>;

const SearchBar = ({ ...rest }: Props) => {
  return (
    <StyledForm {...rest}>
      <Input placeholder="질환명을 입력해 주세요." />
      <Icon />
    </StyledForm>
  );
};

export default SearchBar;

const StyledForm = styled.form`
  min-width: 300px;
  max-width: 320px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 42px;
  border: 0;
  border-color: #c2c8ce;
  background-color: #ffffff;
  padding: 12px 20px;
  box-shadow: 0px 2px 4px rgba(30, 32, 37, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > input {
    font-size: 1rem;
    line-height: 1.6;
    flex-grow: 1;
    color: #6a737d;
  }
  & > input:focus {
    outline: none;
  }
`;

const Icon = styled(SearchIcon)`
  width: 16px;
  height: 16px;
  color: #6a737b;
  cursor: pointer;
`;
