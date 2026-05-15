# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

Vue Vben Admin v5 is a modern Vue 3 admin template using a monorepo architecture with pnpm workspaces and Turbo. It provides multiple UI framework variants (Ant Design Vue, Element Plus, Naive UI, TDesign) built on a shared core.

## Architecture

### Monorepo Structure

```
├── apps/                    # Application entry points
│   ├── backend-mock/        # Nitro-based mock API server
│   ├── web-antd/           # Ant Design Vue variant
│   ├── web-antdv-next/     # Next-gen Ant Design Vue
│   ├── web-ele/            # Element Plus variant
│   ├── web-naive/          # Naive UI variant
│   └── web-tdesign/        # TDesign variant
├── packages/
│   ├── @core/              # Core foundational packages
│   │   ├── base/           # Base components and utilities
│   │   ├── composables/    # Shared Vue composables
│   │   ├── preferences/    # User preference system
│   │   └── ui-kit/         # UI-agnostic component kit
│   ├── effects/            # Business logic packages
│   │   ├── access/         # Permission and access control
│   │   ├── common-ui/      # Common UI components
│   │   ├── hooks/          # Business hooks
│   │   ├── layouts/        # Page layouts
│   │   ├── plugins/        # Vite plugins
│   │   └── request/        # HTTP request handling
│   ├── business/           # Business components
│   ├── constants/          # Shared constants
│   ├── icons/              # Icon system
│   ├── locales/            # i18n translations
│   ├── preferences/        # Preference defaults
│   ├── stores/             # Pinia stores
│   ├── styles/             # Global styles
│   ├── types/              # Type definitions
│   └── utils/              # Utility functions
├── internal/               # Internal tooling
│   ├── lint-configs/       # ESLint, Stylelint configs
│   ├── node-utils/         # Node.js utilities
│   ├── tailwind-config/    # Tailwind configuration
│   ├── tsconfig/           # TypeScript configs
│   ├── turbo-run/          # Turbo CLI utilities
│   ├── vite-config/        # Vite configuration
│   └── vsh/                # Vben shell utilities
├── scripts/                # Build and deploy scripts
├── playground/             # Component playground
└── docs/                   # VitePress documentation
```

### Key Technologies

- **Vue 3**: Composition API with `<script setup>` syntax
- **Vite**: Build tool with HMR
- **TypeScript**: Strict type checking
- **Pinia**: State management
- **Vue Router**: Client-side routing
- **Vue I18n**: Internationalization
- **Tailwind CSS v4**: Utility-first CSS
- **Turbo**: Monorepo task runner
- **pnpm**: Package manager with workspaces

## Development Commands

### Installation

```bash
# Enable pnpm and install dependencies
npm i -g corepack
pnpm install
```

### Development

```bash
# Start dev server (runs all apps in parallel)
pnpm dev

# Start specific app
pnpm dev:antd      # Ant Design Vue
pnpm dev:ele     # Element Plus
pnpm dev:naive   # Naive UI
pnpm dev:tdesign # TDesign
pnpm dev:play    # Playground
```

### Building

```bash
# Build all packages and apps
pnpm build

# Build specific app
pnpm build:antd
pnpm build:ele
pnpm build:naive
pnpm build:tdesign
```

### Testing

```bash
# Run unit tests with Vitest
pnpm test:unit

# Run unit tests in watch mode
pnpm test:unit -- --watch

# Run single test file
pnpm test:unit -- src/components/Button.test.ts

# Run E2E tests with Playwright
pnpm test:e2e

# Run E2E for specific app
pnpm --filter @vben/web-antd test:e2e
```

### Linting and Formatting

```bash
# Run all linters (ESLint, Oxlint, Stylelint, spell check)
pnpm lint

# Run specific linter
pnpm eslint
pnpm oxlint
pnpm stylelint

# Format code
pnpm format

# Check for circular dependencies
pnpm check:circular

# Check dependencies
pnpm check:dep

# Run all checks
pnpm check
```

