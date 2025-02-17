import React, { useState, useCallback } from "react";
import { FormData } from "../../types";
import FormField from "./FormField";
import { VALIDATION_PATTERNS, validateField } from "./validation";

interface ValidationErrors {
  [key: string]: string;
}

interface AdoptionFormProps {
  onSubmit: (data: FormData) => void;
}

const initialFormState: FormData = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  petType: "dog",
  preferredSize: "small",
  additionalNotes: "",
};

const AdoptionForm: React.FC<AdoptionFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const handleFieldChange = useCallback(
    (name: string, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (touched[name]) {
        const error = validateField(name, value);
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
      }
    },
    [touched]
  );

  const handleFieldBlur = useCallback(
    (name: string) => {
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));
      const error = validateField(name, formData[name as keyof FormData]);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    },
    [formData]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: ValidationErrors = {};
    let hasErrors = false;

    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      onSubmit(formData);
      setFormData(initialFormState);
      setTouched({});
      setErrors({});
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            error={touched.fullName ? errors.fullName : ""}
            placeholder="Enter your full name"
            pattern={VALIDATION_PATTERNS.fullName}
            required
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            error={touched.email ? errors.email : ""}
            placeholder="Enter your email"
            pattern={VALIDATION_PATTERNS.email}
            required
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
          />

          <FormField
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            error={touched.phone ? errors.phone : ""}
            placeholder="Enter your phone number"
            pattern={VALIDATION_PATTERNS.phone}
            required
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
          />

          <FormField
            label="Address"
            name="address"
            type="textarea"
            value={formData.address}
            error={touched.address ? errors.address : ""}
            placeholder="Enter your address"
            required
            minLength={5}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
          />

          <FormField
            label="Pet Type"
            name="petType"
            type="select"
            value={formData.petType}
            required
            options={[
              { value: "dog", label: "Dog" },
              { value: "cat", label: "Cat" },
              { value: "bird", label: "Bird" },
              { value: "other", label: "Other" },
            ]}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
          />

          <FormField
            label="Preferred Size"
            name="preferredSize"
            type="select"
            value={formData.preferredSize}
            required
            options={[
              { value: "small", label: "Small" },
              { value: "medium", label: "Medium" },
              { value: "large", label: "Large" },
            ]}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
          />

          <FormField
            label="Additional Notes"
            name="additionalNotes"
            type="textarea"
            value={formData.additionalNotes}
            error={touched.additionalNotes ? errors.additionalNotes : ""}
            placeholder="Any additional information..."
            maxLength={500}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
          />

          <button type="submit" className="btn btn-primary w-full mt-6">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdoptionForm;
