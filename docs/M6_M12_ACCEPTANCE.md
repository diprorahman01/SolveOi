# SolveOi — M6–M12 manual acceptance plan

All tests use **synthetic test data** in `solveoi_dev`. Log into your customer application at localhost:3001. Create/select an organization and set `SOLVEOI_INTERNAL_PRODUCT_PREVIEW=true` locally if the Owner does not yet have an entitlement.

## General access
- [ ] Existing M3 sign-in, onboarding and M4/M5 screens work after merge.
- [ ] Owner sees six internal-beta workspaces in `/app/products`.
- [ ] Employee cannot access product without explicit owner-granted product permission, even in local preview mode.
- [ ] Employee cannot approve/reject any record.
- [ ] Owner approval/rejection is recorded once; resubmission of review does not work.
- [ ] Tenant A cannot access tenant B documents by changing the URL/record IDs.
- [ ] No horizontal overflow at 320/375/430/768/1280px widths.

## M6 Quote
- [ ] Enter line `Website maintenance | 2 | 1500` and tax `10`; server total should be BDT 3,300.
- [ ] Invalid negative price rejected.
- [ ] Owner approves and uses browser Print → Save as PDF; print shows only quote content.
- [ ] History remains after logout/login.

## M7 Extract
- [ ] Import a small TXT and CSV file; save as review record.
- [ ] Export CSV; verify correct information is retained.
- [ ] Reject a >20 KB import and non-supported file extension.
- [ ] No claim that PDF OCR or generative extraction occurred.

## M8 Collect
- [ ] Create invoice `INV-DEMO-1` with date/amount; ensure reminder is a DRAFT.
- [ ] Owner approves/rejects. No email is sent.

## M9 Follow
- [ ] Add a lead in New stage, assign follow-up date, view saved record and export.
- [ ] Stage names constrained to approved pipeline choices.

## M10 Respond
- [ ] Add a support article; before approval, its content MUST NOT ground a draft answer.
- [ ] Approve article as Owner. Ask a matching question. Expect source excerpts and `requiresHumanApproval=true`.
- [ ] Ask unrelated question. Expect escalation rather than invented answer.

## M11 HR Desk
- [ ] Add a test HR policy; before approval, it cannot answer employee questions.
- [ ] After approval, a matching question shows related policy excerpts.
- [ ] A no-match question asks for human review.

## M12 Commercial
- [ ] Only Owner accesses `/app/billing`.
- [ ] A plan request persists as `pending_manual_review`.
- [ ] No transaction is charged; no subscription status automatically becomes active.
- [ ] Test audit logging and manual review before live launch.

## Build and operations
- [ ] Customer app ESLint, TypeScript check and Linux production build pass after merge.
- [ ] New MongoDB indexes are created/verified using the optional script or Atlas interface.
- [ ] M3 auth fix (`next.config.ts`, auth route) remains unchanged.
- [ ] Secrets remain out of source control, and existing client users can still sign in.
- [ ] External provider contracts, AI safety tests, billing verification and real customer launch gates remain OPEN until explicitly completed.
