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
