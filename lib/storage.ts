import { Todo } from "@/types/todo";

const STORAGE_KEY = "todo-app:todos";

// サーバーサイドレンダリング時はlocalStorageが存在しないため、都度存在確認する
export function loadTodos(): Todo[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // 壊れたデータが保存されていた場合は空リストとして扱う
    return [];
  }
}

export function saveTodos(todos: Todo[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
