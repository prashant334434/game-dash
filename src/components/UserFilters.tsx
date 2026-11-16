import Icon from "./Icon";
import Select from "./Select";
import type { SortOrder, StatusFilter, UserQuery } from "../types/user";

type UserFiltersProps = {
  query: UserQuery;
  onChange: (query: UserQuery) => void;
  departments: string[];
};

function UserFilters({ query, onChange, departments }: UserFiltersProps) {
  const set = <K extends keyof UserQuery>(key: K, value: UserQuery[K]) =>
    onChange({ ...query, [key]: value });

  return (
    <div className="filters">
      <label className="field search">
        <Icon name="search" size={16} />
        <input
          type="search"
          placeholder="Search name, email, phone or company"
          aria-label="Search users"
          value={query.search}
          onChange={(e) => set("search", e.target.value)}
        />
      </label>
      <Select
        aria-label="Filter by status"
        value={query.status}
        onChange={(e) => set("status", e.target.value as StatusFilter)}
      >
        <option value="All">All statuses</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </Select>
      <Select
        aria-label="Filter by department"
        value={query.department}
        onChange={(e) => set("department", e.target.value)}
      >
        <option value="All">All departments</option>
        {departments.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </Select>
      <Select
        aria-label="Sort users"
        value={query.sort}
        onChange={(e) => set("sort", e.target.value as SortOrder)}
      >
        <option value="asc">Name A → Z</option>
        <option value="desc">Name Z → A</option>
        <option value="rank">Rank 1 → 10</option>
      </Select>
    </div>
  );
}

export default UserFilters;
