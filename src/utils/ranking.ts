export function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  console.log(result, "result");
  return result;
}

export function rankUsers(
  ids: number[],
  order: number[],
  limit = 10,
): Map<number, number> {
  const known = new Set(ids);
  const placed = new Set(order);
  const full = [
    ...order.filter((id) => known.has(id)),
    ...ids.filter((id) => !placed.has(id)),
  ];
  return new Map(full.slice(0, limit).map((id, i) => [id, i + 1]));
}
