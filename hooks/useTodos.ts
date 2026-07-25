"use client";

import { useSyncExternalStore } from "react";
import {
  addTodo,
  deleteTodo,
  getServerSnapshot,
  getSnapshot,
  subscribe,
  toggleTodo,
} from "@/lib/todoStore";

export function useTodos() {
  const todos = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return { todos, addTodo, toggleTodo, deleteTodo };
}
