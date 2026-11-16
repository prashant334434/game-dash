import { useEffect, useState } from "react";
import { rankUsers, shuffle } from "../utils/ranking";

type RankingState = { order: number[]; previous: number[]; updatedAt: number | null };

export function useLiveRanking(ids: number[], intervalMs = 10000) {
  const [state, setState] = useState<RankingState>({ order: [], previous: [], updatedAt: null });
  const key = ids.join(",");

  useEffect(() => {
    if (!key) return;
    const list = key.split(",").map(Number);
    const timer = setInterval(
      () =>
        setState((s) => ({
          previous: s.order.length ? s.order : list,
          order: shuffle(list),
          updatedAt: Date.now(),
        })),
      intervalMs,
    );
    return () => clearInterval(timer);
  }, [key, intervalMs]);

  return {
    ranks: rankUsers(ids, state.order),
    previousRanks: rankUsers(ids, state.previous),
    updatedAt: state.updatedAt,
  };
}
