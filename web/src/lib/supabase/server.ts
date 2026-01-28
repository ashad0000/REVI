import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error(
            'Missing Supabase env vars. Check web/.env.local for NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
        );
    }

    return createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options: CookieOptions }) => {
                        cookieStore.set({ name, value, ...options });
                    });
                } catch {
                    // Server Components can be read-only; ignore cookie write failures here.
                }
            },
            set(name: string, value: string, options: CookieOptions) {
                try {
                    cookieStore.set({ name, value, ...options });
                } catch {
                    // Server Components can be read-only; ignore cookie write failures here.
                }
            },
            remove(name: string, options: CookieOptions) {
                try {
                    cookieStore.delete({ name, ...options });
                } catch {
                    // Server Components can be read-only; ignore cookie write failures here.
                }
            },
        },
    });
};
