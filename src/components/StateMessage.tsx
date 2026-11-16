import Icon from "./Icon";
import type { IconName } from "./Icon";

type StateMessageProps = {
  icon: IconName;
  title: string;
  message: string;
  tone?: "neutral" | "error";
  actionLabel?: string;
  onAction?: () => void;
};

function StateMessage({
  icon,
  title,
  message,
  tone = "neutral",
  actionLabel,
  onAction,
}: StateMessageProps) {
  return (
    <div
      className={`state ${tone}`}
      role={tone === "error" ? "alert" : undefined}
    >
      <span className="state-icon">
        <Icon name={icon} size={28} />
      </span>
      <h3 className="state-title">{title}</h3>
      <p className="state-text">{message}</p>
      {actionLabel && onAction && (
        <button className="pill" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default StateMessage;
