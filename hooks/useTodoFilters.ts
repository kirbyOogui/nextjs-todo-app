"use client";

import { useMemo, useState } from "react";
import { Todo, TodoFilterStatus } from "@/types/todo";

// タスクの検索キーワード・状態フィルターはlocalStorageに保存する必要がない
// （画面を開くたびにリセットしてよいUI上の一時的な状態）ため、
// useSyncExternalStoreではなく通常のuseStateで管理する
export function useTodoFilters(todos: Todo[]) {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState<TodoFilterStatus>("all");

  const filteredTodos = useMemo(() => {
    const trimmedKeyword = keyword.trim().toLowerCase();

    return todos.filter((todo) => {
      const matchesKeyword =
        trimmedKeyword.length === 0 || todo.text.toLowerCase().includes(trimmedKeyword);
      const matchesStatus =
        status === "all" ||
        (status === "active" && !todo.completed) ||
        (status === "completed" && todo.completed);

      return matchesKeyword && matchesStatus;
    });
  }, [todos, keyword, status]);

  return { keyword, setKeyword, status, setStatus, filteredTodos };
}
