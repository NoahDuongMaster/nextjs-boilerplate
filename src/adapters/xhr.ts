import { envClient } from '@/shared/env-client';
import { ACCESS_TOKEN_STORAGE_KEY } from '@/shared/jwt.shared';
import { AUTH_SCHEMES } from '@/shared/schema.shared';
import qs from 'qs';

const BASE_URL = envClient.NEXT_PUBLIC_API_ENDPOINT;
const DEFAULT_TIMEOUT = 20000;

const getDefaultHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (envClient.NEXT_PUBLIC_AUTH_SCHEMES === AUTH_SCHEMES.Values.header) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return headers;
};

const request = async (
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  data?: any,
  options?: RequestInit,
): Promise<Response | null | { message: string }> => {
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
  } catch {
    return { message: "Something wen't wrong!" };
  } finally {
    clearTimeout(timeout);
  }
};

export { request };
