import { styled } from 'styled-components';
import { Sick } from 'types/Sick';
import SearchBarDropdownDefault from './SearchBarDropdownDefault';
import SearchBarDropdownRecommend from './SearchBarDropdownRecommend';

interface Props {
  recommends: Sick[];
  keyword: string;
  setKeyword: (keyword: string) => void;
  searchKeyword: (keyword: string) => void;
}

const SearchBarDropdown = ({ keyword, recommends, setKeyword, searchKeyword }: Props) => {
  if (keyword.length === 0)
    return (
      <StyledDiv>
        <SearchBarDropdownDefault searchKeyword={searchKeyword} />
      </StyledDiv>
    );

  return (
    <StyledDiv>
      <SearchBarDropdownRecommend
        keyword={keyword}
        recommends={recommends}
        setKeyword={setKeyword}
      />
    </StyledDiv>
  );
};

export default SearchBarDropdown;

const StyledDiv = styled.div`
  background-color: white;

  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border-radius: 20px;
  margin-top: 8px;
  padding: 24px 0 16px;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px rgba(30, 32, 37, 0.1);
  font-size: 14px;
  line-height: 20px;
  color: rgb(106, 115, 123);
`;
