import { Request } from '@/adapters/xhr';
import { API_ROUTES } from '@/constants/routes.constant';

import { TGetMockQuery, TGetMockResponse } from './mock.schema';

const request = new Request();

export const getMockAPI = async ({ delay, error }: TGetMockQuery) =>
  request.get<TGetMockResponse>(API_ROUTES.GET_MOCK, {
    delay,
    error,
  });
