// import { loadUser } from '../components/auth/userContext';

//const urlBase = 'http://localhost:5000';

interface WebRequestOptions {
  method?: string;
  data?: any | undefined;
  anonymous?: boolean;
}

// Taken from MDN: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
const webRequest = async (url: string, options?: WebRequestOptions) => {
  const { method = 'GET', anonymous = false, data } = options ?? {};
  const config = {
    method, // *GET, POST, PUT, DELETE, etc.
    //mode: 'cors', // no-cors, *cors, same-origin
    //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${idToken}`,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    //redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
  } as RequestInit;
  // if (!anonymous) {
  //   const userData = await loadUser();
  //   if (userData?.authToken)
  //     config.headers = { ...config.headers, Authorization: `Bearer ${userData?.authToken}` };
  // }
  if (data && method !== 'GET' && method !== 'HEAD') config.body = JSON.stringify(data); // body data type must match "Content-Type" header
  // Default options are marked with *
  //if (!url.startsWith('http')) url = urlBase + url;
  return await fetch(url, config);
};

export const DataService = {
  delete: async (url: string, options?: WebRequestOptions) =>
    webRequest(url, { ...options, method: 'DELETE' }),
  get: async (url: string, options?: WebRequestOptions) =>
    webRequest(url, { ...options, method: 'GET' }),
  patch: async (url: string, data: any | undefined, options?: WebRequestOptions) =>
    webRequest(url, { ...options, method: 'PATCH', data }),
  post: async (url: string, data: any | undefined, options?: WebRequestOptions) =>
    webRequest(url, { ...options, method: 'POST', data }),
  put: async (url: string, data: any | undefined, options?: WebRequestOptions) =>
    webRequest(url, { ...options, method: 'PUT', data }),
};
