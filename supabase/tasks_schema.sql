-- Create table
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  status text not null check (status in ('todo', 'in_progress', 'done')),
  priority text not null check (priority in ('low', 'medium', 'high')),
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.tasks enable row level security;

-- Policies
drop policy if exists "Users can view own tasks" on public.tasks;
create policy "Users can view own tasks"
on public.tasks
for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own tasks" on public.tasks;
create policy "Users can insert own tasks"
on public.tasks
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update own tasks" on public.tasks;
create policy "Users can update own tasks"
on public.tasks
for update
using (auth.uid() = user_id);

drop policy if exists "Users can delete own tasks" on public.tasks;
create policy "Users can delete own tasks"
on public.tasks
for delete
using (auth.uid() = user_id);
