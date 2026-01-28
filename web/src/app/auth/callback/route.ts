import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Exchanges the auth code for a server session cookie, then redirects.
export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/dashboard';

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            const forwardedHost = request.headers.get('x-forwarded-host');
            const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');
            const redirectUrl =
                isLocalhost || !forwardedHost
                    ? `${origin}${next}`
                    : `https://${forwardedHost}${next}`;

            return NextResponse.redirect(redirectUrl);
        }
    }

    return NextResponse.redirect(new URL('/auth/auth-code-error', origin));
}
