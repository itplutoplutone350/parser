"use client";

import { useState } from "react";
import parseFixedFormat from "@/lib/parser";

export default function ParserForm() {
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState([]);
  const [csvOutput, setCsvOutput] = useState("");

  const handleParse = () => {
    const parsed = parseFixedFormat(inputText);

    // ✅ Aggiungo virgolette a ogni campo dell’output
    const quoted = parsed.map(line => {
      const fields = line.split(",");
      const quotedFields = fields.map(f => `"${f}"`);
      return quotedFields.join(",");
    });

    setResults(quoted);
    setCsvOutput(quoted.join("\n"));
  };

  const handleCopyCsv = () => {
    if (!csvOutput) return;

    navigator.clipboard.writeText(csvOutput)
      .then(() => alert("CSV copiato negli appunti!"))
      .catch(err => console.error("Errore copia CSV:", err));
  };

  return (
    <div style={{ maxWidth: "700px" }}>
      <h2>Incolla il testo da analizzare</h2>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={`Incolla qui il dump...`}
        style={{ width: "100%", height: "260px", marginBottom: "10px" }}
      />

      <button onClick={handleParse} style={{ marginRight: "10px" }}>
        Esegui parsing
      </button>

      {results.length > 0 && (
        <>
          <button onClick={handleCopyCsv} style={{ marginTop: "10px" }}>
            Copia CSV
          </button>

          <h3>Risultati (CSV con virgolette)</h3>

          <textarea
            value={csvOutput}
            readOnly
            style={{ width: "100%", height: "200px", marginTop: "10px" }}
          />

          <ul style={{ marginTop: "20px" }}>
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
