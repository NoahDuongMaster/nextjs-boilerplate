import chalk from 'chalk';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const logger = ({
  message,
  type,
}: {
  message: string;
  type: 'ERROR' | 'INFO';
}) => {
  switch (type) {
    case 'ERROR':
      console.error(chalk.red(message));
      break;

    default:
      console.info(chalk.blue(message));
      break;
  }
};

const getInfoDevice = () => {
  const device = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
    ? 'MOBILE'
    : 'DESKTOP';
  const collapsed = device !== 'DESKTOP';

  return {
    device,
    collapsed,
  } as const;
};

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export { logger, getInfoDevice, cn };
