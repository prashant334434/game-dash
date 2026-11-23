import { useEffect, useState } from "react";
import { rankUsers } from "../utils/ranking";

type RankingState = { order: number[]; previous: number[]; updatedAt: number | null };

export function useLiveRanking(ids: number[]) {
  const [state, setState] = useState<RankingState>({ order: [], previous: [], updatedAt: null });
  const key = ids.join(",");

  useEffect(() => {
    if (!key) return;
    const source = new EventSource(`/api/ranks/stream?ids=${key}`);
    source.onmessage = (e) => {
      const { order, updatedAt } = JSON.parse(e.data) as { order: number[]; updatedAt: number };
      setState((s) => ({ previous: s.order.length ? s.order : order, order, updatedAt }));
    };
    return () => source.close();
  }, [key]);

  return {
    ranks: rankUsers(ids, state.order),
    previousRanks: rankUsers(ids, state.previous),
    updatedAt: state.updatedAt,
  };
}
