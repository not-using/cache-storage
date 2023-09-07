export const getLocalStroage = <T>(key: string, initial?: T) => {
  const stringified = window.localStorage.getItem(key);
  if (stringified === null) return initial ?? [];
  return JSON.parse(stringified) as T;
};
export const setLocalStroage = <T>(key: string, data: T) =>
  window.localStorage.setItem(key, JSON.stringify(data));
