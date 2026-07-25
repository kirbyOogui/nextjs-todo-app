import { Todo } from "@/types/todo";

const STORAGE_KEY = "todo-app:todos";

// 日数のオフセットからYYYY-MM-DD形式の日付文字列を作る（期限切れ・当日・今後の例を作るため）
function dateStringFromOffset(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 初回訪問時（保存データが一度も存在しない場合）にのみ表示するサンプルタスク
// 数日にわたって使い込んだ状態に見えるよう、作成日時をばらつかせている
function createSampleTodos(): Todo[] {
  const now = Date.now();
  const hour = 1000 * 60 * 60;
  const day = hour * 24;

  return [
    { id: crypto.randomUUID(), text: "プロジェクトの企画書を作成する", completed: false, createdAt: now - 1000 * 60 * 15, dueDate: dateStringFromOffset(2) },
    { id: crypto.randomUUID(), text: "牛乳を買う", completed: false, createdAt: now - hour * 2, dueDate: dateStringFromOffset(0) },
    { id: crypto.randomUUID(), text: "ジムに行く", completed: false, createdAt: now - hour * 5, dueDate: null },
    { id: crypto.randomUUID(), text: "メールを返信する", completed: true, createdAt: now - day + hour * 3, dueDate: dateStringFromOffset(-1) },
    { id: crypto.randomUUID(), text: "本を図書館に返却する", completed: true, createdAt: now - day - hour * 6, dueDate: dateStringFromOffset(-2) },
    { id: crypto.randomUUID(), text: "週次ミーティングの議事録をまとめる", completed: false, createdAt: now - day * 2 - hour * 4, dueDate: dateStringFromOffset(-1) },
    { id: crypto.randomUUID(), text: "歯医者の予約を確認する", completed: true, createdAt: now - day * 3 - hour * 9, dueDate: dateStringFromOffset(-3) },
    { id: crypto.randomUUID(), text: "部屋の掃除をする", completed: true, createdAt: now - day * 4 - hour * 2, dueDate: null },
    { id: crypto.randomUUID(), text: "税金の書類を提出する", completed: true, createdAt: now - day * 6 - hour * 11, dueDate: dateStringFromOffset(-5) },
  ];
}

// サーバーサイドレンダリング時はlocalStorageが存在しないため、都度存在確認する
export function loadTodos(): Todo[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    // raw が null の場合のみ「保存データが一度も存在しない初回訪問」とみなしサンプルを表示する
    // （全件削除後は "[]" が保存されるため、その場合はサンプルを出し直さない）
    if (raw === null) {
      const sample = createSampleTodos();
      saveTodos(sample);
      return sample;
    }
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
