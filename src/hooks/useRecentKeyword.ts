import { MAX_RECENT, RECENT_KEY } from 'constants/recentKeyword';
import { useState } from 'react';
import { getLocalStroage, setLocalStroage } from 'utils/localStorage';

export const useRecentKeyword = () => {
  const saved = getLocalStroage<string[]>(RECENT_KEY, []);
  const [recentKeywords, setRecentKeywords] = useState<string[]>(saved);

  const addRecentKeyword = (keyword: string) => {
    if (recentKeywords.includes(keyword)) return;
    const newKeywords = [keyword, ...recentKeywords].slice(0, MAX_RECENT);
    setLocalStroage(RECENT_KEY, newKeywords);
    setRecentKeywords(newKeywords);
  };

  return { recentKeywords, addRecentKeyword };
};