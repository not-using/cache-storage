import { Sick } from 'types/Sick';
import { cache, isFreshCache, setCacheExpireTime } from './cache';
import { BASE_URL, BASIC_HEADERS } from 'constants/fetch';

export const fetcher = async (uri: string): Promise<Sick[]> => {
  const { getCache, setCache, deleteCache } = await cache();
  const cachedData = await getCache(uri);

  if (cachedData) {
    if (isFreshCache(cachedData)) {
      return cachedData.json();
    }
    deleteCache(uri);
  }

  const freshData = await fetch(BASE_URL + uri, { headers: BASIC_HEADERS });
  console.info('calling api');

  const cachingData = setCacheExpireTime(freshData);
  setCache(uri, cachingData);

  return freshData.json();
};
