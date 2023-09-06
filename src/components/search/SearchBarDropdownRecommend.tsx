import { styled } from 'styled-components';
import { Sick } from 'types/Sick';
import SearchKeywordItem from './SearchKeywordItem';

interface Props {
  keyword: string;
  recommends: Sick[];
  setKeyword: (keyword: string) => void;
}

const SearchBarDropdownRecommend = ({ keyword, recommends, setKeyword }: Props) => {
  return (
    <>
      <SearchKeywordItem keyword={keyword} wholeWord={keyword} />
      <StyledText>추천 검색어</StyledText>
      {recommends.map((recommend) => (
        <SearchKeywordItem
          key={recommend.sickCd}
          keyword={keyword}
          wholeWord={recommend.sickNm}
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
