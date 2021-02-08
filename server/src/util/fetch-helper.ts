import fetch from 'node-fetch';

export interface FetchParams {
  data: any;
  headers: any;
  method: string;
}

export const makeRequest = async (url: string, options: FetchParams) => {
  const reqOpts = {
    method: options.method,
  } as any;
  if (options.headers) reqOpts.headers = options.headers;
  if (options.data) reqOpts.body = JSON.stringify(options.data);
  return fetch(url, reqOpts);
};
