"use client";

import { useTodos } from "@/hooks/useTodos";
import { useTodoFilters } from "@/hooks/useTodoFilters";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { TodoStats } from "@/components/TodoStats";
import { TodoFilterBar } from "@/components/TodoFilterBar";
import { ClearCompletedButton } from "@/components/ClearCompletedButton";

export default function Home() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos();
  const { keyword, setKeyword, status, setStatus, filteredTodos } = useTodoFilters(todos);

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <main className="flex w-full max-w-lg flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            ToDo リスト
          </h1>
          <div className="flex items-center justify-between gap-2">
            <TodoStats todos={todos} />
            <ClearCompletedButton todos={todos} onClear={clearCompleted} />
          </div>
        </div>

        <TodoForm onAdd={addTodo} />
        <TodoFilterBar
          keyword={keyword}
          onKeywordChange={setKeyword}
          status={status}
          onStatusChange={setStatus}
        />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          hasAnyTodos={todos.length > 0}
        />
      </main>
    </div>
  );
}
