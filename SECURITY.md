# Security Policy

## Overview
- This project is a Next.js (App Router) + Supabase application with SSR-first patterns.
- Security controls are enforced server-side and at the data layer (Supabase RLS).
- Secrets are managed via environment variables; public client keys are the only client-visible values.
- Controls are documented here so contributors can implement and verify them consistently.

## Security Features Implemented
- RLS expectation: Supabase Row Level Security on all user/app data tables. Planned.
- Server-side auth boundaries: authorization enforced in server code and data layer, never on the client. Planned.
- Env/secrets practices: only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` allowed client-side; all other secrets server-only. Planned.
- Input validation approach: schema validation on all API inputs with explicit allowlists. Planned.
- Secure headers intent: CSP, HSTS, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy. Planned.
- Rate limiting intent: auth endpoints and write-heavy routes protected against abuse. Planned.
- Safe logging: logs must avoid tokens, passwords, and sensitive PII. Planned.

## Threat Model Summary
See `/docs/threat-model.md` for assets, boundaries, threats, and controls.

## Reporting a Vulnerability
Email: security@example.com

## Secure Development Checklist
- [ ] Enforce authorization on every read/write in server code.
- [ ] Enable and verify Supabase RLS on every user/app data table.
- [ ] Add explicit RLS policies using `auth.uid()` and ownership checks.
- [ ] Validate all inputs with schemas and reject unknown fields.
- [ ] Keep secrets server-side; never expose `service_role` to the client.
- [ ] Apply secure headers; document any exceptions to CSP.
- [ ] Add rate limiting to auth and write-heavy endpoints.
- [ ] Ensure logs exclude tokens, passwords, and full PII.

## Never Do
- Do not expose Supabase `service_role` keys to the client.
- Do not disable RLS or rely on default/implicit policies.
- Do not trust client-provided ownership, roles, or pricing.
- Do not log access tokens, refresh tokens, or password data.
- Do not use client-only authorization for protected operations.
