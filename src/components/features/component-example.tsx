'use client';

import React from 'react';
import { getMockAPI } from '@/adapters/mock/mock.api';
import { useSuspenseQuery } from '@tanstack/react-query';

function ComponentExample({ delay }: { delay: number }) {
  const { data } = useSuspenseQuery({
    queryKey: ['wait', delay],
    queryFn: ({ queryKey }) => getMockAPI({ delay: queryKey[1] as number }),
  });
  return (
    <div className="aspect-video rounded-xl bg-muted/50 flex justify-center items-center">
      {data.data}
    </div>
  );
}

export default ComponentExample;
