import { ComponentProps, FormEventHandler, useContext, useRef, useState } from 'react';
import { SearchContext } from 'context/SearchContext';
import { useEvent } from 'hooks/useEvent';
import styled from 'styled-components';
import Input from 'components/commons/Input';
import SearchBarDropdown from 'components/search/SearchBarDropdown';
import XButton from 'components/commons/XButton';
import { ReactComponent as SearchIcon } from 'asset/img/search.svg';

const SearchBar = ({ ...rest }: ComponentProps<'form'>) => {
  const { keyword, setKeyword, searchKeyword, searchRecommends } =
    useContext(SearchContext);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEvent('click', (e: MouseEvent) => {
    const clicked = e.target as Node;
    const isClickedInside =
      dropdownRef.current?.contains(clicked) || inputRef.current?.contains(clicked);
    setIsFocused(isClickedInside ?? false);
  });

  const search: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    searchKeyword(keyword);
  };

  return (
    <StyledForm {...rest} $isFocused={isFocused} onSubmit={search}>
      <Icon $isHidden={isFocused || keyword.length > 0} />
      <StyledInput
        ref={inputRef}
        placeholder={isFocused ? '' : '질환명을 입력해 주세요.'}
        value={keyword}
        $isFocused={keyword.length > 0 || isFocused}
        onChange={(e) => searchRecommends(e.currentTarget.value)}
        onFocus={() => setIsFocused(true)}
      />
      {keyword.length > 0 ? (
        <DeleteButton
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setKeyword('');
          }}
          size={20}
        />
      ) : null}
      <SearchButton type="submit">
        <Icon width={21} />
      </SearchButton>
      {isFocused ? <SearchBarDropdown ref={dropdownRef} /> : null}
    </StyledForm>
  );
};

export default SearchBar;

const StyledForm = styled.form<{ $isFocused: boolean }>`
  min-width: 300px;
  max-width: 490px;
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  border-radius: 42px;
  border: 0;
  border-color: #c2c8ce;
  background-color: #ffffff;
  margin-top: 100px;
  padding: 12px 12px 12px 20px;
  box-shadow: 0px 2px 4px rgba(30, 32, 37, 0.1);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  outline: ${({ $isFocused }) => ($isFocused ? '2px solid #007be9' : 'none')};
`;

const StyledInput = styled(Input)<{ $isFocused: boolean }>`
  font-size: 1rem;
  line-height: 1.6;
  flex-grow: 1;
  &:focus {
    outline: none;
  }
  &:placeholder {
    color: #a7afb7;
  }
  margin-left: ${({ $isFocused }) => $isFocused && '8px'};
`;

const Icon = styled(SearchIcon)<{ $isHidden?: boolean }>`
  width: 16px;
  height: 16px;
  color: #a7afb7;
  position: relative;
  cursor: pointer;
  margin-right: 8px;

  display: ${({ $isHidden = false }) => ($isHidden ? 'none' : 'block')};
`;

const SearchButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #007be9;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  & > svg {
    color: white;
    margin: 0;
  }
`;

const DeleteButton = styled(XButton)`
  margin: 0 10px;
`;
