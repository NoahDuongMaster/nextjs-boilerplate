'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { logger } from '@/helpers/logger.helper';

const WebVitals = () => {
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case 'TTFB':
        logger({
          message: `Thời gian phản hồi: ${(metric.value / 1000).toFixed(2)}s`,
          type: 'INFO',
        });

        break;
      case 'FCP':
        logger({
          message: `Thời gian hiển thị nội dung đầu tiên: ${(
            metric.value / 1000
          ).toFixed(2)}s`,
          type: 'INFO',
        });
        break;
    }
  });

  return null;
};

export default WebVitals;
