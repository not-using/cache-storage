import { ComponentProps, useState } from 'react';
import styled from 'styled-components';
import Input from 'components/commons/Input';
import { ReactComponent as SearchIcon } from 'asset/img/search.svg';

type Props = ComponentProps<'form'>;

const SearchBar = ({ ...rest }: Props) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <StyledForm {...rest} isFocused={isFocused}>
      <Icon isHidden={isFocused || value.length > 0} />
      <StyledInput
        placeholder={isFocused ? '' : '질환명을 입력해 주세요.'}
        value={value}
        isFocused={isFocused}
        onChange={(e) => setValue(e.currentTarget.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <SearchButton />
    </StyledForm>
  );
};

export default SearchBar;

const StyledForm = styled.form<{ isFocused: boolean }>`
  min-width: 300px;
  max-width: 490px;
  width: 100%;
  height: 70px;
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
  position: relative;
  outline: ${({ isFocused }) => (isFocused ? '2px solid #007be9' : 'none')};
  &:before {
    content: ' ';
    position: absolute;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    right: 12px;
    background-color: #007be9;
  }
`;

const StyledInput = styled(Input)<{ isFocused: boolean }>`
  font-size: 1rem;
  line-height: 1.6;
  flex-grow: 1;
  &:focus {
    outline: none;
  }
  &:placeholder {
    color: #a7afb7;
  }
  margin-left: ${({ isFocused }) => isFocused && '8px'};
`;
const Icon = styled(SearchIcon)<{ isHidden?: boolean }>`
  width: 16px;
  height: 16px;
  color: #a7afb7;
  position: relative;
  cursor: pointer;
  margin-right: 8px;

  display: ${({ isHidden = false }) => (isHidden ? 'none' : 'block')};
`;

const SearchButton = styled(Icon)`
  color: white;
  width: 21px;
  height: 21px;
  margin-right: 3px;
`;
