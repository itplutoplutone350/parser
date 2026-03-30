
export default function parseFixedFormat(text, fieldsMap) {
  const results = [];

  // Normalizza i ritorni a capo
  const normalized = text.replace(/\r/g, "");

  for (const [key, label] of Object.entries(fieldsMap)) {
    const regex = new RegExp(`${label}\\s*:\\s*(.+)`, "gi");
    let match;

    // Per ogni match → aggiungi una entry separata
    while ((match = regex.exec(normalized)) !== null) {
      results.push({
        field: key,
        value: match[1].trim()
      });
    }
  }

  return results;
}
