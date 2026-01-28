export async function GET() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const hasUrl = Boolean(supabaseUrl);
    const hasAnonKey = Boolean(supabaseAnonKey);
    const urlHost = hasUrl ? new URL(supabaseUrl).host : '';

    let fetchOk = false;
    let error: string | null = null;

    if (hasUrl) {
        try {
            const response = await fetch(`${supabaseUrl}/auth/v1/health`, {
                method: 'GET',
                cache: 'no-store',
            });
            fetchOk = response.ok;
            if (!response.ok) {
                error = `Health check failed with status ${response.status}.`;
            }
        } catch (errorValue) {
            fetchOk = false;
            error = errorValue instanceof Error ? errorValue.message : 'Unknown error';
        }
    } else {
        error = 'Missing NEXT_PUBLIC_SUPABASE_URL.';
    }

    return Response.json({
        hasUrl,
        hasAnonKey,
        urlHost,
        fetchOk,
        error,
    });
}
