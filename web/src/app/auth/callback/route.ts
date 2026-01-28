import { NextResponse, type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

// Exchanges the auth code for a server session cookie, then redirects.
export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get('code');
    const next = request.nextUrl.searchParams.get('next') ?? '/dashboard';
    const queryKeys = Array.from(request.nextUrl.searchParams.keys());

    console.log('>>> AUTH CALLBACK HIT <<<');
    console.log('Path:', request.nextUrl.pathname, 'Query keys:', queryKeys);
    console.log('Code present:', code ? 'YES' : 'NO');
    console.log('Next param:', request.nextUrl.searchParams.get('next') ?? '(none)');

    if (!code) {
        return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
    }

    const supabase = createClient(await cookies());
    console.log('Attempting exchangeCodeForSession...');
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
        console.log('Error exchanging code:', {
            message: error.message,
            status: 'status' in error ? error.status : undefined,
        });
        return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
    }

    console.log('Session created! Redirecting...');

    return NextResponse.redirect(new URL(next, request.url));
}
