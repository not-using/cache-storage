import { useContext, useState } from 'react';
import { SearchContext } from 'context/SearchContext';
import { useEvent } from 'hooks/useEvent';
import styled from 'styled-components';
import SearchKeywordItem from './SearchKeywordItem';

const SearchBarDropdownRecommend = () => {
  const { recommends, setKeyword, keyword } = useContext(SearchContext);
  const [selectedIndex, setSelectedIndex] = useState<number>(recommends.length - 1);

  const changeIndex = (index: number) => {
    setSelectedIndex(index);
    setKeyword(recommends[index].sickNm);
  };

  useEvent('keydown', (e: KeyboardEvent) => {
    if (e.isComposing) return;
    if (e.key === 'ArrowDown') {
      changeIndex((selectedIndex + 1) % recommends.length);
    } else if (e.key === 'ArrowUp') {
      changeIndex((selectedIndex + recommends.length - 1) % recommends.length);
    }
  });

  return (
    <>
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
  padding: 0 24px;
  margin: 0;
`;

const ErrorText = styled(StyledText)`
  color: inherit;
  text-align: center;
`;

const StyledSearchKeywordItem = styled(SearchKeywordItem)<{ $isSelected: boolean }>`
  background-color: ${({ $isSelected }) => ($isSelected ? '#eeeeee' : 'transparent')};
`;
