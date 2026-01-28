import { deleteTask, markTaskDone } from '@/app/dashboard/actions';

export interface Task {
    id: string;
    title: string;
    status: 'todo' | 'in_progress' | 'done';
    priority: 'low' | 'medium' | 'high';
}

export const TaskList = ({ tasks }: { tasks: Task[] }) => {
    return (
        <section className="rounded-2xl border border-neutral-200 bg-white">
            <header className="border-b border-neutral-200 px-6 py-4">
                <h3 className="text-base font-semibold text-neutral-900">Tasks</h3>
            </header>
            <div className="divide-y divide-neutral-200">
                {tasks.map((task) => (
                    <div key={task.id} className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
                        <div>
                            <p className="text-sm font-medium text-neutral-900">{task.title}</p>
                            <p className="mt-1 text-xs text-neutral-500">ID: {task.id}</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2 py-1 text-neutral-700">
                                {task.status.replace('_', ' ')}
                            </span>
                            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2 py-1 text-neutral-700">
                                {task.priority}
                            </span>
                            {task.status === 'done' ? (
                                <span className="text-sm">✓ Completed</span>
                            ) : (
                                <form action={markTaskDone} className="inline-block ml-4">
                                    <input type="hidden" name="taskId" value={task.id} />
                                    <button type="submit" className="border px-2 text-sm rounded">
                                        Done
                                    </button>
                                </form>
                            )}
                            <form action={deleteTask} className="inline-block ml-4">
                                <input type="hidden" name="taskId" value={task.id} />
                                <button type="submit" className="text-sm border px-2 rounded text-red-600">
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
