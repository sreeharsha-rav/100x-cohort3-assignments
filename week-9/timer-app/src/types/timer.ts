export type TimeField = "hours" | "minutes" | "seconds";
export type TimeFormat = Record<TimeField, string>;

export type EditState = {
  field: TimeField;
  value: string;
} | null;
