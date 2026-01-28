type DashboardHeaderProps = {
    email: string;
    onSignOut: () => Promise<void>;
};

export const DashboardHeader = ({ email, onSignOut }: DashboardHeaderProps) => {
    return (
        <header className="border-b border-neutral-200 bg-white">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
                <div className="text-lg font-semibold tracking-tight text-neutral-900">REVI</div>
                <div className="flex items-center gap-3">
                    <div className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">
                        {email}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-800 hover:bg-neutral-50"
                        >
                            New Reminder
                        </button>
                        <form action={onSignOut}>
                            <button
                                type="submit"
                                className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
                            >
                                Sign out
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </header>
    );
};
