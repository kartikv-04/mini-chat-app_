# Agent Rules and Guidelines for Threadr

Welcome to **Threadr**, a real-time, server-based chat application designed for seamless group communication. This file outlines the operational boundaries, architecture, directory structure, coding standards, and quality verification gates that any AI developer agent must strictly follow.

---

## 1. Operational & Communication Rules
- **Terminal Commands**: ALWAYS explain the exact purpose (**what** it does and **why** it is necessary) of any terminal command before proposing or running it. 
- **Git Commit & Push**: NEVER perform automatic commits (`git commit`) or pushes (`git push`) without explicit user permission. The user manages commit and push cycles manually or grants explicit approval.
- **Clarification**: If a task description or code change is ambiguous, ask the user for clarification rather than making assumptions.

---

## 2. Project Architecture & Scope
Threadr is structured as a monorepo containing distinct backend and frontend codebases:
* **Scope**: A desktop-optimized, real-time Slack/Discord-like chat application featuring servers, rooms, role-based access control (RBAC), and invitation links.
* **Frontend**: Next.js 16 (App Router) written in TypeScript, using:
  - **State Management**: Zustand
  - **Data Synchronization**: TanStack Query (React Query)
  - **Real-Time Interface**: Socket.io-client
  - **Styling**: Tailwind CSS v4 & Shadcn UI
  - **Testing**: Vitest & React Testing Library
* **Backend**: Node.js & Express.js written in TypeScript (ES Modules), using:
  - **Database**: MongoDB via Mongoose
  - **Authentication**: JWT (JSON Web Tokens) with auto-refreshing sessions & HttpOnly cookies
  - **Validation**: Zod (schema validations)
  - **Logging**: Pino logger
  - **Testing**: Jest & Supertest (using `mongodb-memory-server` for database testing)

---

## 3. Directory Structure
```
threadr/
├── .agents/
│   ├── AGENTS.md                 # Agent rules and codebase guidelines
│   └── skills/                   # Stack-specific project skills
│       ├── backend-test-runner/  # Backend Jest & in-memory DB testing skill
│       ├── frontend-test-runner/ # Frontend Vitest & React component testing skill
│       └── schema-guard/         # Mongoose & Zod schema inspection skill
├── .github/
│   ├── workflows/
│   │   └── ci-pipeline.yml       # GitHub Actions CI pipeline
│   └── copilot-instructions.md   # GitHub Copilot Workspace instructions
├── backend/
│   ├── src/
│   │   ├── config/               # DB, Env, and Pino Logger configurations
│   │   ├── controller/           # Express controllers handling route logic
│   │   ├── helper/               # Async handlers, custom utility functions, token generators
│   │   ├── middleware/           # Auth, RBAC, socketAuth, and error middleware
│   │   ├── models/               # Mongoose schemas (User, Server, Room, Invite, Member, Message)
│   │   ├── routes/               # API route definitions
│   │   ├── service/              # Business logic services
│   │   ├── socket/               # Socket.io handlers (messageHandler, roomHandler)
│   │   ├── types/                # Express & Socket type definitions
│   │   ├── validator/            # Zod validation schemas
│   │   ├── app.ts                # Express app setup and middleware configuration
│   │   └── server.ts             # HTTP & Socket.io server entry point
│   ├── tests/
│   │   ├── helpers/              # In-memory Mongo test database handler
│   │   ├── integration/          # Integration test suites (auth, server, room, invite)
│   │   └── unit/                 # Unit tests (hashPassword, generateToken)
│   ├── .env.example              # Backend environment template
│   ├── eslint.config.mts         # Backend ESLint Flat Configuration
│   ├── jest.config.js            # Jest configuration
│   ├── tsconfig.json             # Backend TypeScript configuration
│   └── package.json
├── frontend/
│   ├── app/                      # Next.js App Router pages and layouts
│   ├── components/               # Reusable UI components & Shadcn primitives
│   ├── feature/                  # Domain modules (auth, chat, invite, room, server)
│   │   ├── auth/                 # Auth stores, hooks, APIs, and forms
│   │   ├── chat/                 # Chat components, APIs, and hooks
│   │   ├── invite/               # Invite modal and hooks
│   │   ├── room/                 # Room sidebar, modals, and APIs
│   │   └── server/               # Server icons, modals, and APIs
│   ├── lib/                      # Axios client, socket instance, socket manager
│   ├── public/                   # Static assets
│   ├── .env.example              # Frontend environment template
│   ├── eslint.config.mjs         # Frontend ESLint configuration
│   ├── next.config.ts            # Next.js configuration
│   ├── tsconfig.json             # Frontend TypeScript configuration
│   ├── vitest.config.ts          # Vitest testing configuration
│   └── package.json
├── .cursorrules                  # Cursor IDE project rules
├── .gitignore                    # Universal root gitignore
├── CLAUDE.md                     # Claude Code memory and commands
├── docker-compose.yml            # Containerized deployment spec
└── README.md                     # Project documentation
```

---

## 4. Development & Quality Verification Gates
- **TypeScript & Type Safety**:
  - Use strictly typed TypeScript for all changes.
  - NEVER use `any` unless explicitly justified with inline comments.
- **Lint & Code Style Gates**:
  - Keep components modular, small, and responsive.
  - Run lints before declaring code changes complete:
    - **Backend Lint**: `npm --prefix backend run lint`
    - **Frontend Lint**: `npm --prefix frontend run lint`
- **Testing Verification Gates**:
  - Do not introduce breaking logic changes that invalidate existing tests.
  - Before declaring a task finished, verify that the local test suites run and pass:
    - **Backend Tests**: `npm --prefix backend test` (or `npm --prefix backend test -- --runInBand`)
    - **Frontend Tests**: `npm --prefix frontend test`
- **Build Verification Checks**:
  - Verify that the production build succeeds locally:
    - **Frontend Build**: `npm --prefix frontend run build`
    - **Backend Build**: `npm --prefix backend run build`

---

## 5. Environment Variables Reference
All secrets and config values are stored in `.env` files. **Never hardcode secrets or commit `.env` files.**

- **Backend (`backend/.env`)**:
  - `PORT`: Server port (e.g. `5001`)
  - `MONGO_URI`: MongoDB connection string (e.g. `mongodb://localhost:27017/threadr`)
  - `ACCESS_SECRET`: Secret key for JWT access tokens
  - `REFRESH_SECRET`: Secret key for JWT refresh tokens
  - `LOG_LEVEL`: Pino log level (`info`, `debug`, `error`)
  - `NODE_ENV`: Environment mode (`development`, `production`, `test`)
  - `CLIENT_URL`: Allowed frontend origin for CORS (e.g. `http://localhost:3000`)

- **Frontend (`frontend/.env`)**:
  - `NEXT_PUBLIC_API_URL`: Backend REST API base URL (e.g. `http://localhost:5001/api/v1`)
  - `NEXT_PUBLIC_SOCKET_URL`: Socket.io server URL (e.g. `http://localhost:5001`)

---

## 6. Protected Directories & Schema Guard
| Directory / File | Reason |
| :--- | :--- |
| `frontend/.next/` / `dist/` | Auto-generated Next.js build output — never edit manually |
| `backend/dist/` | Compiled TypeScript output — re-generated by `tsc` |
| `node_modules/` | Managed by npm — never mutate directly |
| `backend/src/models/` | Authoritative Mongoose schemas — inspect model definitions before adding or querying fields |
| `backend/src/validator/` | Authoritative Zod request payload schemas — update validations in sync with models |
