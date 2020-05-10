const cacheObj = {};
// TODO: Cleanup after the entries goes more than a limit
export const getCachedApiResponse = async url => {
  if (cacheObj[url]) {
    return cacheObj[url];
  }
  const response = await (await fetch(url)).json();
  cacheObj[url] = response;
  return response;
};
