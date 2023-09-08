import { ComponentProps, FormEventHandler, useRef, useState } from 'react';
import { useSearch } from 'hooks/useSearch';
import { useEvent } from 'hooks/useEvent';
import { addRecentKeyword } from 'utils/recentKeyword';
import styled from 'styled-components';
import Input from 'components/commons/Input';
import SearchBarDropdown from 'components/search/SearchBarDropdown';
import { ReactComponent as SearchIcon } from 'asset/img/search.svg';

const SearchBar = ({ ...rest }: ComponentProps<'form'>) => {
  const { keyword, searchKeyword, setKeyword, recommends } = useSearch();
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
    const searched = keyword.trim();
    if (searched.length === 0) return;
    addRecentKeyword(searched);
  };

  return (
    <StyledForm {...rest} $isFocused={isFocused} onSubmit={search}>
      <Icon $isHidden={isFocused || keyword.length > 0} />
      <StyledInput
        ref={inputRef}
        placeholder={isFocused ? '' : '질환명을 입력해 주세요.'}
        value={keyword}
        $isFocused={keyword.length > 0 || isFocused}
        onChange={(e) => searchKeyword(e.currentTarget.value)}
        onFocus={() => setIsFocused(true)}
      />
      <SearchButton />
      {isFocused ? (
        <SearchBarDropdown
          ref={dropdownRef}
          recommends={recommends}
          keyword={keyword}
          setKeyword={setKeyword}
          searchKeyword={searchKeyword}
        />
      ) : null}
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
  padding: 12px 20px;
  box-shadow: 0px 2px 4px rgba(30, 32, 37, 0.1);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  outline: ${({ $isFocused }) => ($isFocused ? '2px solid #007be9' : 'none')};
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

const SearchButton = styled(Icon)`
  color: white;
  width: 21px;
  height: 21px;
  margin-right: 3px;
`;
