"use client";

import { Todo } from "@/types/todo";

type ClearCompletedButtonProps = {
  todos: Todo[];
  onClear: () => void;
};

// 完了済みタスクが1件もない場合はボタン自体を表示せず、
// 「なぜ押せないか」を考えさせない（UI/UXの落とし穴対策）
export function ClearCompletedButton({ todos, onClear }: ClearCompletedButtonProps) {
  const completedCount = todos.filter((todo) => todo.completed).length;
  if (completedCount === 0) return null;

  return (
    <button
      type="button"
      onClick={onClear}
      className="text-sm font-medium text-zinc-500 underline-offset-2 transition-colors hover:text-red-600 hover:underline dark:text-zinc-400 dark:hover:text-red-400"
    >
      完了済みを削除（{completedCount}件）
    </button>
  );
}
