import React from "react";

// TextInput is a textarea that accepts user input and adapts to dark mode
export default function TextInput({
  userInput, // current value typed by the user
  setUserInput, // function to update the userInput
  inputRef, // reference to the textarea element (used for focusing, etc.)
  disabled, // whether the input should be disabled
  darkMode, // boolean to apply dark mode styling
  placeholder, // placeholder text shown when input is empty
}) {
  return (
    <textarea
      ref={inputRef} // attach a ref to access this element directly
      value={userInput} // controlled component — value comes from state
      onChange={(e) => setUserInput(e.target.value)} // update user input as they type
      disabled={disabled} // disable input if needed
      placeholder={placeholder} // display placeholder text
      className={darkMode ? "dark-input" : ""} // apply dark mode class if darkMode is true
    />
  );
}
