import { API_ROUTES } from '@/constants/routes.constant';
import { request } from '@adapters/xhr';

import { TGetMockQuery, TGetMockResponse } from './mock.schema';

const getMock = async ({ delay, error }: TGetMockQuery) =>
  request<TGetMockResponse>('GET', API_ROUTES.GET_MOCK, {
    delay,
    error,
  });

export { getMock };
