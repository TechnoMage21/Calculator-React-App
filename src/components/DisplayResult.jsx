import React from "react";

function DisplayResult(props) {
  return (
    <div className="results">
      <h6>{props.value}</h6>
      <h6 className="result-val">{props.result}</h6>
    </div>
  );
}

export default DisplayResult;
