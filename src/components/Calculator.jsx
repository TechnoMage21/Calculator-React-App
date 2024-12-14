import React, { useState } from "react";
import DisplayResult from "./DisplayResult";
import { evaluate } from "mathjs";

function Calculator() {
  const [valueCount, setValue] = useState("");
  const [result, setResult] = useState("");

  // Handle button clicks (C, numbers, operators, and equal sign)
  const handleClick = (e) => {
    e.preventDefault();
    const { value } = e.target;

    // Clear the input and result when C is clicked
    if (value === "C") {
      setValue("");
      setResult("");
      return;
    }

    // Calculate result if '=' is clicked
    if (value === "=") {
      handleEvaluate(valueCount);
      return;
    }

    // Handle invalid operator input (operator at the start)
    if (valueCount === "" && ["+", "*", "/", "%"].includes(value)) {
      setValue("You cannot start with an operator.");
      setResult("");
      return;
    }

    // Update the valueCount by appending the clicked button's value
    const newVal = valueCount + value;
    setValue(newVal);
    handleResult(newVal);
  };

  // Handle backspace functionality
  const handleBackspace = (e) => {
    e.preventDefault();
    const newVal = valueCount.slice(0, -1);
    setValue(newVal);
    handleResult(newVal);
  };

  // Evaluate the expression and set result
  const handleEvaluate = (expression) => {
    try {
      const newResult = evaluate(expression).toString();
      setValue(newResult);
      setResult(""); // Clear intermediate result after evaluation
    } catch (error) {
      setValue("Error");
      setResult(expression);
    }
  };

  // Function to update the result while typing
  const handleResult = (newVal) => {
    try {
      // Evaluate the expression dynamically as the user types
      const lastChar = newVal.slice(-1);
      if (["+", "*", "/", "%"].includes(lastChar)) {
        setResult(evaluate(newVal.slice(0, -1)).toString());
      } else {
        setResult(evaluate(newVal).toString());
      }
    } catch (error) {
      setResult("Error");
    }
  };

  // Define the calculator buttons
  const keys = [
    "C", "%", "/", "*",
    "7", "8", "9", "-",
    "4", "5", "6", "+",
    "1", "2", "3", 
    "0", "."
  ];

  return (
    <>
      <DisplayResult value={valueCount} result={result} />
      <div className="main-div">
        <div className="button-div">
          {keys.map((item, index) => (
            <button
              value={item}
              key={index}
              className="key-button"
              onClick={handleClick}
            >
              {item}
            </button>
          ))}
          {/* Equal button */}
          <button
            className="key-button equal"
            value="="
            onClick={handleClick}
          >
            =
          </button>
          {/* Backspace button */}
          <button
            className="key-button backspace"
            value="space"
            onClick={handleBackspace}
          >
            <img src={`${process.env.PUBLIC_URL}/image/backspace.png`} alt="backspace" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Calculator;
