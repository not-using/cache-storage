import { CACHE_KEY, CACHE_MAX_AGE, EXPIRE_HEADER } from 'constants/cache';
import { BASIC_HEADERS } from 'constants/fetch';

export const cache = async () => {
  const cacheStroage = await caches.open(CACHE_KEY);

  const setCache = (key: string, response: Response) => {
    cacheStroage.put(key, response);
  };

  const getCache = async (key: string) => await cacheStroage.match(key);
  const deleteCache = async (key: string) => await cacheStroage.delete(key);

  return { setCache, getCache, deleteCache };
};

export const setCacheExpireTime = (freshData: Response) => {
  const expireTime = new Date().getTime() + CACHE_MAX_AGE;
  return new Response(freshData.clone().body, {
    headers: {
      ...BASIC_HEADERS,
      [EXPIRE_HEADER]: expireTime.toString(),
    },
  });
};

export const isFreshCache = (cachedResponse: Response) => {
  const cachedExpire = cachedResponse.headers.get(EXPIRE_HEADER);
  return cachedExpire && new Date().getTime() > +cachedExpire;
};
