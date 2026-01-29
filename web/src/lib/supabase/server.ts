import 'server-only';

import { cookies as nextCookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

type CookieInput = ReadonlyRequestCookies | Promise<ReadonlyRequestCookies>;

async function resolveCookieStore(input?: CookieInput): Promise<ReadonlyRequestCookies> {
  // If no input is provided (common in Route Handlers), we must call nextCookies()
  // to get the real cookie store object.
  if (!input) return nextCookies();

  // If input is a promise (older Next typings), await it.
  const maybePromise = input as Promise<ReadonlyRequestCookies>;
  if (typeof (maybePromise as any)?.then === 'function') return await maybePromise;

  return input as ReadonlyRequestCookies;
}

export async function createClient(input?: CookieInput) {
  const cookieStore = await resolveCookieStore(input);

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // setAll can be called from Server Components where setting cookies is not allowed
            // (this is expected). Route Handlers will allow it.
          }
        },
      },
    }
  );
}
