// Todoアイテムの型定義
export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  // 期限日（YYYY-MM-DD形式）。未設定の場合はnull
  dueDate: string | null;
};

// 検索・絞り込みで使う表示状態フィルター
export type TodoFilterStatus = "all" | "active" | "completed";
