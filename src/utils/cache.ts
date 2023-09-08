import { CACHE_KEY } from "constants/cache";

export const cache = async () => {
  const cacheStroage = await caches.open(CACHE_KEY);

  const setCache = (key: string, response: Response) => {
    cacheStroage.put(key, response);
  };

  const getCache = async (key: string) => await cacheStroage.match(key);

  return { setCache, getCache };
};
