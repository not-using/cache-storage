import { MAX_RECENT, RECENT_KEY } from 'constants/recentKeyword';
import { getLocalStroage } from './localStorage';

export const getRecentKeywords = () => getLocalStroage<string[]>(RECENT_KEY, []);

export const addRecentKeyword = (keyword: string) => {
  const recentKeywords = getRecentKeywords();
  if (recentKeywords.includes(keyword)) return;
  window.localStorage.setItem(
    'recentKeywords',
    JSON.stringify([keyword, ...recentKeywords].slice(0, MAX_RECENT)),
  );
};
