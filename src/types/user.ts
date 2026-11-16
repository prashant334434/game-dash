export interface ApiAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: { lat: string; lng: string };
}

export interface ApiCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: ApiAddress;
  phone: string;
  website: string;
  company: ApiCompany;
}

export type UserStatus = "Active" | "Inactive";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  company: string;
  department: string;
  city: string;
  status: UserStatus;
}

export type UserFormValues = Pick<User, "name" | "email" | "phone" | "company">;

export type StatusFilter = "All" | UserStatus;

export type SortOrder = "asc" | "desc" | "rank";

export interface RankedUser extends User {
  rank: number | null;
  change: number;
}

export interface UserQuery {
  search: string;
  status: StatusFilter;
  department: string;
  sort: SortOrder;
}
