
export default function parseFixedFormat(text, fieldsMap) {
  const result = {};

  // Normalizza i ritorni a capo
  const normalized = text.replace(/\r/g, "");

  for (const [key, label] of Object.entries(fieldsMap)) {
    const regex = new RegExp(`${label}\\s*:\\s*(.+)`, "gi");

    let matches = [];
    let match;

    // estrae tutti i match
    while ((match = regex.exec(normalized)) !== null) {
      matches.push(match[1].trim());
    }

    // se c'è un solo match → restituisci stringa
    // se ce ne sono più → restituisci array
    // se zero → null
    result[key] =
      matches.length === 0 ? null :
      matches.length === 1 ? matches[0] :
      matches;
  }

  return result;
}
