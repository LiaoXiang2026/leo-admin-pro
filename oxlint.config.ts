import { oxlintConfig } from '@vben/oxlint-config';

import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [oxlintConfig],
  ignorePatterns: ['**/api/generated/**'],
});
