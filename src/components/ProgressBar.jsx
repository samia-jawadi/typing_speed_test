import React from "react";

export default function ProgressBar({ progress }) {
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <span>{progress}%</span>
    </div>
  );
}
