import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import TextDisplay from "./components/TextDisplay";
import TextInput from "./components/TextInput";
import ResultsDisplay from "./components/ResultsDisplay";
import ProgressBar from "./components/ProgressBar";
import ModeToggle from "./components/ModeToggle";

// Local array of fallback paragraphs
const paragraphs = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing speed tests are useful for practice and improvement.",
  "React is a JavaScript library for building user interfaces.",
  "Consistency in daily practice leads to improved typing skills.",
  "Mastering touch typing can significantly increase productivity.",
  "Programming often requires frequent and accurate typing.",
  "The rain in Spain stays mainly in the plain.",
  "Efficient typists rarely look at their keyboards.",
  "Errors decrease with regular repetition and discipline.",
  "Typing games make learning faster and more engaging.",
];

export default function TypingSpeedTester({ darkMode, toggleDarkMode }) {
  // Component state management
  const [currentText, setCurrentText] = useState(""); // Active paragraph
  const [userInput, setUserInput] = useState(""); // User's typing input
  const [startTime, setStartTime] = useState(null); // Typing start time
  const [results, setResults] = useState(null); // Typing results (WPM & accuracy)
  const [completedTests, setCompletedTests] = useState(0); // Number of finished tests
  const [isLoading, setIsLoading] = useState(false); // Loading state for new text
  const inputRef = useRef(null); // Ref to input box

  // Reset input and results for a new test
  const resetTest = () => {
    setUserInput("");
    setStartTime(null);
    setResults(null);
  };

  // Load a new paragraph from the local array
  const fetchNewText = () => {
    setIsLoading(true);
    resetTest();

    // Simulate a slight delay for loading effect setTimeout is used to delay some code from running.
    setTimeout(() => {
      // Pick a random paragraph that's not the same as the current one

      const remaining = paragraphs.filter((p) => p !== currentText); //.filter((p) => p !== currentText)	Remove the current paragraph
      const random = remaining[Math.floor(Math.random() * remaining.length)]; //Math.random() * remaining.length	Random index from filtered list
      setCurrentText(random);
      setIsLoading(false);
      inputRef.current?.focus(); // Focus on input box
    }, 3000); // Short delay to simulate loading
  };

  // Load initial paragraph when component mounts
  //useEffect runs side effects in a React component. Think of it like telling React: “Run this code after the component renders.”
  useEffect(() => {
    fetchNewText();
  }, []);
  useEffect(() => {
    fetchNewText();
  }, []);

  // Start the timer when user starts typing (first character)
  useEffect(() => {
    if (userInput.length === 1 && !startTime && currentText) {
      setStartTime(Date.now());
    }
  }, [userInput, startTime, currentText]); //“Only run this code when one of these things changes.”

  // When user finishes typing, calculate WPM and accuracy
  useEffect(() => {
    if (
      currentText &&
      userInput.length === currentText.length &&
      startTime &&
      !results // Only calculate once
    ) {
      const endTime = Date.now();
      const timeInMinutes = (endTime - startTime) / 60000;

      const wordCount = currentText.trim().split(/\s+/).length;
      const wpm = Math.max(0, Math.round(wordCount / timeInMinutes));

      let correct = 0;
      for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === currentText[i]) correct++;
      }

      const accuracy =
        userInput.length > 0
          ? Math.round((correct / userInput.length) * 100)
          : 0;

      setResults({ wpm, accuracy });
      setCompletedTests((prev) => prev + 1);
    }
  }, [userInput, currentText, startTime, results]);

  // Progress bar percentage
  const progress = currentText
    ? Math.round((userInput.length / currentText.length) * 100)
    : 0;

  // Main UI layout
  return (
    <div className={`typing-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Toggle between dark and light mode */}
      <div className="text-end mb-3">
        <ModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      {/* Loading indicator */}
      {isLoading && <div className="loading">Loading new text...</div>}

      {/* Display paragraph and highlight user input */}
      <TextDisplay
        currentText={currentText}
        userInput={userInput}
        darkMode={darkMode}
      />

      {/* Text input area for typing */}
      <TextInput
        userInput={userInput}
        setUserInput={setUserInput}
        inputRef={inputRef}
        disabled={isLoading || !currentText}
        darkMode={darkMode}
        placeholder={
          isLoading
            ? "Loading..."
            : currentText
            ? "Start typing here..."
            : "Fetching text..."
        }
      />

      {/* Typing progress bar */}
      <ProgressBar progress={progress} />

      {/* Results display (WPM and accuracy) */}
      <ResultsDisplay
        results={results}
        completedTests={completedTests}
        darkMode={darkMode}
      />

      {/* Button to load a new paragraph */}
      <button
        onClick={fetchNewText}
        disabled={isLoading}
        className={`new-paragraph-btn ${darkMode ? "dark-btn" : ""}`}
      >
        {isLoading ? "Loading..." : "↻ Load New Paragraph"}
      </button>
    </div>
  );
}
