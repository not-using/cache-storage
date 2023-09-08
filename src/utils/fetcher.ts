import { Sick } from 'types/Sick';
import { cache } from './cache';
import { CACHE_MAX_AGE, EXPIRE_HEADER } from 'constants/cache';
import { BASE_URL, BASIC_HEADERS } from 'constants/fetch';

export const fetcher = async (uri: string): Promise<Sick[]> => {
  const { getCache, setCache, deleteCache } = await cache();
  const cachedData = await getCache(uri);
  if (cachedData) {
    const cachedExpire = cachedData.headers.get(EXPIRE_HEADER);
    const isFresh = cachedExpire && new Date().getTime() > +cachedExpire;

    if (isFresh) return cachedData.json();
    deleteCache(uri);
  }

  const freshData = await fetch(BASE_URL + uri, {
    headers: BASIC_HEADERS,
  });
  console.info('calling api');
  const expireTime = new Date().getTime() + CACHE_MAX_AGE;
  const caching = new Response(freshData.clone().body, {
    headers: {
      ...BASIC_HEADERS,
      [EXPIRE_HEADER]: expireTime.toString(),
    },
  });
  setCache(uri, caching);

  return freshData.json();
};
