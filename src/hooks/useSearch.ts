import { useState } from 'react';
import { useDebounce } from './useDebounce';
import { Sick } from 'types/Sick';
import { getSick } from 'api/getSick';
import { addRecentKeyword } from 'utils/recentKeyword';

export const useSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [recommends, setRecommends] = useState<Sick[]>([]);

  const debounce = useDebounce();

  const searchRecommends = (keyword: string) => {
    setKeyword(keyword);
    if (keyword.length === 0) {
      return setRecommends([]);
    }
    debounce(() => {
      getSick(keyword).then((response) => setRecommends(response));
    }, 500);
  };

  const searchKeyword = (keyword: string) => {
    const searched = keyword.trim();
    if (searched.length === 0) return;
    addRecentKeyword(searched);
    alert(`검색어: ${searched}`);
  };

  return { keyword, recommends, searchKeyword, searchRecommends, setKeyword };
};
