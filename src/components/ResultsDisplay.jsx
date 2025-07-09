import React from "react";

export default function ResultsDisplay({ results, completedTests, darkMode }) {
  if (!results) return null;

  return (
    <div className={`results ${darkMode ? "dark-results" : ""}`}>
      <h3>Tests Completed: {completedTests}</h3>
      <h2>{results.wpm} WPM</h2>
      <p>Accuracy: {results.accuracy}%</p>
    </div>
  );
}
