import React from "react";

function DisplayResult (props){
    return(
        <>
             < div className="results">
                    <h6>{props.value}</h6>
                    <h6 className="result-val">{props.result}</h6>
                
             </div>
            {/* <input type="text" name="result" value={props.value} id="" readOnly/>
            <input type="text" name="finalresult" value={props.result} id="" readOnly/> */}
        </>
    )
}
export default DisplayResult;