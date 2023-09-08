import { styled } from 'styled-components';
import { ReactComponent as SearchIcon } from 'asset/img/search.svg';
import { ComponentProps, forwardRef, useContext } from 'react';
import { SearchContext } from 'context/SearchContext';

interface Props extends ComponentProps<'button'> {
  keyword: string;
  wholeWord: string;
}
const SearchKeywordItem = forwardRef<HTMLButtonElement, Props>(
  ({ keyword, wholeWord, ...rest }, ref) => {
    const { searchKeyword } = useContext(SearchContext);
    const splited = wholeWord
      .split(new RegExp(`(${keyword})`, 'gi'))
      .filter((word) => word.length > 0);

    return (
      <StyledButton
        {...rest}
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          searchKeyword(wholeWord);
        }}
      >
        <Icon />
        {splited.map((word, index) => (
          <StyledText key={`${word}_${index}`} $isHighlighted={word === keyword}>
            {word}
          </StyledText>
        ))}
        {rest.children}
      </StyledButton>
    );
  },
);

export default SearchKeywordItem;

const StyledButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 24px;
  cursor: pointer;
  border: 0;
  background-color: transparent;
  font-weight: 400;
  font-size: 16px;
  text-align: left;
  &:focus {
    border: none;
  }
`;

const Icon = styled(SearchIcon)`
  width: 16px;
  margin-right: 12px;
  flex-basis: 20px;
  color: rgb(167, 175, 183);
`;

const StyledText = styled.span<{ $isHighlighted: boolean }>`
  color: ${({ $isHighlighted }) => ($isHighlighted ? '#007be9' : 'inherit')};
  font-weight: ${({ $isHighlighted }) => ($isHighlighted ? '700' : 'inherit')};
`;
