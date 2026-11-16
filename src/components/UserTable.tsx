import type { RankedUser } from "../types/user";
import StatusBadge from "./StatusBadge";
import RankBadge from "./RankBadge";
import Icon from "./Icon";

const columns: { key: keyof RankedUser; label: string }[] = [
  { key: "rank", label: "Rank" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone Number" },
  { key: "company", label: "Company" },
  { key: "department", label: "Department" },
  { key: "status", label: "Status" },
];

function renderCell(user: RankedUser, key: keyof RankedUser) {
  if (key === "rank") return <RankBadge rank={user.rank} change={user.change} />;
  if (key === "status") return <StatusBadge status={user.status} />;
  return user[key];
}

type UserTableProps = {
  users: RankedUser[];
  onEdit: (user: RankedUser) => void;
};

function UserTable({ users, onEdit }: UserTableProps) {
  return (
    <table className="users">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} scope="col">
              {col.label}
            </th>
          ))}
          <th scope="col">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            {columns.map((col) => (
              <td key={col.key} data-label={col.label}>
                {renderCell(user, col.key)}
              </td>
            ))}
            <td className="actions">
              <button className="edit-btn" aria-label={`Edit ${user.name}`} onClick={() => onEdit(user)}>
                <Icon name="edit" size={16} /> Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
