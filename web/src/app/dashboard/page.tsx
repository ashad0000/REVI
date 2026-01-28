import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

async function signOut() {
    'use server';
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    redirect('/login');
}

const DashboardPage = async () => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Protected Dashboard</h1>
            <p>Welcome, {user.email}</p>
            <form>
                <button
                    formAction={signOut}
                    className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
                >
                    Sign Out
                </button>
            </form>
        </div>
    );
};

export default DashboardPage;
