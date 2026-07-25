import { Todo } from "@/types/todo";
import { loadTodos, saveTodos } from "@/lib/storage";

// useSyncExternalStoreから参照される、localStorageと同期するモジュールスコープのストア
type Listener = () => void;

let todos: Todo[] = [];
let initialized = false;
const listeners = new Set<Listener>();
// getServerSnapshotは呼び出しごとに同じ参照を返す必要があるため、空配列を使い回す
const EMPTY_TODOS: Todo[] = [];

function ensureInitialized(): void {
  if (initialized) return;
  todos = loadTodos();
  initialized = true;
}

function notify(): void {
  saveTodos(todos);
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): Todo[] {
  ensureInitialized();
  return todos;
}

// SSR時はlocalStorageにアクセスできないため、空配列を返す
export function getServerSnapshot(): Todo[] {
  return EMPTY_TODOS;
}

export function addTodo(text: string): void {
  const trimmed = text.trim();
  if (!trimmed) return;

  ensureInitialized();
  todos = [
    {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    },
    ...todos,
  ];
  notify();
}

export function toggleTodo(id: string): void {
  ensureInitialized();
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  notify();
}

export function deleteTodo(id: string): void {
  ensureInitialized();
  todos = todos.filter((todo) => todo.id !== id);
  notify();
}
