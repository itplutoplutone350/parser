"use client";

import { useState } from "react";
import parseFixedFormat from "@/lib/parser";

export default function ParserForm() {
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState([]);
  const [csvOutput, setCsvOutput] = useState("");

  const CSV_HEADER = `"modulo","porta","DN","IP_ADDR","IP_ADDR2","NomeGruppo"`;

  const handleParse = () => {
    const parsed = parseFixedFormat(inputText);

    // ✅ Aggiungiamo le virgolette ai campi di ogni riga
    const quoted = parsed.map(line => {
      const fields = line.split(",");
      const quotedFields = fields.map(f => `"${f}"`);
      return quotedFields.join(",");
    });

    // ✅ Aggiungo la riga di header prima delle righe elaborate
    const fullCsv = [CSV_HEADER, ...quoted].join("\n");

    setResults(quoted);
    setCsvOutput(fullCsv);
  };

  const handleCopyCsv = () => {
    if (!csvOutput) return;

    navigator.clipboard.writeText(csvOutput)
      .then(() => alert("CSV copiato negli appunti!"))
      .catch(err => console.error("Errore copia CSV:", err));
  };

  const handleDownloadCsv = () => {
    if (!csvOutput) return;

    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ maxWidth: "700px" }}>
      <h2>Incolla testo output intpfd da analizzare</h2>

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
          <button onClick={handleCopyCsv} style={{ marginTop: "10px", marginRight: "10px" }}>
            Copia CSV
          </button>

          <button onClick={handleDownloadCsv} style={{ marginTop: "10px" }}>
            Download CSV
          </button>

          <h3>Output CSV</h3>

          <textarea
            value={csvOutput}
            readOnly
            style={{ width: "100%", height: "200px", marginTop: "10px" }}
          />

          <h3>Righe elaborate</h3>
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
``
