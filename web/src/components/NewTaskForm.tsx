'use client';

import { useRef } from 'react';
import { createTask } from '@/app/dashboard/actions';

export default function NewTaskForm() {
    const formRef = useRef<HTMLFormElement>(null);

    async function clientAction(formData: FormData) {
        await createTask(formData);
        formRef.current?.reset();
    }

    return (
        <form ref={formRef} action={clientAction} className="flex gap-2">
            <input
                name="title"
                placeholder="New task..."
                required
                className="border px-2 py-1"
            />
            <button type="submit" className="border px-3 py-1">
                Add
            </button>
        </form>
    );
}
