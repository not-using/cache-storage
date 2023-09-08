import { Sick } from './Sick';

export type SearchContextType = {
  keyword: string;
  setKeyword: (keyword: string) => void;
  searchKeyword: (keyword: string) => void;
  searchRecommends: (keyword: string) => void;
  recommends: Sick[];
  recentKeywords: string[];
  removeRecentKeyword: (keyword: string) => void;
};
