export const metadata = {
  title: "Text Parser Demo",
  description: "Parsing di testo con formattazione fissa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
