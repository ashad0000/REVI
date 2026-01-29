'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function createTask(formData: FormData) {
    const supabase = await createClient(cookies());
    const title = String(formData.get('title') ?? '').trim();
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (!title) {
        console.error('[createTask] Missing title');
        return;
    }

    if (userError) {
        console.error('[createTask] user error:', userError);
        throw userError;
    }

    if (!user) {
        throw new Error('Unauthorized');
    }

    const { error } = await supabase.from('tasks').insert({
        title,
        status: 'todo',
        priority: 'medium',
        user_id: user.id,
    });

    if (error) {
        console.error('[createTask] insert error:', error);
        return;
    }

    revalidatePath('/dashboard');
}

export async function markTaskDone(formData: FormData) {
    const taskId = String(formData.get('taskId') ?? '').trim();
    const supabase = await createClient(cookies());
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
        console.error('[markTaskDone] user error:', userError);
        throw userError;
    }

    if (!user) {
        throw new Error('Unauthorized');
    }

    const { error } = await supabase
        .from('tasks')
        .update({ status: 'done' })
        .eq('id', taskId)
        .eq('user_id', user.id);

    if (error) {
        console.error('[markTaskDone] update error:', error);
        return;
    }

    revalidatePath('/dashboard');
}

export async function deleteTask(formData: FormData) {
    const taskId = String(formData.get('taskId') ?? '').trim();
    const supabase = await createClient(cookies());
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (!taskId) {
        console.error('[deleteTask] Missing taskId');
        return;
    }

    if (userError) {
        console.error('[deleteTask] user error:', userError);
        throw userError;
    }

    if (!user) {
        throw new Error('Unauthorized');
    }

    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)
        .eq('user_id', user.id);

    if (error) {
        console.error('[deleteTask] delete error:', error);
        return;
    }

    revalidatePath('/dashboard');
}
