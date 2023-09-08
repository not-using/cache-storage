import { useContext } from 'react';
import { SearchContext } from 'context/SearchContext';
import styled from 'styled-components';
import SearchKeywordItem from './SearchKeywordItem';
import XButton from 'components/commons/XButton';

const RECOMMENDS = ['B형간염', '비만', '관절염', '우울증', '식도염'];

const SearchBarDropdownDefault = () => {
  const { searchKeyword, recentKeywords, removeRecentKeyword } =
    useContext(SearchContext);

  return (
    <>
      <StyledText>최근 검색어</StyledText>
      <StyledRecentDiv>
        {recentKeywords.map((keyword) => (
          <>
            <StyledSearchKeywordItem wholeWord={keyword} key={keyword} keyword="">
              <DeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  removeRecentKeyword(keyword);
                }}
                size={20}
              />
            </StyledSearchKeywordItem>
          </>
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

const StyledButton = styled.div`
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

const StyledSearchKeywordItem = styled(SearchKeywordItem)`
  position: relative;
`;

const DeleteButton = styled(XButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
`;
