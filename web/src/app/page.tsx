import Link from 'next/link';

export default function HomePage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="mx-auto max-w-4xl px-6 py-16">
                <header className="space-y-3">
                    <h1 className="text-4xl font-semibold tracking-tight">Revi</h1>
                    <p className="text-lg text-neutral-600">
                        A Notion-style reminders app with smart, context-aware nudges.
                    </p>
                </header>

                <section className="mt-10 rounded-2xl border border-neutral-200 p-6">
                    <h2 className="text-xl font-semibold">MVP Roadmap</h2>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-700">
                        <li>Auth (Supabase)</li>
                        <li>Lists + tasks (CRUD)</li>
                        <li>Tags like #walmart</li>
                        <li>Smart nearby reminders (demo)</li>
                    </ul>

                    <div className="mt-6 flex gap-3">
                        <Link
                            href="/app"
                            className="rounded-xl bg-black px-4 py-2 text-white hover:opacity-90"
                        >
                            Open App
                        </Link>
                        <Link
                            href="/login"
                            className="rounded-xl border border-neutral-300 px-4 py-2 hover:bg-neutral-50"
                        >
                            Login
                        </Link>
                    </div>

                    <p className="mt-4 text-sm text-neutral-500">
                        This is a portfolio project. The UI and features will evolve as we build.
                    </p>
                </section>
            </div>
        </main>
    );
}
