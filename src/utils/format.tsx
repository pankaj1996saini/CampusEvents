// "2026-09-20" -> "20-09-2026"
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}-${m}-${y}`;
}

export function todayISO(): string {
  const now = new Date();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${m}-${d}`;
}

export function isUpcoming(iso: string): boolean {
  return iso >= todayISO();
}

export function formatDateTime(iso: string): string {
  const dt = new Date(iso);
  const dd = String(dt.getDate()).padStart(2, '0');
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  const time = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${dd}-${mm}-${dt.getFullYear()} ${time}`;
}
