// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
import { env } from '@/configurations/env.configuration';
import { jwt } from '@/configurations/jwt.configuration';
import { WEB_ROUTES } from '@/constants/routes.constant';
import Cookies from 'js-cookie';
import ky, { Input, KyInstance, KyResponse, Options } from 'ky';
import qs from 'qs';

const DEFAULT_TIMEOUT = 30000;
const DEFAULT_BASE_URL = env.client.NEXT_PUBLIC_API_ENDPOINT!;
const DEFAULT_REFRESH_PATH = 'refresh-token'; // TODO: change to actual path

export class Request {
  private readonly instance: KyInstance;
  constructor() {
    const kyInstance = ky.create({
      prefixUrl: DEFAULT_BASE_URL,
      timeout: DEFAULT_TIMEOUT,
      headers: { 'Content-Type': 'application/json' },
      retry: {
        limit: 1,
        statusCodes: [401],
      },
      hooks: {
        beforeRequest: [
          async (request) => {
            if (typeof window !== 'undefined') {
              const accessToken = localStorage.getItem(jwt.accessToken.key);
              if (accessToken) {
                request.headers.set('Authorization', `Bearer ${accessToken}`);
              }
            }
            // else {
            //   const cookiesStore = await cookies();
            //   const accessToken = cookiesStore.get(jwt.accessToken.key)?.value;
            //   if (accessToken) {
            //     request.headers.set('Authorization', `Bearer ${accessToken}`);
            //   }
            // }
          },
        ],
        beforeRetry: [
          async ({ request, error }) => {
            try {
              let refreshToken: string | null | undefined;
              if (typeof window !== 'undefined') {
                const refreshTokenCookie = Cookies.get(jwt.refreshToken.key);
                const refreshTokenLocalStorage = localStorage.getItem(
                  jwt.refreshToken.key,
                );
                refreshToken = refreshTokenCookie || refreshTokenLocalStorage;
              }
              // else {
              //   const cookiesStore = await cookies();
              //   const refreshTokenCookie = cookiesStore.get(
              //     jwt.refreshToken.key,
              //   )?.value;
              //   refreshToken = refreshTokenCookie;
              // }

              if (!refreshToken) {
                throw error;
              }

              const token = await ky
                .post<{ data: Record<string, string> }>(DEFAULT_REFRESH_PATH, {
                  prefixUrl: DEFAULT_BASE_URL,
                  timeout: DEFAULT_TIMEOUT,
                  headers: { 'Content-Type': 'application/json' },
                  json: {
                    refresh_token: refreshToken,
                  },
                  credentials: 'include',
                })
                .json();

              const newAccessToken = token.data.data[
                jwt.accessToken.key as keyof typeof token.data.data
              ]! as string;
              const newRefreshToken = token.data.data[
                jwt.refreshToken.key as keyof typeof token.data.data
              ]! as string;

              if (typeof window !== 'undefined') {
                Cookies.set(
                  jwt.accessToken.key,
                  newAccessToken,
                  jwt.accessToken.config,
                );
                Cookies.set(
                  jwt.refreshToken.key,
                  newRefreshToken,
                  jwt.refreshToken.config,
                );
              }
              // else {
              //   const cookiesStore = await cookies();
              //   cookiesStore.set(
              //     jwt.accessToken.key,
              //     newAccessToken,
              //     jwt.accessToken.config,
              //   );
              //   cookiesStore.set(
              //     jwt.refreshToken.key,
              //     newRefreshToken,
              //     jwt.refreshToken.config,
              //   );
              // }
              request.headers.set('Authorization', `Bearer ${newAccessToken}`);
            } catch {
              if (typeof window !== 'undefined') {
                Cookies.remove(jwt.accessToken.key, jwt.accessToken.config);
                Cookies.remove(jwt.refreshToken.key, jwt.refreshToken.config);
                localStorage.removeItem(jwt.accessToken.key);
                window.location.replace(WEB_ROUTES.SIGN_IN);
              }
              // else {
              //   const cookiesStore = await cookies();
              //   cookiesStore.delete(jwt.accessToken.key);
              //   cookiesStore.delete(jwt.refreshToken.key);
              //   redirect(WEB_ROUTES.SIGN_IN);
              // }
              throw error;
            }
          },
        ],
      },
      credentials: 'include',
    });

    this.instance = kyInstance;
  }

  public async get<R>(
    url: Input,
    data?: Record<string, unknown>,
    options?: Options,
  ): Promise<R> {
    const newUrl = (url += data ? `?${qs.stringify(data)}` : '');
    return this.instance
      .get<R>(newUrl, {
        ...options,
        signal: AbortSignal.timeout(DEFAULT_TIMEOUT),
      })
      .json();
  }

  public async post<D extends BodyInit, R>(
    url: Input,
    data: D,
    options?: Options,
  ): Promise<KyResponse<R>> {
    return this.instance
      .post<R>(url, {
        ...options,
        signal: AbortSignal.timeout(DEFAULT_TIMEOUT),
        json: data,
      })
      .json();
  }

  public async put<D extends BodyInit, R>(
    url: Input,
    data: D,
    config?: Options,
  ): Promise<KyResponse<R>> {
    return this.instance
      .put<R>(url, {
        ...config,
        signal: AbortSignal.timeout(DEFAULT_TIMEOUT),
        json: data,
      })
      .json();
  }

  public async delete<R>(
    url: Input,
    data?: Record<string, unknown>,
    config?: Options,
  ): Promise<KyResponse<R>> {
    const newUrl = (url += data ? `?${qs.stringify(data)}` : '');
    return this.instance
      .delete<R>(newUrl, {
        ...config,
        signal: AbortSignal.timeout(DEFAULT_TIMEOUT),
      })
      .json();
  }
}
