export default function parseFixedFormat(text) {
  // Divide il testo in blocchi usando l'intestazione
  const blocks = text
    .split(/\*{5,}\s*Numero modulo/gi)
    .map(b => b.trim())
    .filter(b => b.length > 0);

  const rows = [];

  for (const block of blocks) {

    // ✅ modulo estratto correttamente anche dopo lo split
    // matcha la prima riga del blocco: "= 6   Numero porta = 536 ..."
    const modulo = extract(block, /^=\s*(\d+)/m);

    // ✅ gli altri campi restano invariati
    const porta  = extract(block, /Numero porta\s*=\s*(\d+)/i);
    const DN     = extract(block, /DN\s*=\s*([0-9]+)/i);
    const ip1    = extract(block, /IP_ADDR\s*=\s*([0-9./]+)/i);
    const ip2    = extract(block, /IP_ADDR2\s*=\s*([0-9./]+)/i);
    const gruppo = extract(block, /Nome gruppo\s*=\s*([^\n]+)/i);

    // ✅ costruiamo una riga CSV senza virgolette (la UI le aggiungerà)
    const line = [
      modulo ?? "",
      porta ?? "",
      DN ?? "",
      ip1 ?? "",
      ip2 ?? "",
      gruppo ?? ""
    ].join(",");

    rows.push(line);
  }

  return rows;
}

// Helpers
function extract(text, regex) {
  const m = text.match(regex);
  return m ? m[1].trim() : "";
}
