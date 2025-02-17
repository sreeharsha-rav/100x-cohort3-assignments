import React, { memo } from "react";

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  type?: string;
  placeholder?: string;
  pattern?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  options?: { value: string; label: string }[];
  onChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
}

const FormField = memo(
  ({
    label,
    name,
    value,
    error,
    type = "text",
    placeholder,
    pattern,
    required,
    minLength,
    maxLength,
    options,
    onChange,
    onBlur,
  }: FormFieldProps) => {
    const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      onChange(name, e.target.value);
    };

    const handleBlur = () => {
      onBlur(name);
    };

    const inputProps = {
      name,
      value,
      onChange: handleChange,
      onBlur: handleBlur,
      placeholder,
      pattern,
      required,
      minLength,
      maxLength,
      className: `w-full ${error ? "input-error" : ""}`,
    };

    return (
      <div className="form-control w-full gap-2 mb-4">
        <label className="label">
          <span className="label-text font-medium">{label}</span>
        </label>

        {type === "textarea" ? (
          <textarea
            {...inputProps}
            className={`textarea textarea-bordered ${inputProps.className}`}
          />
        ) : type === "select" ? (
          <select
            {...inputProps}
            className={`select select-bordered ${inputProps.className}`}
          >
            {options?.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            {...inputProps}
            className={`input input-bordered ${inputProps.className}`}
          />
        )}

        {error && <p className="text-error text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export default FormField;
