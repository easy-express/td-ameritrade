import axios from 'axios';

const TD_HOST = `https://api.tdameritrade.com`;

export const getQuery = <T>(query: string, accessToken?: string): Promise<T> => {
  return axios
    .get(
      TD_HOST + query,
      accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        : undefined,
    )
    .then((result) => result.data as T)
    .catch((e) => {
      return e;
    });
};
