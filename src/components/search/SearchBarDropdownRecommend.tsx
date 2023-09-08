import { useContext, useEffect, useRef, useState } from 'react';
import { SearchContext } from 'contexts/SearchContext';
import { useEvent } from 'hooks/useEvent';
import styled from 'styled-components';
import SearchKeywordItem from './SearchKeywordItem';

const SearchBarDropdownRecommend = () => {
  const { recommends, setKeyword, keyword } = useContext(SearchContext);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
  const selectedRef = useRef<HTMLButtonElement | null>();

  const changeIndex = (index?: number) => {
    setSelectedIndex(index);
    if (index !== undefined) setKeyword(recommends[index].sickNm);
  };

  useEvent('keydown', (e: KeyboardEvent) => {
    if (e.isComposing) return;
    if (e.key === 'ArrowDown') {
      const current = selectedIndex === undefined ? -1 : selectedIndex;
      changeIndex((current + 1) % recommends.length);
    } else if (e.key === 'ArrowUp') {
      const current = selectedIndex === undefined ? 0 : selectedIndex;
      changeIndex((current + recommends.length - 1) % recommends.length);
    }
  });

  useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [selectedIndex]);

  return (
    <StyledDiv>
      {recommends.map((recommend, index) => (
        <StyledSearchKeywordItem
          ref={(element) => {
            if (selectedIndex === index) selectedRef.current = element;
          }}
          key={recommend.sickCd}
          keyword={keyword}
          wholeWord={recommend.sickNm}
          $isSelected={selectedIndex === index}
        />
      ))}
      {recommends.length === 0 ? <ErrorText>검색어 없음</ErrorText> : null}
    </StyledDiv>
  );
};

export default SearchBarDropdownRecommend;

const StyledDiv = styled.div`
  height: 320px;
  overflow-y: scroll;
  padding: 10px 0;
`;

const ErrorText = styled.p`
  padding: 0 24px;
  margin: 0;
  color: inherit;
  text-align: center;
`;

const StyledSearchKeywordItem = styled(SearchKeywordItem)<{ $isSelected: boolean }>`
  background-color: ${({ $isSelected }) => ($isSelected ? '#eeeeee' : 'transparent')};
`;
