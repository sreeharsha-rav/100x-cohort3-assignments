import React from "react";
import { TimeField, TimeFormat, EditState } from "../../types/timer";

type TimeDisplayProps = {
  displayTime: TimeFormat;
  editState: EditState;
  handleEditField: (field: TimeField) => void;
  handleInputChange: (value: string) => void;
};

export const TimeDisplay: React.FC<TimeDisplayProps> = ({
  displayTime,
  editState,
  handleEditField,
  handleInputChange,
}) => (
  <div className="flex justify-center space-x-2 text-4xl font-mono mb-6">
    {(["hours", "minutes", "seconds"] as const).map((field, index) => (
      <React.Fragment key={field}>
        {index > 0 && <span>:</span>}
        <div
          onClick={() => handleEditField(field)}
          className="cursor-pointer hover:bg-base-200 px-2 rounded"
        >
          {editState?.field === field ? (
            <input
              type="text"
              value={editState.value}
              onChange={(e) => handleInputChange(e.target.value)}
              onBlur={() => handleEditField(field)}
              onKeyDown={(e) => e.key === "Enter" && handleEditField(field)}
              className="w-12 text-center bg-transparent outline-none"
              autoFocus
            />
          ) : (
            displayTime[field]
          )}
        </div>
      </React.Fragment>
    ))}
  </div>
);
