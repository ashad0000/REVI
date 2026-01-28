export const EmptyState = () => {
    return (
        <section className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8">
            <h2 className="text-lg font-semibold text-neutral-900">No reminders yet</h2>
            <p className="mt-2 text-sm text-neutral-600">
                Create your first reminder to start organizing tasks and follow-ups in one place.
            </p>
            <button
                type="button"
                className="mt-4 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
                Create reminder
            </button>
        </section>
    );
};
