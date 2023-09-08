import { useSearch } from 'hooks/useSearch';
import { PropsWithChildren, createContext } from 'react';
import type { SearchContextType } from 'types/SearchContextType';

export const SearchContext = createContext<SearchContextType>({
  keyword: '',
  recommends: [],
  searchKeyword: () => {},
  setKeyword: () => {},
  searchRecommends: () => {},
  recentKeywords: [],
});

export const SearchContextProvider = ({ children }: PropsWithChildren) => {
  const searchState = useSearch();

  return <SearchContext.Provider value={searchState}>{children}</SearchContext.Provider>;
};
