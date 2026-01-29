import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { DashboardHeader } from '@/components/DashboardHeader';
import { EmptyState } from '@/components/EmptyState';
import { TaskList, type Task } from '@/components/TaskList';
import NewTaskForm from '@/components/NewTaskForm';

async function signOut() {
    'use server';
  const supabase = await createClient(cookies());
    await supabase.auth.signOut();
    redirect('/login');
}

const DashboardPage = async () => {
    const supabase = createClient(cookies());
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });
    const taskList = (tasks ?? []) as Task[];

    return (
        <div className="min-h-screen bg-white">
            <DashboardHeader email={user.email ?? 'unknown'} onSignOut={signOut} />
            <main className="mx-auto max-w-5xl px-6 pb-16 pt-8">
                <div className="space-y-6">
                    <NewTaskForm />
                    <TaskList tasks={taskList} />
                    <EmptyState />
                </div>
            </main>
            <footer className="border-t border-neutral-200 py-6">
                <div className="mx-auto max-w-5xl px-6 text-xs text-neutral-500">
                    Built with Next.js + Supabase
                </div>
            </footer>
        </div>
    );
};

export default DashboardPage;
