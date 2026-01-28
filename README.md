# REVI

## Authentication Architecture
- Supabase Auth uses PKCE (no implicit grant) for magic-link sign-in.
- Magic links redirect to a server-side `/auth/callback` route for code exchange.
- Next.js App Router handles auth with SSR-safe utilities and server actions.
- Cookie persistence is compatible with Next.js 15 via async `cookies()`.
- Middleware protects authenticated routes like `/dashboard`.
- Browser and server Supabase clients are separated by responsibility.
- Security-first defaults: no service role key is ever exposed client-side.