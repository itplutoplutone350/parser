"use client";

import { useState } from "react";
import parseFixedFormat from "@/lib/parser";

export default function ParserForm() {
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState([]);

  const handleParse = () => {
    const parsed = parseFixedFormat(inputText);
    setResults(parsed);
  };

  return (
    <div style={{ maxWidth: "700px" }}>
      <h2>Incolla il testo da analizzare</h2>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={`Incolla qui l'intero dump...`}
        style={{ width: "100%", height: "260px", marginBottom: "10px" }}
      />

      <button onClick={handleParse}>Esegui parsing</button>

      {Array.isArray(results) && results.length > 0 && (
        <>
          <h3>Risultati</h3>
          <ul>
            {results.map((line, index) => (
              <li key={index}>
                <code>{line}</code>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
