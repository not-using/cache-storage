import { useState } from 'react';
import { useDebounce } from './useDebounce';
import { Sick } from 'types/Sick';
import { getSick } from 'api/getSick';

const useSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [recommends, setRecommends] = useState<Sick[]>([]);

  const debounce = useDebounce();

  const seacrhKeyword = (keyword: string) => {
    setKeyword(keyword);
    if (keyword.length === 0) {
      return setRecommends([]);
    }
    debounce(() => {
      getSick(keyword).then((response) => setRecommends(response));
    }, 500);
  };

  return { keyword, recommends, seacrhKeyword, setKeyword };
};

export default useSearch;
