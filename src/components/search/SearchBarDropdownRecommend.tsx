import { useState } from 'react';
import { styled } from 'styled-components';
import { useKeyEvent } from 'hooks/useKeyEvent';
import { Sick } from 'types/Sick';
import SearchKeywordItem from './SearchKeywordItem';

interface Props {
  keyword: string;
  recommends: Sick[];
  setKeyword: (keyword: string) => void;
}

const SearchBarDropdownRecommend = ({ keyword, recommends, setKeyword }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(recommends.length - 1);

  useKeyEvent((e: KeyboardEvent) => {
    if (e.isComposing) return;
    if (e.key === 'ArrowDown') {
      setSelectedIndex((selectedIndex + 1) % recommends.length);
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((selectedIndex + recommends.length - 1) % recommends.length);
    }
  });

  return (
    <>
      <SearchKeywordItem keyword={keyword} wholeWord={keyword} />
      <StyledText>추천 검색어</StyledText>
      {recommends.map((recommend, index) => (
        <StyledSearchKeywordItem
          key={recommend.sickCd}
          keyword={keyword}
          wholeWord={recommend.sickNm}
          $isSelected={selectedIndex === index}
        />
      ))}
      {recommends.length === 0 ? <ErrorText>검색어 없음</ErrorText> : null}
    </>
  );
};

export default SearchBarDropdownRecommend;

const StyledText = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #c2c8ce;
  padding: 0 20px;
  margin: 0;
`;

const ErrorText = styled(StyledText)`
  color: inherit;
  text-align: center;
`;

const StyledSearchKeywordItem = styled(SearchKeywordItem)<{ $isSelected: boolean }>`
  background-color: ${({ $isSelected }) => ($isSelected ? '#eeeeee' : 'transparent')};
`;
