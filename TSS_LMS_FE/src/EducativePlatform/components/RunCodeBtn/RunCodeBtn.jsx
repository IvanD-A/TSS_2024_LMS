import React, { useState } from "react";

export const RunCodeBtn = ({ code, className, onOutputChange }) => {
  const [codeCompiled, setCodeCompiled] = useState("");

  const uploadCode = async (e) => {
    e.preventDefault();
    const headerContent = { 'Content-Type': 'application/json' }

    console.log(code);
    const bodyContent = JSON.stringify({ className: className, code: code, extention: 'java' });


    const petition = await fetch('http://localhost:3001/api/compiler', {
      method: 'POST',
      headers: headerContent,
      body: bodyContent
    });


    const {output} = await petition.json();
    console.log(output);
    // onOutputChange(response.res) // Propaga output al componente padre
    setCodeCompiled(output);
  }

  return (
    <>
      <button className="btn btn-primary h-25" onClick={(e) => { uploadCode(e) }}>Run Code</button>
      <pre><strong>SALIDA: </strong><pre>{codeCompiled}</pre></pre>
    </>
  )
}