"use client";

import { Todo } from "@/types/todo";
import { formatDueDate, getDueStatus } from "@/lib/date";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

// 期限のステータスに応じたバッジの色分け
const DUE_BADGE_STYLE: Record<string, string> = {
  overdue: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400",
  today: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  upcoming: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
};

const DUE_BADGE_LABEL: Record<string, string> = {
  overdue: "期限切れ",
  today: "今日まで",
  upcoming: "",
};

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const dueStatus = getDueStatus(todo.dueDate, todo.completed);

  return (
    <li className="group flex items-center gap-3 rounded-lg border border-black/5 bg-white px-4 py-3 transition-colors hover:border-black/10 dark:border-white/10 dark:bg-zinc-900 dark:hover:border-white/20">
      <input
        id={`todo-${todo.id}`}
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 shrink-0 cursor-pointer accent-blue-600"
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`flex flex-1 cursor-pointer flex-wrap items-center gap-2 break-all text-base leading-6 transition-colors ${
          todo.completed
            ? "text-zinc-400 line-through dark:text-zinc-600"
            : "text-zinc-900 dark:text-zinc-50"
        }`}
      >
        {todo.text}
        {todo.dueDate && (
          <span
            className={`whitespace-nowrap rounded px-1.5 py-0.5 text-xs font-medium no-underline ${
              dueStatus ? DUE_BADGE_STYLE[dueStatus] : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
            }`}
          >
            {dueStatus && DUE_BADGE_LABEL[dueStatus] ? `${DUE_BADGE_LABEL[dueStatus]} ` : "期限 "}
            {formatDueDate(todo.dueDate)}
          </span>
        )}
      </label>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`「${todo.text}」を削除`}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        </svg>
      </button>
    </li>
  );
}
