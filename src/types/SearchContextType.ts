import { Sick } from './Sick';

export type SearchContextType = {
  keyword: string;
  setKeyword: (keyword: string) => void;
  searchKeyword: (keyword: string) => void;
  recommends: Sick[];
};
