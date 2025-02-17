import { useState, useEffect } from "react";
import { EditState, TimeField } from "../types/timer";
import { formatTime, calculateTime } from "../utils/time";

export const useTimer = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [editState, setEditState] = useState<EditState>(null);

  const handleEditField = (field: TimeField) => {
    if (editState?.field === field) {
      const formattedValue = editState.value.padStart(2, "0");
      const currentTime = formatTime(time);
      const newTime = {
        ...currentTime,
        [field]: formattedValue,
      };

      const calculatedTime = calculateTime(
        newTime.hours,
        newTime.minutes,
        newTime.seconds
      );

      setTime(calculatedTime);
      setEditState(null);
    } else {
      setIsRunning(false);
      const currentValue = formatTime(time)[field];
      setEditState({
        field,
        value: currentValue.replace(/^0/, ""),
      });
    }
  };

  const handleInputChange = (value: string) => {
    if (!editState) return;

    const numericValue = value.replace(/\D/g, "").slice(0, 2);
    let validatedValue = numericValue;

    if (editState.field === "minutes" || editState.field === "seconds") {
      validatedValue = Math.min(parseInt(numericValue) || 0, 59).toString();
    } else if (editState.field === "hours") {
      validatedValue = Math.min(parseInt(numericValue) || 0, 99).toString();
    }

    setEditState({
      ...editState,
      value: validatedValue,
    });
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
    setEditState(null);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  return {
    time,
    isRunning,
    editState,
    setIsRunning,
    handleEditField,
    handleInputChange,
    resetTimer,
    displayTime: formatTime(time),
  };
};
