import { SearchContextProvider } from 'contexts/SearchContext';
import styled from 'styled-components';
import SearchBar from 'components/search/SearchBar';

const SearchBanner = () => {
  return (
    <StyledDiv>
      <SearchContextProvider>
        <SearchBar />
      </SearchContextProvider>
    </StyledDiv>
  );
};

export default SearchBanner;

const StyledDiv = styled.div`
  background-color: #cae9ff;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;
