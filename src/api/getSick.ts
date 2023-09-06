import { fetcher } from 'utils/fetcher';

export const getSick = (keyword: string) => {
  return fetcher('?q=' + keyword).then((data) => data);
};
