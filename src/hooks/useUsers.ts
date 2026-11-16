import { useEffect, useState } from "react";
import axios from "axios";
import { fetchUsers, getErrorMessage } from "../api/users";
import type { User, UserFormValues } from "../types/user";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetchUsers(controller.signal)
      .then((data) => {
        setUsers(data);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!axios.isCancel(err)) setError(getErrorMessage(err));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [attempt]);

  const retry = () => {
    setLoading(true);
    setError(null);
    setAttempt((n) => n + 1);
  };

  const addUser = (values: UserFormValues) =>
    setUsers((prev) => [
      ...prev,
      {
        ...values,
        id: Math.max(0, ...prev.map((u) => u.id)) + 1,
        username: values.email.split("@")[0],
        department: "Unassigned",
        city: "",
        status: "Active",
      },
    ]);

  const updateUser = (id: number, values: UserFormValues) =>
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...values } : u)),
    );

  return { users, loading, error, retry, addUser, updateUser };
}
