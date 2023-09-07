import { RECENT_KEY } from 'constants/recentKeyword';
import { styled } from 'styled-components';
import { getLocalStroage } from 'utils/localStorage';
import SearchKeywordItem from './SearchKeywordItem';

const SearchBarDropdownDefault = () => {
  const recentKeywords = getLocalStroage<string[]>(RECENT_KEY, []);

  return (
    <>
      <StyledText>최근 검색어</StyledText>
      <StyledRecentDiv>
        {recentKeywords.map((keyword) => (
          <SearchKeywordItem wholeWord={keyword} key={keyword} keyword="" />
        ))}
      </StyledRecentDiv>
      <StyledText>추천검색어로 검색해보세요</StyledText>
    </>
  );
};

export default SearchBarDropdownDefault;

const StyledRecentDiv = styled.div`
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 24px;
  margin-bottom: 24px;
  line-height: 1.6;
  font-size: 14px;
`;

const StyledText = styled.p`
  padding: 0 24px;
  margin: 4px 0;
`;
