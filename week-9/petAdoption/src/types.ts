export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  petType: PetType;
  preferredSize: PreferredSize;
  additionalNotes: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export type PetType = "dog" | "cat" | "bird" | "other";
export type PreferredSize = "small" | "medium" | "large";
