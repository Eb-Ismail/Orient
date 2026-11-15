export const metadata = {
  title: 'ORIENT-GR API - Système d\'Orientation Gendarmerie',
  description: 'API REST du Système d\'Aide à la Décision et d\'Orientation des Élèves Gendarmes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: 'system-ui, -apple-system, sans-serif', margin: 0, backgroundColor: '#0e261b', color: '#f8f9f6' }}>
        {children}
      </body>
    </html>
  );
}
