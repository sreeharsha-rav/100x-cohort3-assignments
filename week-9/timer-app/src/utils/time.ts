import { TimeFormat } from "../types/timer";

export const formatTime = (timeInSeconds: number): TimeFormat => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  return {
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };
};

export const calculateTime = (
  hours: string,
  minutes: string,
  seconds: string
): number => {
  const calculatedTime =
    parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);

  return isNaN(calculatedTime) ? 0 : calculatedTime;
};
