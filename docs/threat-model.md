# Threat Model

## 1) Scope & Assumptions
- Application: Next.js App Router with Supabase backend services.
- SSR-first: prefer Server Components and server-side data fetching.
- To Confirm: whether auth sessions are cookie-based SSR or client-only. This model supports both.

## 2) Assets to Protect
- User sessions and tokens.
- User data and profile information.
- Database integrity and authorization rules.
- API keys and server-side secrets.

## 3) Trust Boundaries
- Browser (untrusted client environment).
- Next.js Server (trusted application boundary).
- Supabase (auth + database boundary).
- Third-party services (email, analytics, storage).

## 4) Entry Points
- UI forms and client-side actions.
- API routes and server actions.
- Auth flows (magic link, OAuth, password).
- Webhooks and external callbacks (if added).

## 5) Top Threats & Mitigations
| Threat | Risk | Mitigations |
| --- | --- | --- |
| Broken access control | Unauthorized reads/writes | Server-side authorization + Supabase RLS policies |
| Missing RLS | Full table access from anon clients | Enable RLS on all tables + explicit policies |
| IDOR | Access to other users' records | Ownership checks using `auth.uid()` |
| XSS | Token theft, session compromise | No `dangerouslySetInnerHTML`, sanitize any HTML |
| CSRF (if cookies) | Unauthorized state changes | SameSite cookies, origin checks, CSRF tokens |
| Secrets leakage | Key compromise | Server-only secrets, no `service_role` in client |
| Abuse/rate limiting | Brute force and spam | Rate limiting on auth and write endpoints |
| Dependency vulnerabilities | Supply-chain risk | Minimize deps, keep maintained, audit regularly |
| Logging leaks | Sensitive data exposure | Redact tokens/PII, safe error surfaces |

## 6) Security Controls Map
- RLS: Supabase database layer.
- Authorization checks: Next.js server code and server actions.
- Validation: API route handlers and server actions (schema-based).
- Headers: Next.js middleware or server response configuration.
- Logging: server-side logging only, with redaction.

## 7) Planned Enhancements
- TODO: Confirm session model (cookie-based SSR vs client auth) and document CSRF posture.
- TODO: Implement rate limiting for auth and write-heavy endpoints.
- TODO: Add centralized input validation utilities.
- TODO: Define and enforce a baseline security header policy.
