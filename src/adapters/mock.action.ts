'use server';

import 'server-only';

import { revalidateTag } from 'next/cache';
import { API_ROUTES } from '@/shared/routes.shared';

const refetchGetMock = () => {
  revalidateTag(API_ROUTES.GET_MOCK);
};

export { refetchGetMock };
