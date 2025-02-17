import React from "react";
import { TimeDisplay } from "./timer/TimeDisplay";
import { TimerControls } from "./timer/TimerControls";
import { useTimer } from "../hooks/useTimer";

export const Timer: React.FC = () => {
  const {
    time,
    isRunning,
    editState,
    setIsRunning,
    handleEditField,
    handleInputChange,
    resetTimer,
    displayTime,
  } = useTimer();

  return (
    <div className="card w-full max-w-md mx-auto bg-base-100 shadow-xl">
      <div className="card-body">
        <TimeDisplay
          displayTime={displayTime}
          editState={editState}
          handleEditField={handleEditField}
          handleInputChange={handleInputChange}
        />

        <TimerControls
          isRunning={isRunning}
          time={time}
          onTogglePlay={() => setIsRunning(!isRunning)}
          onReset={resetTimer}
        />
      </div>
    </div>
  );
};

export default Timer;
