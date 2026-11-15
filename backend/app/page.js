export default function BackendStatusPage() {
  return (
    <main style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: '#1d4a34', borderRadius: '9999px', fontSize: '0.85rem', color: '#c5a059', fontWeight: 'bold', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
        REPUBLIQUE FRANCAISE • GENDARMERIE NATIONALE
      </div>
      <h1 style={{ fontSize: '2.5rem', margin: '0.5rem 0', color: '#ffffff' }}>ORIENT-GR • API Backend</h1>
      <p style={{ color: '#a0aec0', fontSize: '1.1rem', marginBottom: '2rem' }}>
        Services API REST & Moteur Décisionnel d'Orientation Opérationnelle (Next.js App Router).
      </p>

      <div style={{ background: '#163828', border: '1px solid #23523b', borderRadius: '12px', padding: '1.5rem', textAlign: 'left', marginBottom: '2rem' }}>
        <h3 style={{ color: '#c5a059', marginTop: 0 }}>Points de Terminaison API (REST) :</h3>
        <ul style={{ lineHeight: '1.8', color: '#e2e8f0' }}>
          <li><code>POST /api/auth/login</code> — Authentification matricule/mot de passe & token JWT</li>
          <li><code>GET /api/auth/me</code> — Profil connecté et habilitations RBAC</li>
          <li><code>GET /api/dashboard/stats</code> — Métriques agrégées, domaines et distribution</li>
          <li><code>GET /api/students</code> — Gestion des élèves et résultats</li>
          <li><code>GET /api/specialties</code> — Spécialités et conditions d'éligibilité</li>
          <li><code>GET /api/tests</code> — Référentiel des tests d'orientation</li>
          <li><code>POST /api/tests/:id/start</code> — Démarrage et reprise de session</li>
          <li><code>POST /api/tests/:id/progress</code> — Autosauvegarde de la progression</li>
          <li><code>POST /api/tests/:id/submit</code> — Clôture du test et calcul des recommandations</li>
        </ul>
      </div>

      <p style={{ fontSize: '0.9rem', color: '#718096' }}>
        Statut du service : <strong>EN LIGNE</strong> • Base de données : <strong>Microsoft SQL Server</strong> (avec Store Fallback actif)
      </p>
    </main>
  );
}
