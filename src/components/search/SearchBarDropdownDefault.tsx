import { RECENT_KEY } from 'constants/recentKeyword';
import { styled } from 'styled-components';
import { getLocalStroage } from 'utils/localStorage';
import SearchKeywordItem from './SearchKeywordItem';

const RECOMMENDS = ['B형간염', '비만', '관절염', '우울증', '식도염'];

interface Props {
  searchKeyword: (keyword: string) => void;
}
const SearchBarDropdownDefault = ({ searchKeyword }: Props) => {
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
      <StyledRecommendDiv>
        {RECOMMENDS.map((recommend) => (
          <StyledButton
            key={recommend}
            onClick={(e) => {
              e.preventDefault();
              searchKeyword(recommend);
            }}
          >
            {recommend}
          </StyledButton>
        ))}
      </StyledRecommendDiv>
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

const StyledRecommendDiv = styled.div`
  padding: 10px 24px;
`;

const StyledButton = styled.button`
  display: inline-block;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.6;
  background-color: rgb(238, 248, 255);
  color: rgb(0, 123, 233);
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  margin: 0 4px;
`;
