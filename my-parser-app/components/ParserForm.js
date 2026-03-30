"use client";

import { useState } from "react";
import parseFixedFormat from "@/lib/parser";

export default function ParserForm() {
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState([]);

  const fieldsMap = {
    nome: "Nome",
    eta: "Età",
    citta: "Città",
    lavoro: "Professione"
  };

  const handleParse = () => {
    const parsed = parseFixedFormat(inputText, fieldsMap);
    setResults(parsed);
  };

  return (
    <div style={{ maxWidth: "600px" }}>
      <h2>Incolla il testo da analizzare</h2>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={`Nome: Mario Rossi\nEtà: 35\nCittà: Torino\nProfessione: Designer`}
      />

      <button onClick={handleParse}>Esegui parsing</button>

      {Array.isArray(results) && (
        <ul>
          {results.map((item, index) => (
            <li key={index}>
              <strong>{item.field}:</strong> {item.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
