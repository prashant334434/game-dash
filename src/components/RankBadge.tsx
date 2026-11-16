type RankBadgeProps = {
  rank: number | null;
  change: number;
};

function RankBadge({ rank, change }: RankBadgeProps) {
  if (rank === null) return <span className="rank none">—</span>;

  return (
    <span className="rank-cell">
      <span key={rank} className={rank <= 3 ? `rank top-${rank}` : "rank"}>
        #{rank}
      </span>
      {change !== 0 && (
        <span
          className={change > 0 ? "rank-change up" : "rank-change down"}
          aria-label={`${change > 0 ? "Up" : "Down"} ${Math.abs(change)}`}
        >
          {change > 0 ? "▲" : "▼"}
          {Math.abs(change)}
        </span>
      )}
    </span>
  );
}

export default RankBadge;
