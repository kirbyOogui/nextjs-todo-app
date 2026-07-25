// 期限日（YYYY-MM-DD形式）に関するユーティリティ関数

// 今日の日付をYYYY-MM-DD形式で返す（ローカルタイムゾーン基準）
export function todayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// YYYY-MM-DD を「M/D」の表示用文字列に変換する
export function formatDueDate(dueDate: string): string {
  const [, month, day] = dueDate.split("-");
  return `${Number(month)}/${Number(day)}`;
}

export type DueStatus = "overdue" | "today" | "upcoming";

// 期限日と完了状態から、強調表示に使うステータスを判定する
export function getDueStatus(dueDate: string | null, completed: boolean): DueStatus | null {
  if (!dueDate || completed) return null;

  const today = todayDateString();
  if (dueDate < today) return "overdue";
  if (dueDate === today) return "today";
  return "upcoming";
}
