import Icon from "./Icon";
import type { IconName } from "./Icon";

type StatCardProps = {
  title: string;
  value: number | string | null;
  icon: IconName;
  hint?: string;
};

function StatCard({ title, value, icon, hint }: StatCardProps) {
  return (
    <section className="card stat">
      <div className="stat-head">
        <h2 className="card-title">{title}</h2>
        <span className="stat-icon">
          <Icon name={icon} />
        </span>
      </div>
      <p className="card-value">
        {value === null ? (
          <span className="skeleton" />
        ) : (
          value.toLocaleString()
        )}
      </p>
      {hint && <p className="stat-hint">{hint}</p>}
    </section>
  );
}

export default StatCard;
