import { MAX_RECENT, RECENT_KEY } from 'constants/recentKeyword';
import { useState } from 'react';
import { getLocalStroage, setLocalStroage } from 'utils/localStorage';

export const useRecentKeyword = () => {
  const saved = getLocalStroage<string[]>(RECENT_KEY, []);
  const [recentKeywords, setRecentKeywords] = useState<string[]>(saved);

  const addRecentKeyword = (keyword: string) => {
    const newKeywords = [keyword, ...recentKeywords.filter((k) => k !== keyword)];
    setLocalStroage(RECENT_KEY, newKeywords.slice(0, MAX_RECENT));
    setRecentKeywords(newKeywords);
  };

  const removeRecentKeyword = (keyword: string) => {
    const newKeywords = recentKeywords.filter((k) => k !== keyword);
    setLocalStroage(RECENT_KEY, newKeywords);
    setRecentKeywords(newKeywords);
  };

  return { recentKeywords, addRecentKeyword, removeRecentKeyword };
};
