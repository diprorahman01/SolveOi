# SolveOi M4 + M5 Architecture

## M4 — screens and permissions

- **Business Owner**: `/app` overview, `/app/products`, `/app/tasks` with approval decisions, `/app/team` with invitations and future tool grants, `/app/files`, `/app/activity`, `/app/settings`.
- **Employee**: same basic dashboard but company-wide task management, employee permission administration and billing control are not available; employees see their own task submissions, activity and uploads.
- **Platform Super Admin**: `/platform`, `/platform/organizations`, `/platform/products`, `/platform/audit`. Platform authorization is checked via the existing Better Auth `admin` role on the server. No separate identity system is introduced.
- **Responsive layout**: Tailwind grid + mobile `<details>` navigation; the existing SolveOi purple design language is retained.

## M5 — organization isolation

The active Better Auth organization is read from the signed-in user's session. Every ordinary customer API requires an active member and the current organization. The server, **never the client request body**, chooses the organization ID used by task and file queries. Members are constrained to their own records; owners can access company-level records. Platform admins use an independent authorization path.

**Collections** (all new): `m5_tasks`, `m5_entitlements`, `m5_product_grants`, `m5_files`, `m5_private_assets.files`, `m5_private_assets.chunks`, `m5_audit_logs`, `m5_usage_events`, `m5_subscriptions`. Existing Better Auth `user`, `session`, `account`, `organization`, `member` and other collections are reused unchanged.

**Task lifecycle**: manual task -> awaiting_approval -> approved/rejected. Optional sandbox AI task -> queued -> processing -> awaiting_approval -> approved/rejected; three retries maximum on failures. Worker uses MongoDB atomic `findOneAndUpdate` claim with a lease; a scheduled worker process must invoke its protected endpoint.

**Files**: PDFs, JPEGs, PNGs and text limited to 5 MB, signature checked, stored in MongoDB GridFS for the development MVP, downloaded through a private authenticated endpoint with `Content-Disposition: attachment` and `nosniff`. In production, choose object storage with malware scanning, retention, lifecycle/backup policy, per-tenant quotas and key management.

**AI gateway**: isolated in `src/lib/m5-ai.ts`; never exposed to browser, opt-in only, limited input length, bounded output tokens, response privacy flag, timeout and no automatic external actions. The six products stay Coming Soon until individually implemented and tested. The sandbox request is a separate infrastructure smoke test, NOT a released product.

**Subscription record**: prepared database model + index only. Billing and payment activation are NOT implemented and must not be represented as active subscriptions.

**Audit trail**: append-only application writes for M5 operations. This is not a tamper-proof immutable ledger and does not capture all Better Auth account actions. Extend for security operations before production.

## APIs

| Method | Route | Access |
|---|---|---|
| GET | `/api/m5/health` | Minimal public status |
| GET/POST | `/api/m5/tasks` | Active workspace; employee only own tasks |
| PATCH | `/api/m5/tasks/[id]` | Owner only, same organization, pending task only |
| GET | `/api/m5/activity` | Owner all events; employee only own |
| GET | `/api/m5/usage` | Owner all company usage; employee only own |
| GET | `/api/m5/products` | Active workspace; unreleased products unusable |
| POST | `/api/m5/grants` | Owner only; target user must be employee of own organization |
| POST | `/api/m5/entitlements` | Super Admin only; verifies organization exists |
| GET/POST | `/api/m5/files` | Active workspace; files scoped by owner/member |
| GET | `/api/m5/files/[id]` | Active workspace; authorized metadata before download |
| POST | `/api/m5/worker` | Private worker secret; opt-in AI only |

## Production requirements before real customers

Use the existing Linux GitHub Actions build to validate the new commit; test all role and cross-org boundaries; enforce usage/cost budgets; add secure private object storage; transactional billing; queue hosting with retries and alerting; session revocation, admin MFA, account recovery, stronger rate limiting, audit retention and observability. Avoid publicly opening MongoDB Atlas to unrestricted network access for CI.
