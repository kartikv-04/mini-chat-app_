---
name: schema-guard
description: Inspect and synchronize Mongoose models and Zod validator schemas in Threadr. Use when modifying or querying database entities, API request payloads, or frontend API types.
---

# Schema Guard for Threadr

This skill ensures that database schemas, Zod validation schemas, and frontend API contracts remain perfectly synchronized and free of hallucinations.

## Authoritative Files
1. **Mongoose Models**: [`backend/src/models/`](file:///E:/Projects/Full%20Stack%20Project/Personal%20Projects/github/threadr/backend/src/models/)
   - `user.model.ts`: User accounts, emails, passwords, avatars
   - `server.model.ts`: Chat servers, owners, members
   - `room.model.ts`: Channels / rooms within servers
   - `member.model.ts`: Server memberships and RBAC roles (`owner`, `admin`, `member`)
   - `message.model.ts`: Real-time chat messages and attachments
   - `invite.model.ts`: Token-based invite links and expiration

2. **Zod Validators**: [`backend/src/validator/`](file:///E:/Projects/Full%20Stack%20Project/Personal%20Projects/github/threadr/backend/src/validator/)
   - Always validate incoming Express request bodies against Zod schemas before processing in controllers.

3. **Frontend API Types**: [`frontend/feature/`](file:///E:/Projects/Full%20Stack%20Project/Personal%20Projects/github/threadr/frontend/feature/)
   - Keep TypeScript types in `feature/<name>/<name>.type.ts` in sync with backend response models.

## Verification Checklist
- [ ] Inspect the Mongoose model before querying or persisting new fields.
- [ ] Update the corresponding Zod validator when request fields change.
- [ ] Update frontend type definitions in `frontend/feature/<domain>/` to match backend changes.
