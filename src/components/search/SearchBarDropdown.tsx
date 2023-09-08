import { ComponentProps, forwardRef, useContext } from 'react';
import { SearchContext } from 'contexts/SearchContext';
import styled from 'styled-components';
import SearchBarDropdownDefault from './SearchBarDropdownDefault';
import SearchBarDropdownRecommend from './SearchBarDropdownRecommend';

const SearchBarDropdown = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  (props, ref) => {
    const { keyword, isLoading } = useContext(SearchContext);
    return (
      <StyledDiv {...props} ref={ref}>
        {keyword.length === 0 ? (
          <SearchBarDropdownDefault />
        ) : (
          <>
            <StyledText>추천 검색어</StyledText>
            {isLoading ? (
              <LoadingText>로딩중..</LoadingText>
            ) : (
              <SearchBarDropdownRecommend />
            )}
          </>
        )}
      </StyledDiv>
    );
  },
);

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

const StyledText = styled.p`
  padding: 0 24px;
  margin: 0;
`;

const LoadingText = styled(StyledText)`
  text-align: center;
  line-height: 3.2;
`;
