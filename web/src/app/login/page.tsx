'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
    const [message, setMessage] = useState<string>('');

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        const connectionErrorMessage =
            'Supabase Connection Failed. Please check your Project URL, Anon Key, or Network connection.';

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) {
                setStatus('error');
                setMessage(error.message.includes('Failed to fetch') ? connectionErrorMessage : error.message);
                return;
            }

            setStatus('sent');
            setMessage('Check your email for the login link.');
        } catch (error) {
            const fallbackMessage = error instanceof Error ? error.message : 'Unknown error';
            setStatus('error');
            setMessage(fallbackMessage.includes('Failed to fetch') ? connectionErrorMessage : fallbackMessage);
        }
    }

    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto max-w-md px-6 py-16">
                <h1 className="text-3xl font-semibold tracking-tight">Login</h1>
                <p className="mt-2 text-sm text-neutral-600">We’ll email you a magic link to sign in.</p>

                <form onSubmit={handleLogin} className="mt-8 space-y-4">
                    <label className="block">
                        <span className="text-sm font-medium">Email</span>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-900"
                            placeholder="you@example.com"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full rounded-xl bg-black px-4 py-2 text-white hover:opacity-90 disabled:opacity-60"
                    >
                        {status === 'loading' ? 'Sending link…' : 'Send magic link'}
                    </button>

                    {message ? (
                        <p className={`text-sm ${status === 'error' ? 'text-red-600' : 'text-neutral-700'}`}>
                            {message}
                        </p>
                    ) : null}
                </form>
            </div>
        </main>
    );
}
