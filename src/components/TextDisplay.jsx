import React from "react";

// TextDisplay shows the current text with coloring based on user input and dark mode
export default function TextDisplay({ currentText, userInput, darkMode }) {
  // If there is no text to display, render nothing
  if (!currentText) return null;

  return (
    <div className="text-display">
      {/* Split the current text into individual characters */}
      {currentText.split("").map((char, index) => {
        // Default style: muted text (color changes based on dark mode)
        let className = darkMode ? "text-muted-dark" : "text-muted";

        // If the user has typed a character at this index
        if (userInput[index]) {
          // If the typed character matches the expected character, mark it as success (correct)
          // Otherwise, mark it as danger (incorrect)
          className =
            userInput[index] === char ? "text-success" : "text-danger";
        }

        // Render each character as a <span> with its style
        return (
          <span key={index} className={className}>
            {char}
          </span>
        );
      })}
    </div>
  );
}
