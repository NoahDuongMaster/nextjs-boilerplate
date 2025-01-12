import { relative } from 'path';

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => relative(process.cwd(), f))
    .join(' --file ')}`;

export default {
  '*.{js,ts,tsx,json,jsx,scss,css}': [
    "prettier --write '**/*.{js,jsx,ts,tsx,scss,css,json}'",
    "stylelint '**/*.{scss,css}' --fix",
    buildEslintCommand,
    () => 'tsc --noEmit',
    'vitest related --run',
  ],
};
