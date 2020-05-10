const cacheObj = {};
export const getApiResponse = async url => {
  if (cacheObj[url]) {
    return cacheObj[url];
  }
  const response = await (await fetch(url)).json();
  cacheObj[url] = response;
  return response;
};
