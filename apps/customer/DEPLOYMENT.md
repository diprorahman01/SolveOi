# Deployment notes

- Create an independent Vercel project with **root directory `apps/customer`**.
- Production URL: `https://app.solveoi.com` (after DNS configuration).
- Configure real `MONGODB_URI`, `MONGODB_DB_NAME`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`, `RESEND_API_KEY`, `AUTH_FROM_EMAIL` using platform secrets.
- Use a verified sending domain and do not enable console email delivery in production.
- Review rate limiting, MFA for admins, session revocation, audit logging, secure database permissions, and integration tests before serving real customers.
- Set `CUSTOMER_APP_URL=https://app.solveoi.com` on the public website's Vercel project.
- Do not upload `.env.local` or any tokens.
