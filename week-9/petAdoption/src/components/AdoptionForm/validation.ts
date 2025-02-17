export const VALIDATION_PATTERNS = {
  fullName: "^[A-Za-z ]{2,50}$",
  email: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$",
  phone: "^[0-9-+()\\s]{10,15}$",
};

export const validateField = (name: string, value: string): string => {
  switch (name) {
    case "fullName":
      if (!new RegExp(VALIDATION_PATTERNS.fullName).test(value)) {
        return "Name must be 2-50 characters long and contain only letters and spaces";
      }
      break;
    case "email":
      if (!new RegExp(VALIDATION_PATTERNS.email).test(value)) {
        return "Please enter a valid email address";
      }
      break;
    case "phone":
      if (!new RegExp(VALIDATION_PATTERNS.phone).test(value)) {
        return "Please enter a valid phone number (10-15 digits)";
      }
      break;
    case "address":
      if (value.length < 5) {
        return "Address must be at least 5 characters long";
      }
      break;
    case "additionalNotes":
      if (value.length > 500) {
        return "Notes cannot exceed 500 characters";
      }
      break;
  }
  return "";
};
