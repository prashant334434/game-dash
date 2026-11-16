import type { RankedUser, UserQuery } from "../types/user";

const byName = (a: RankedUser, b: RankedUser) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" });

const byRank = (a: RankedUser, b: RankedUser) => (a.rank ?? Infinity) - (b.rank ?? Infinity) || byName(a, b);

export function queryUsers(users: RankedUser[], { search, status, department, sort }: UserQuery): RankedUser[] {
  const q = search.trim().toLowerCase();
  const compare = sort === "rank" ? byRank : sort === "asc" ? byName : (a: RankedUser, b: RankedUser) => byName(b, a);
  return users
    .filter(
      (u) =>
        (status === "All" || u.status === status) &&
        (department === "All" || u.department === department) &&
        [u.name, u.email, u.phone, u.company].some((v) => v.toLowerCase().includes(q)),
    )
    .sort(compare);
}
