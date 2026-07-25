"use client";

import { Todo } from "@/types/todo";
import { TodoItem } from "@/components/TodoItem";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-black/10 px-4 py-10 text-center text-zinc-500 dark:border-white/15 dark:text-zinc-400">
        タスクはまだありません。上のフォームから追加してみましょう。
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