### Type Checking

```bash
# Type check all packages
pnpm check:type

# Type check specific package
pnpm --filter @vben/web-antd typecheck
```

### Other Commands

```bash
# Update dependencies
pnpm update:deps

# Clean node_modules and lock file
pnpm clean
pnpm reinstall

# Preview production build
pnpm preview

# Analyze bundle
pnpm build:analyze

# Run changeset for versioning
pnpm changeset
pnpm version
```

## Code Style and Conventions

### Git Workflow

- Use conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, `test:`, `style:`, `perf:`, `ci:`, `types:`
- Create feature branches from `main`: `git checkout -b feat/feature-name`
- Pull requests are validated by CI

### Code Organization

- Use `<script setup>` syntax for Vue components
- Use Composition API over Options API
- Organize imports: external → internal → types → composables
- Use explicit type annotations for function parameters and returns
- Prefer `const` and `let` over `var`

### Naming Conventions

- Components: PascalCase (e.g., `UserProfile.vue`)
- Composables: camelCase with `use` prefix (e.g., `useUser.ts`)
- Utils: camelCase (e.g., `formatDate.ts`)
- Types/Interfaces: PascalCase with descriptive names (e.g., `UserConfig`, `ApiResponse`)
- Constants: SCREAMING_SNAKE_CASE for true constants

### File Structure

```vue
<template>
  <!-- Template content -->
</template>

<script setup lang="ts">
// 1. External imports
import { ref, computed } from 'vue';
import type { PropType } from 'vue';

// 2. Internal imports
import { useUserStore } from '#/store';
import { formatDate } from '#/utils';

// 3. Types
interface Props {
  userId: string;
}

// 4. Composables
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update', value: string): void;
}>();

// 5. State
const count = ref(0);

// 6. Computed
const doubled = computed(() => count.value * 2);

// 7. Methods
function increment() {
  count.value++;
}
</script>

<style scoped>
/* Scoped styles or use Tailwind classes in template */
</style>
```

## Testing

### Unit Tests (Vitest)

```typescript
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MyComponent from './MyComponent.vue';

describe('MyComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(MyComponent, {
      props: { title: 'Test' },
    });
    expect(wrapper.text()).toContain('Test');
  });
});
```

### E2E Tests (Playwright)

```typescript
import { expect, test } from '@playwright/test';

test('user can login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="username"]', 'admin');
  await page.fill('[name="password"]', '123456');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

## Common Tasks

### Adding a New Route

1. Create the page component in `src/views/` or `src/pages/`
2. Add route configuration in the router file
3. If needed, add menu item in the menu configuration

### Adding a New Store

1. Create the store file using `defineStore`
2. Export from the store index
3. Use in components with `useStore()`

### Adding a New UI Component

1. Check if it exists in the core UI kit first
2. Create component in appropriate package (`packages/@core/ui-kit/` or `packages/effects/common-ui/`)
3. Export and register for use

### Working with Backend Mock

The mock server is in `apps/backend-mock/`. It uses Nitro and provides API endpoints for development.

```bash
# Start mock server
pnpm dev:mock  # (if available) or
pnpm --filter @vben/backend-mock dev
```

## Troubleshooting

### Common Issues

**Out of memory during build:**

```bash
# Increase Node memory
export NODE_OPTIONS=--max-old-space-size=8192
pnpm build
```

**Type errors after dependency update:**

```bash
pnpm clean
pnpm install
pnpm check:type
```

**Lint errors on Windows (line endings):** Ensure `core.autocrlf` is set correctly in Git config.

**pnpm install fails:** Ensure you're using the correct Node version (20.19.0+, 22.18.0+, or 24.0.0+).

### Getting Help

- Documentation: https://doc.vben.pro/
- Issues: https://github.com/vbenjs/vue-vben-admin/issues
- Discussions: https://github.com/vbenjs/vue-vben-admin/discussions
