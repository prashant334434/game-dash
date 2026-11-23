import type { CSSProperties } from "react";
import type { RankedUser } from "../types/user";
import RankBadge from "./RankBadge";
import { getInitials } from "../utils/initials";

type LeaderboardProps = {
  users: RankedUser[];
  updatedAt: number | null;
  intervalSeconds: number;
};

function Leaderboard({ users, updatedAt, intervalSeconds }: LeaderboardProps) {
  const ranked = users.filter((u) => u.rank !== null);

  return (
    <section className="card leaderboard">
      <div className="table-head">
        <h2 className="card-title">Ranking</h2>
        <span className="live">
          <span className="live-dot" />
          Live · updates every {intervalSeconds}s
          {updatedAt && <span className="live-time">updated {new Date(updatedAt).toLocaleTimeString()}</span>}
        </span>
      </div>
      <ul className="leaderboard-row">
        {ranked.map((u) => {
          const rank = u.rank ?? 0;
          return (
            <li
              key={u.id}
              className={rank <= 3 ? `leader top-${rank}` : "leader"}
              style={{ "--i": rank - 1 } as CSSProperties}
              aria-label={`Rank ${rank}: ${u.name}, ${u.company}`}
            >
              <RankBadge rank={u.rank} change={u.change} />
              <span className="leader-avatar">{getInitials(u.name)}</span>
              <span className="leader-name" title={u.name}>{u.name}</span>
              <span className="leader-company">{u.company}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Leaderboard;
