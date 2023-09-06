import { Sick } from 'types/Sick';
import { cache } from './cache';

const BASE_URL = 'http://localhost:4000/sick';

export const fetcher = async (uri: string): Promise<Sick[]> => {
  const { getCache, setCache } = await cache();
  const cacheData = await getCache(uri);
  if (cacheData) {
    return cacheData.json();
  }

  const freshData = await fetch(BASE_URL + uri, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
  console.info('calling api');
  setCache(uri, freshData.clone());
  return freshData.json();
};
