import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const createClient = (
    cookieStore: ReadonlyRequestCookies | Promise<ReadonlyRequestCookies>,
) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const store = cookieStore as ReadonlyRequestCookies;

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error(
            'Missing Supabase env vars. Check web/.env.local for NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
        );
    }

    return createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            get(name: string) {
                return store.get(name)?.value;
            },
            set(name: string, value: string, options: CookieOptions) {
                try {
                    store.set({ name, value, ...options });
                } catch {
                    // Server Components can be read-only; ignore cookie write failures here.
                }
            },
            remove(name: string, options: CookieOptions) {
                try {
                    store.set({ name, value: '', ...options, maxAge: 0 });
                } catch {
                    // Server Components can be read-only; ignore cookie write failures here.
                }
            },
        },
    });
};
