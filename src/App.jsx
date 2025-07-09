import React, { useState, useEffect } from "react";
import TypingSpeedTester from "./TypingSpeedTester";
import "./App.css"; // Import global styles

function App() {
  // State to manage dark mode; reads from localStorage initially
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    // Toggle the 'dark-mode' class on the body element based on the state

    document.body.classList.toggle("dark-mode", darkMode); //  document.body.classList.toggle("dark-mode", darkMode);

    // Save the dark mode preference in localStorage for persistence
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]); // Re-run this effect whenever darkMode changes

  // Function to toggle darkMode state between true and false
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    // Main container with Bootstrap classes and conditional styling
    <div
      className={`d-flex flex-column min-vh-100 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      {/* Center the content both vertically and horizontally */}
      <div className="d-flex flex-grow-1 align-items-center justify-content-center">
        {/* Wrapper to limit the content width and add padding */}
        <div className="w-100" style={{ maxWidth: "800px", padding: "20px" }}>
          {/* Render the TypingSpeedTester component and pass dark mode state + toggle function */}
          <TypingSpeedTester
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode} // ✅ FIX: Pass toggle function
          />
        </div>
      </div>
    </div>
  );
}

export default App;
