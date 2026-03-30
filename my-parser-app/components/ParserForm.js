
"use client";
import { useState } from "react";
import parseFixedFormat from "@/lib/parser";
export default function ParserForm(){
 const [inputText,setInputText]=useState("");
 const [results,setResults]=useState(null);
 const fieldsMap={nome:"Nome",eta:"Età",citta:"Città",lavoro:"Professione"};
 const handleParse=()=>{setResults(parseFixedFormat(inputText,fieldsMap));};
 return(
 <div style={{maxWidth:"600px"}}>
 <h2>Incolla il testo da analizzare</h2>
 <textarea value={inputText} onChange={e=>setInputText(e.target.value)} placeholder={`Nome: Mario Rossi
Età: 35
Città: Torino
Professione: Designer`}/>
 <button onClick={handleParse}>Esegui parsing</button>
 {results && (
 <ul>
 {Object.entries(results).map(([key,value])=>(<li key={key}><strong>{key}:</strong> {value ?? "(non trovato)"}</li>))}
 </ul>
 )}
 </div>
 );
}
