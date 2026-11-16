import type { UserFormValues } from "../types/user";

export type UserFormErrors = Partial<Record<keyof UserFormValues, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[\d\s().-]{7,20}$/;

export function validateUser(
  values: UserFormValues,
  takenEmails: string[],
): UserFormErrors {
  const errors: UserFormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim().toLowerCase();
  const phone = values.phone.trim();

  if (!name) errors.name = "Name is required.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";

  if (!email) errors.email = "Email is required.";
  else if (!EMAIL.test(email)) errors.email = "Enter a valid email address.";
  else if (takenEmails.includes(email))
    errors.email = "A user with this email already exists.";

  if (!phone) errors.phone = "Phone number is required.";
  else if (!PHONE.test(phone) || phone.replace(/\D/g, "").length < 7)
    errors.phone = "Enter a valid phone number (at least 7 digits).";

  if (!values.company.trim()) errors.company = "Company is required.";

  return errors;
}
