import { useState } from "react";
import type { FormEvent } from "react";
import type { UserFormValues } from "../types/user";
import { validateUser } from "../utils/validateUser";
import type { UserFormErrors } from "../utils/validateUser";

type UserFormProps = {
  initial?: UserFormValues;
  takenEmails: string[];
  submitLabel: string;
  onSubmit: (values: UserFormValues) => void;
  onCancel: () => void;
};

const empty: UserFormValues = { name: "", email: "", phone: "", company: "" };

const fields: {
  key: keyof UserFormValues;
  label: string;
  type: string;
  autoComplete: string;
}[] = [
  { key: "name", label: "Name", type: "text", autoComplete: "name" },
  { key: "email", label: "Email", type: "email", autoComplete: "email" },
  { key: "phone", label: "Phone Number", type: "tel", autoComplete: "tel" },
  {
    key: "company",
    label: "Company",
    type: "text",
    autoComplete: "organization",
  },
];

function UserForm({
  initial = empty,
  takenEmails,
  submitLabel,
  onSubmit,
  onCancel,
}: UserFormProps) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<UserFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof UserFormValues, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (submitted) setErrors(validateUser(next, takenEmails));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const found = validateUser(values, takenEmails);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    onSubmit({
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      phone: values.phone.trim(),
      company: values.company.trim(),
    });
  };

  return (
    <form className="form" noValidate onSubmit={handleSubmit}>
      {fields.map(({ key, label, type, autoComplete }) => (
        <label key={key} className="form-field">
          <span className="form-label">
            {label} <span aria-hidden="true">*</span>
          </span>
          <input
            className={errors[key] ? "form-input invalid" : "form-input"}
            type={type}
            name={key}
            autoComplete={autoComplete}
            required
            value={values[key]}
            aria-invalid={Boolean(errors[key])}
            aria-describedby={errors[key] ? `${key}-error` : undefined}
            onChange={(e) => update(key, e.target.value)}
          />
          {errors[key] && (
            <span id={`${key}-error`} className="form-error">
              {errors[key]}
            </span>
          )}
        </label>
      ))}
      <div className="form-actions">
        <button type="button" className="ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="pill">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default UserForm;
