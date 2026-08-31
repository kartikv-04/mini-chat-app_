# GitHub Copilot Instructions for Threadr

## Project Rules & Guidelines
All development standards, monorepo architecture, directory mapping, and quality gates are documented in [AGENTS.md](../AGENTS.md).

## Core Requirements & Non-Negotiables
- **No Automatic Git Operations**: NEVER execute `git commit` or `git push` without explicit user request.
- **Explain Terminal Commands**: Always specify what each command does and why it is necessary before execution.
- **TypeScript Integrity**: Strictly avoid `any` in both frontend and backend codebases.
- **Verification Gates**: Always run the respective lint, test, and build commands before finalizing changes.

## Quick Commands
- **Backend Lint**: `npm --prefix backend run lint`
- **Frontend Lint**: `npm --prefix frontend run lint`
- **Backend Tests**: `npm --prefix backend test`
- **Frontend Tests**: `npm --prefix frontend test`
- **Frontend Build**: `npm --prefix frontend run build`
