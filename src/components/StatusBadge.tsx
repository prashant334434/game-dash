import type { UserStatus } from "../types/user";

function StatusBadge({ status }: { status: UserStatus }) {
  return <span className={`status ${status.toLowerCase()}`}>{status}</span>;
}

export default StatusBadge;
