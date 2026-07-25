"use client";

import { TodoFilterStatus } from "@/types/todo";

type TodoFilterBarProps = {
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  status: TodoFilterStatus;
  onStatusChange: (status: TodoFilterStatus) => void;
};

const STATUS_OPTIONS: { value: TodoFilterStatus; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "active", label: "未完了" },
  { value: "completed", label: "完了" },
];

export function TodoFilterBar({
  keyword,
  onKeywordChange,
  status,
  onStatusChange,
}: TodoFilterBarProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <label htmlFor="todo-search" className="sr-only">
        タスクを検索
      </label>
      <input
        id="todo-search"
        type="search"
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
        placeholder="タスクを検索..."
        className="flex-1 rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500"
      />
      <div className="flex gap-1" role="group" aria-label="表示するタスクの絞り込み">
        {STATUS_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onStatusChange(option.value)}
            aria-pressed={status === option.value}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              status === option.value
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
