import axios from 'axios';

const TD_HOST = `https://api.tdameritrade.com`;

export const getQuery = <T>(query: string, access_token?: string): Promise<T> => {
  return axios
    .get(
      TD_HOST + query,
      access_token
        ? {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        : undefined,
    )
    .then((result) => result.data as T)
    .catch((e) => {
      return e;
    });
};
