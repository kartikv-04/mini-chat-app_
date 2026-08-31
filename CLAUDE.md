# Project Memory & Commands for Claude Code

## Primary Rules & Architecture
All development guidelines, architecture scopes, directory structures, and git safety rules are defined in [AGENTS.md](AGENTS.md).

## Quick Verification Commands
- **Backend Lint**: `npm --prefix backend run lint`
- **Frontend Lint**: `npm --prefix frontend run lint`
- **Backend Tests**: `npm --prefix backend test` (or `npm --prefix backend test -- --runInBand`)
- **Frontend Tests**: `npm --prefix frontend test`
- **Frontend Build**: `npm --prefix frontend run build`

## Non-Negotiables
- ALWAYS explain the exact purpose (what it does and why it is necessary) of any terminal command before proposing or running it.
- NEVER run `git commit` or `git push` without explicit user permission.
- Strictly typed TypeScript: Avoid `any`.
- Verify tests and lint pass before declaring completion.
