import { useSearch } from 'hooks/useSearch';
import { PropsWithChildren, createContext } from 'react';
import type { SearchContextType } from 'types/SearchContextType';

export const SearchContext = createContext<SearchContextType>({
  keyword: '',
  recommends: [],
  searchKeyword: () => {},
  setKeyword: () => {},
});

export const SearchContextProvider = ({ children }: PropsWithChildren) => {
  const { keyword, setKeyword, searchKeyword, recommends } = useSearch();

  return (
    <SearchContext.Provider value={{ keyword, setKeyword, searchKeyword, recommends }}>
      {children}
    </SearchContext.Provider>
  );
};
