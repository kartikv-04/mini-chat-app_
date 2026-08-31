---
name: frontend-test-runner
description: Run and debug frontend tests for Threadr with Vitest and React Testing Library. Use when testing components, Zustand stores, or TanStack Query hooks.
---

# Frontend Test Runner for Threadr

This skill guides testing frontend React components, hooks, and Zustand state stores in Threadr.

## Test Environment
- **Framework**: Vitest (`frontend/vitest.config.ts`)
- **Environment**: jsdom
- **Libraries**: React Testing Library, `@testing-library/jest-dom`
- **Location**: Feature test files are located alongside features in `frontend/feature/<name>/__tests__/`

## Running Tests
Always explain the command before running:

```bash
# Run all frontend tests
npm --prefix frontend test

# Run tests in watch mode
npm --prefix frontend run test:watch

# Run a specific test file
npm --prefix frontend test -- feature/auth/__tests__/auth.hook.test.tsx
```

## Adding New Tests
1. Follow existing patterns in [`frontend/feature/auth/__tests__/`](file:///E:/Projects/Full%20Stack%20Project/Personal%20Projects/github/threadr/frontend/feature/auth/__tests__/).
2. Mock `@tanstack/react-query` or `axios` as needed.
3. Verify test assertions with `@testing-library/react`.
