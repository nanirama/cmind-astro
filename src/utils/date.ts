export function formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(date);
}

export function formatDateShort(date: Date): string {
  return formatDate(date, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0] ?? '';
}

export function isNew(date: Date, daysThreshold = 30): boolean {
  const msThreshold = daysThreshold * 24 * 60 * 60 * 1000;
  return Date.now() - date.getTime() < msThreshold;
}
