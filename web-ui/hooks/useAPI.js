import useSWR from "swr";

export const BASE = `http://localhost:5200/api/v1`;
//export const BASE = `https://askbitcoin.ai/api/v1`;

import axios from "../utils/axios";

export function fetcher(params) {
  return axios(params).then(({ data }) => {
    return data;
  });
}

export function useAPI(path) {
  let {
    data,
    error,
    mutate: refresh,
    isValidating: loading,
  } = useSWR(`${BASE}${path}`, fetcher);

  return { data, error, refresh, loading };
}
