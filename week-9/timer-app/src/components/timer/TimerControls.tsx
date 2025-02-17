import React from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

type TimerControlsProps = {
  isRunning: boolean;
  time: number;
  onTogglePlay: () => void;
  onReset: () => void;
};

export const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  time,
  onTogglePlay,
  onReset,
}) => (
  <div className="flex justify-center space-x-4">
    <button
      className={`btn btn-outline btn-circle btn-lg ${
        time === 0 ? "btn-disabled" : ""
      }`}
      onClick={onTogglePlay}
    >
      {isRunning ? <Pause size={24} /> : <Play size={24} />}
    </button>

    <button className="btn btn-outline btn-circle btn-lg" onClick={onReset}>
      <RotateCcw size={24} />
    </button>
  </div>
);
