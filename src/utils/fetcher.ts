import { Sick } from 'types/Sick';
import { cache } from './cache';
import { BASE_URL, BASIC_HEADERS } from 'constants/fetch';
export const fetcher = async (uri: string): Promise<Sick[]> => {
  const { getCache, setCache } = await cache();
  const cacheData = await getCache(uri);
  if (cacheData) {
    return cacheData.json();
  }

  const freshData = await fetch(BASE_URL + uri, {
    headers: BASIC_HEADERS,
  });
  console.info('calling api');
  setCache(uri, freshData.clone());
  return freshData.json();
};
