"use client";

import { Todo } from "@/types/todo";

type TodoStatsProps = {
  todos: Todo[];
};

export function TodoStats({ todos }: TodoStatsProps) {
  if (todos.length === 0) return null;

  const remaining = todos.filter((todo) => !todo.completed).length;

  return (
    <p className="text-sm text-zinc-500 dark:text-zinc-400">
      残り {remaining} / {todos.length} 件
    </p>
  );
}
