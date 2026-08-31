---
name: backend-test-runner
description: Run and debug backend unit and integration tests for Threadr with Jest, Supertest, and mongodb-memory-server. Use when testing backend endpoints, authentication, sockets, or models.
---

# Backend Test Runner for Threadr

This skill guides running, debugging, and writing backend tests in Threadr.

## Test Environment
- **Framework**: Jest with ES Modules (`node --experimental-vm-modules`)
- **Integration Testing**: Supertest against Express routes
- **Database**: In-memory MongoDB via `mongodb-memory-server`
- **Helpers**: Located at [`backend/tests/helpers/dbConnection.ts`](file:///E:/Projects/Full%20Stack%20Project/Personal%20Projects/github/threadr/backend/tests/helpers/dbConnection.ts)

## Running Tests
Always explain the command before running:

```bash
# Run all backend tests
npm --prefix backend test

# Run tests sequentially (prevents in-memory DB worker collisions)
npm --prefix backend test -- --runInBand

# Run a specific test file
npm --prefix backend test -- tests/integration/auth.test.ts

# Run unit tests only
npm --prefix backend test -- tests/unit/
```

## Adding New Tests
1. For endpoint integration tests, create files in `backend/tests/integration/<feature>.test.ts`.
2. Connect to the test DB using `dbHandler.connect()` in `beforeAll` and cleanup in `afterEach` (`dbHandler.clearDatabase()`).
3. Disconnect cleanly in `afterAll` (`dbHandler.closeDatabase()`).
