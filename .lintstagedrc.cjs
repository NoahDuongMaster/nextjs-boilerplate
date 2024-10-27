const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '*.{js,ts,tsx,json,jsx,scss,css}': [
    "prettier --write '**/*.{js,jsx,ts,tsx,scss,css,json}'",
    "stylelint '**/*.{scss,css}' --fix",
    buildEslintCommand,
    'vitest related --run',
  ],
};
