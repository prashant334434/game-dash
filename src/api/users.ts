import axios from "axios";
import type { ApiUser, User } from "../types/user";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
});

const DEPARTMENTS = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "Support",
  "HR",
];

export function toUser(api: ApiUser): User {
  return {
    id: api.id,
    name: api.name,
    username: api.username,
    email: api.email.toLowerCase(),
    phone: api.phone.split(" x")[0],
    company: api.company.name,
    department: DEPARTMENTS[(api.id - 1) % DEPARTMENTS.length],
    city: api.address.city,
    status: api.id % 3 === 0 ? "Inactive" : "Active",
  };
}

export function getErrorMessage(err: unknown): string {
  if (!axios.isAxiosError(err)) {
    return err instanceof Error
      ? err.message
      : "Something unexpected happened.";
  }
  if (err.code === "ECONNABORTED")
    return "The request timed out. Please try again.";
  if (!err.response)
    return "Unable to reach the server. Please check your internet connection.";
  const { status } = err.response;
  if (status === 404)
    return "The users endpoint could not be found (error 404).";
  if (status >= 500)
    return `The server is having trouble right now (error ${status}). Please try again later.`;
  return `We couldn't load users (error ${status}).`;
}

export async function fetchUsers(signal?: AbortSignal): Promise<User[]> {
  const { data } = await api.get<unknown>("/users", { signal });
  if (!Array.isArray(data)) {
    throw new Error("The server returned data in an unexpected format.");
  }
  return (data as ApiUser[]).map(toUser);
}
