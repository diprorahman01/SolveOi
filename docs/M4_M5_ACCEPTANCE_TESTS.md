# SolveOi M4 + M5 acceptance checklist

Run these tests against a **development database**, not real customer data. This patch has not been end-to-end tested against your Atlas environment.

## Baseline

- [ ] Copy the patch into the SolveOi ROOT and preserve existing M3 `.env.local` secrets.
- [ ] `npm install`, `npm run lint`, `npm run typecheck` pass.
- [ ] `npm run db:test` and `npm run m5:setup` succeed.
- [ ] Linux GitHub Actions build passes for the NEW commit (not the old M3 build).
- [ ] Existing sign-up / email verification / sign-in / reset / invitation flows still work.

## Owner account

- [ ] Create organization; `/app` displays correct company and user.
- [ ] `/app/team` invites employee; employee accepts.
- [ ] Owner grants an employee future access to one product; grant persists after reload.
- [ ] `/app/tasks` creates manual task; appears under organization, awaiting approval.
- [ ] Approve task; status transitions once, and a second attempt is rejected.
- [ ] Create another task and reject it.
- [ ] Upload PDF/JPG/PNG/TXT under 5 MB; download it successfully.
- [ ] Reject an invalid MIME, fake signature or > 5 MB file.
- [ ] `/app/activity` shows relevant M5 events, not secrets.
- [ ] `/app/products` displays all six products as Coming Soon regardless of entitlement.

## Employee account

- [ ] Employee sees own task, activity and private files only.
- [ ] Employee cannot visit owner-only `/app/team`; API `/api/m5/grants` returns 403.
- [ ] Employee cannot approve tasks (PATCH returns 403).
- [ ] Employee cannot download another employee's file (404).
- [ ] Employee cannot see a second company's tasks by guessing IDs.

## Platform Super Admin

- [ ] Admin sees `/platform` and its three management sections.
- [ ] A normal owner/employee cannot access `/platform` or POST `/api/m5/entitlements`.
- [ ] Admin can set product entitlements on an existing organization, but those products remain unreleased.
- [ ] Audit events are recorded for entitlement and team grant changes.

## Sandbox infrastructure (optional, costs money if enabled)

- [ ] Without M5_AI_ENABLED, no AI tasks can be submitted or executed.
- [ ] With explicitly limited credentials and both opt-ins enabled, queued sandbox task processes once through `npm run m5:worker:once`.
- [ ] Worker endpoint without valid secret returns 401; do not log keys.
- [ ] AI output is marked awaiting human review, not auto-approved.
- [ ] Usage event records actual provider-reported token counts.
- [ ] Worker retries errors up to configured limit; exhausted tasks end in failed state.

## Responsive layouts

- [ ] 320, 375, 430, 768, 1024, 1280 and 1536 px widths; no horizontal overflow, menu accessible, forms usable.
- [ ] 200% zoom and keyboard-only menu/forms.
- [ ] Loading, empty, error and forbidden states are understandable.

## Security / deployment gates

- [ ] No `.env.local` or provider keys tracked by Git.
- [ ] MongoDB/worker credentials rotated if previously exposed.
- [ ] Real production files migrated off GridFS to private object storage with malware scanning/retention.
- [ ] Real background worker deployment, budgets, telemetry, backups, alerting and incident response configured.
- [ ] Payments/subscriptions and the six AI products individually implemented and accepted in later milestones.
