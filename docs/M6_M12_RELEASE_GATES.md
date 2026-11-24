# SolveOi — M6–M12 release and security gates

**Status:** Internal beta implementation, *not a production-complete launch*. This document separates implemented local MVP features from remaining production requirements.

## M6 Quote — internal beta delivered
- Organization-separated quotations with up to 30 validated line items, currency BDT, server-calculated subtotal/tax/total.
- Human review and approval/rejection; history and printable quotation for **Print → Save as PDF**.
- **Not complete for release:** import and version price catalogs, match quotes to uploaded client requirements, customer-specific pricing policy, invoice/terms compliance, professional server-side PDFs, quote revision workflow and numerical test suite.

## M7 Extract — internal beta delivered
- Upload small `.txt`, `.csv`, `.tsv` text files or paste text, store as reviewed tenant records, export CSV.
- **Not complete for release:** PDF OCR, image parsing, structured field inference, confidence/validation rules, source annotations, spreadsheet formulas, large document pipelines and real AI extraction.

## M8 Collect — internal beta delivered
- Manual invoice entries, due dates, payment-reminder *drafts*, review and CSV export.
- **Not complete for release:** invoice ingestion integrations, actual payment matching, authorized message delivery, reminder scheduling, delivery logs, unsubscribe/consent and accounting integration.

## M9 Follow — internal beta delivered
- Lead registration, pipeline stage tracking, follow-up date, draft and review, export.
- **Not complete for release:** full activity timeline, calendar integration, automated reminders, CRM imports, deduplication, outreach permission and delivery.

## M10 Respond — internal beta delivered
- Tenant-owned approved support knowledge articles; keyword-matched source excerpts returned as **human review drafts**. Support tickets are private records.
- **Not complete for release:** public embeddable chatbot, website widget, robust permission-filtered RAG, response accuracy evaluations, safe automatic handoff, consent-based logs or live provider integration.

## M11 HR Desk — internal beta delivered
- HR policy knowledge, manual owner approval, employee/owner query drafts with cited matching excerpts and escalation fallback.
- **Not complete for release:** legal/compliance policy review, policy versioning, precise document citations, sensitive HR data handling and access controls, human escalation integrations and verified AI answers.

## M12 Payments/launch — foundation delivered, NOT complete
- Owner subscription status display, plan-of-interest request (manual review), audit entries, protected access. **No checkout, no auto-entitlements, no charges, no provider references generated.**
- Before charging customers: choose a payment provider suited to Bangladesh and target markets; sign service agreements; implement server-side checkout and secret-backed signature verification; handle payment webhooks idempotently; reconcile verified payments; enforce subscription entitlements and quotas; add invoices/refunds/cancellations/disputes and tax/privacy terms; test billing failure cases.
- Before launch: verified business email domain, deliverability tests, background worker hosting, abuse and cost limits, E2E browser tests, cross-tenant authorization tests, mobile responsive audits, backup/restore rehearsal, malware scanning/private object storage, log retention, data-deletion workflow, incident response, admin MFA and release monitoring.

## Indexes (recommended after copying)

Use MongoDB Atlas → Browse Collections → `solveoi_dev`. The optional script `apps/customer/scripts/m6-m12-setup.mjs` creates these on your current dev database:
- `m6_m11_workflows` index `{organizationId:1,productId:1,createdAt:-1}`
- `m6_m11_workflows` index `{organizationId:1,productId:1,status:1,kind:1}`
- `m6_m11_workflows` index `{organizationId:1,createdBy:1,createdAt:-1}`
- `m12_plan_requests` index `{organizationId:1,createdAt:-1}`

The collections are created automatically on first successful record insert. No existing Better Auth collections are renamed or modified by the installer.

## Development/production gating

`SOLVEOI_INTERNAL_PRODUCT_PREVIEW=true` permits **owner previews only in NODE_ENV != production**; employees require stored grants. In production, enable each organization via the existing platform Super Admin entitlement screen. An entitlement is NOT equivalent to validated commercial availability. Never enable automatic AI/provider actions or external message delivery until separately tested and approved.

## Security notes

- Do not paste real credentials into screenshots or commit `.env.local`.
- Rotate previously exposed MongoDB, auth and customer credentials, and any genuine API key.
- The application audit collection is not a tamper-proof ledger.
- Stored draft answers may contain private organization text. Use synthetic test content first.
