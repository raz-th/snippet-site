import { useParams } from "react-router-dom";
import CodeSnippet from "../Components/Snippet";
import { useEffect, useState } from "react";
import { getCodeById } from "../Firebase";

function PreviewCode() {
  const { id } = useParams();
  

  return (
    <div className="App">
      <div className="card">
        <div className="header">
          <div className="top">
            <div className="circle">
              <span className="red circle2"></span>
            </div>
            <div className="circle">
              <span className="yellow circle2"></span>
            </div>
            <div className="circle">
              <span className="green circle2"></span>
            </div>
            <div className="title">
              <p>{id}.cpp</p>
            </div>
          </div>
        </div>
        <CodeSnippet id={id}/>
      </div>
    </div>
  );
}

export default PreviewCode;
