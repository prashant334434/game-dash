import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import UserTable from "../components/UserTable";
import UserFilters from "../components/UserFilters";
import UserForm from "../components/UserForm";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import StateMessage from "../components/StateMessage";
import Leaderboard from "../components/Leaderboard";
import Icon from "../components/Icon";
import type { IconName } from "../components/Icon";
import { useUsers } from "../hooks/useUsers";
import { useLiveRanking } from "../hooks/useLiveRanking";
import { useStoredState } from "../hooks/useStoredState";
import { queryUsers } from "../utils/queryUsers";
import type { User, UserFormValues, UserQuery } from "../types/user";

const navItems: { icon: IconName; label: string }[] = [
  { icon: "home", label: "Dashboard" },
  { icon: "users", label: "Users" },
  { icon: "chart", label: "Reports" },
  { icon: "settings", label: "Settings" },
];

const initialQuery: UserQuery = {
  search: "",
  status: "All",
  department: "All",
  sort: "asc",
};

type FormState = { mode: "add" } | { mode: "edit"; user: User } | null;

function DashBoard() {
  const [active, setActive] = useState(navItems[0].label);
  const [collapsed, setCollapsed] = useStoredState("sidebar-collapsed", false);
  const [query, setQuery] = useState(initialQuery);
  const [form, setForm] = useState<FormState>(null);
  const { users, loading, error, retry, addUser, updateUser } = useUsers();
  const { ranks, previousRanks, updatedAt } = useLiveRanking(users.map((u) => u.id));
  const rankedUsers = users.map((u) => {
    const rank = ranks.get(u.id) ?? null;
    const previous = previousRanks.get(u.id);
    return { ...u, rank, change: rank && previous ? previous - rank : 0 };
  });

  const ready = !loading && !error;
  const stat = (n: number) => (loading ? null : error ? "—" : n);
  const activeCount = users.filter((u) => u.status === "Active").length;
  const departments = [...new Set(users.map((u) => u.department))].sort();
  const visible = queryUsers(rankedUsers, query);

  const editing = form?.mode === "edit" ? form.user : null;
  const takenEmails = users
    .filter((u) => u.id !== editing?.id)
    .map((u) => u.email);

  const handleSave = (values: UserFormValues) => {
    if (editing) updateUser(editing.id, values);
    else addUser(values);
    setForm(null);
  };

  const renderList = () => {
    if (loading) return <Loader label="Loading users…" />;
    if (error)
      return (
        <StateMessage
          icon="alert"
          tone="error"
          title="Something went wrong"
          message={error}
          actionLabel="Try again"
          onAction={retry}
        />
      );
    if (users.length === 0)
      return (
        <StateMessage
          icon="users"
          title="No users yet"
          message="There are no users to display."
        />
      );
    if (visible.length === 0)
      return (
        <StateMessage
          icon="search"
          title="No matching users"
          message="No records match your current filters. Try a different search or clear the filters."
          actionLabel="Clear filters"
          onAction={() => setQuery(initialQuery)}
        />
      );
    return (
      <UserTable
        users={visible}
        onEdit={(user) => setForm({ mode: "edit", user })}
      />
    );
  };

  return (
    <div className={collapsed ? "shell collapsed" : "shell"}>
      <Header
        appName="GamePulse"
        user={{ name: "Amanda Lee", role: "Admin", hasNotifications: true }}
      />
      <Sidebar
        items={navItems}
        active={active}
        onSelect={setActive}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />
      <main className="main">
        <div className="content">
          <div className="summary">
            <StatCard
              title="Total Users"
              value={stat(users.length)}
              icon="users"
              hint="All registered users"
            />
            <StatCard
              title="Active Users"
              value={stat(activeCount)}
              icon="check"
              hint="Currently active"
            />
            <StatCard
              title="Inactive Users"
              value={stat(users.length - activeCount)}
              icon="pause"
              hint="Not active"
            />
          </div>
          {ready && users.length > 0 && (
            <Leaderboard users={rankedUsers} updatedAt={updatedAt} intervalSeconds={10} />
          )}
          <section className="card table-card">
            <div className="table-head">
              <h2 className="card-title">
                Users
                {ready && <span className="count">{visible.length}</span>}
              </h2>
              {ready && (
                <button
                  className="pill add-btn"
                  onClick={() => setForm({ mode: "add" })}
                >
                  <Icon name="plus" size={18} /> Add user
                </button>
              )}
            </div>
            {ready && users.length > 0 && (
              <UserFilters
                query={query}
                onChange={setQuery}
                departments={departments}
              />
            )}
            {renderList()}
          </section>
        </div>
      </main>
      <Modal
        open={form !== null}
        title={editing ? "Edit user" : "Add user"}
        onClose={() => setForm(null)}
      >
        <UserForm
          key={editing?.id ?? "new"}
          initial={editing ?? undefined}
          takenEmails={takenEmails}
          submitLabel={editing ? "Save changes" : "Add user"}
          onSubmit={handleSave}
          onCancel={() => setForm(null)}
        />
      </Modal>
    </div>
  );
}

export default DashBoard;
