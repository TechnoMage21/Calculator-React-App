import React, { useState } from "react";
import DisplayResult from "./DisplayResult";
import { evaluate } from "mathjs";

function Calculator() {
  const [valueCount, setValue] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    const { value } = e.target;

    switch (value) {
      case "C":
        setValue("");
        setResult("");
        break;
      case "=":
        try {
          const newval1 = evaluate(valueCount);
          setValue(newval1.toString());
          setResult("");
        } catch (error) {
          setValue("Error");
          setResult(valueCount);
        }
        break;
      default:
        if (valueCount === "" && ["+", "*", "/", "%"].includes(value)) {
          setValue("You cannot Put Operator First..");
        } else {
          const newVal = valueCount + value;
          setValue(newVal);
          try {
            const lastChar = newVal.slice(-1);
            if (["+", "*", "/", "%"].includes(lastChar)) {
              let newRes = evaluate(newVal.slice(0, -1))
              setResult(newRes);
              console.log(newRes);
            } else {
              setResult(evaluate(newVal).toString());
            }
          } catch (error) {
            setResult(valueCount);
          }
        }
        break;
    }
  };
  const handleBackspace = (e)=>{
    e.preventDefault();
    let splitval = valueCount.slice(0,-1);
    setValue(splitval);
    try {
      const lastChar = splitval.slice(-1);
      if (["+", "*", "/", "%"].includes(lastChar)) {
        setResult( evaluate(splitval.slice(0, -1)).toString());
      } else {
        setResult(evaluate(splitval).toString());
      }
    } catch (error) {
      setResult(valueCount);
    }
  }
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
          <button
            className="key-button equal"
            value="="
            onClick={handleClick}
          >
            =
          </button>
          <button
            className="key-button backspace"
            value="space"
            onClick={handleBackspace}
          >
            <img src={`${process.env.PUBLIC_URL}/image/backspace.png`} value="space" alt="backspace" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Calculator;
