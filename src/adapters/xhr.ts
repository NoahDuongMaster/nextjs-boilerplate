import { env } from '@/configurations/env.configuration';
import { jwt } from '@/configurations/jwt.configuration';
import qs from 'qs';

const BASE_URL = env.client.NEXT_PUBLIC_API_ENDPOINT;
const DEFAULT_TIMEOUT = 30000;

const getDefaultHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem(jwt.accessToken.key);
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return headers;
};

const request = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  data?: any,
  options?: RequestInit,
): Promise<T> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  if (options?.signal) {
    options.signal.addEventListener('abort', () => controller.abort());
  }

  const commonOptions: RequestInit = {
    ...options,
    signal: controller.signal,
    headers: {
      ...getDefaultHeaders(),
      ...options?.headers,
    },
    method,
    next: {
      tags: [url],
    },
    credentials: 'include',
  };

  if (['POST', 'PATCH', 'PUT'].includes(method)) {
    commonOptions.body = JSON.stringify(data);
  } else if (method === 'GET' || method === 'DELETE') {
    url += data ? `?${qs.stringify(data)}` : '';
  }

  try {
    const res = await fetch(BASE_URL + url, commonOptions);
    return await res.json();
  } catch (error) {
    throw error;
  } finally {
    clearTimeout(timeout);
  }
};

export { request };
