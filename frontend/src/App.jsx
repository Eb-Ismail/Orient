import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';

// Layouts
import AdminLayout from './layouts/AdminLayout.jsx';
import StudentLayout from './layouts/StudentLayout.jsx';

// Public Pages
import LoginPage from './pages/public/LoginPage.jsx';
import ForbiddenPage from './pages/public/ForbiddenPage.jsx';
import NotFoundPage from './pages/public/NotFoundPage.jsx';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard.jsx';
import TestInstructionsPage from './pages/student/TestInstructionsPage.jsx';
import CandidateInfoPage from './pages/student/CandidateInfoPage.jsx';
import TestRunnerPage from './pages/student/TestRunnerPage.jsx';
import StudentResultsPage from './pages/student/StudentResultsPage.jsx';
import StudentProfilePage from './pages/student/StudentProfilePage.jsx';
import SimulationRunnerPage from './pages/student/SimulationRunnerPage.jsx';
import SimulationResultsPage from './pages/student/SimulationResultsPage.jsx';
import StudentWorkshopsPage from './pages/student/StudentWorkshopsPage.jsx';
import StudentWorkshopSessionPage from './pages/student/StudentWorkshopSessionPage.jsx';
import SmartJourneyPage from './pages/student/SmartJourneyPage.jsx';

// Admin, Commission & Workshop Pages
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import WorkshopSupervisionPage from './pages/admin/WorkshopSupervisionPage.jsx';
import CommissionDashboardPage from './pages/commission/CommissionDashboardPage.jsx';
import CommissionsRecruitmentPage from './pages/admin/CommissionsRecruitmentPage.jsx';
import StudentsManagementPage from './pages/admin/StudentsManagementPage.jsx';
import PromotionsManagementPage from './pages/admin/PromotionsManagementPage.jsx';
import SpecialtiesManagementPage from './pages/admin/SpecialtiesManagementPage.jsx';
import EligibilityRulesPage from './pages/admin/EligibilityRulesPage.jsx';
import TestsManagementPage from './pages/admin/TestsManagementPage.jsx';
import QuestionBankPage from './pages/admin/QuestionBankPage.jsx';
import StudentResultsAdminPage from './pages/admin/StudentResultsAdminPage.jsx';
import ProfileComparisonPage from './pages/admin/ProfileComparisonPage.jsx';
import ReportsExportPage from './pages/admin/ReportsExportPage.jsx';
import AdminSettingsPage from './pages/admin/AdminSettingsPage.jsx';
import WorkshopsManagementPage from './pages/admin/WorkshopsManagementPage.jsx';
import WorkshopDetailsPage from './pages/admin/WorkshopDetailsPage.jsx';
import WorkshopEvaluationSheetPage from './pages/admin/WorkshopEvaluationSheetPage.jsx';
import WorkshopsAnalyticsPage from './pages/admin/WorkshopsAnalyticsPage.jsx';

// Route Guards
function RequireAuth({ children, allowedRoles = [] }) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gendarmerie border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  return children;
}

function RootRedirect() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user.role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
  if (user.role === 'COMMISSION') return <Navigate to="/commission/dashboard" replace />;
  return <Navigate to="/eleve/dashboard" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Redirection Racine */}
            <Route path="/" element={<RootRedirect />} />

            {/* Pages Publiques */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/403" element={<ForbiddenPage />} />

            {/* Interface de Test (Plein écran sans menu distrayant) */}
            <Route
              path="/eleve/tests/:id/passer"
              element={
                <RequireAuth allowedRoles={['ELEVE', 'ADMIN']}>
                  <TestRunnerPage />
                </RequireAuth>
              }
            />

            {/* Interface de Simulation Professionnelle Immersive (Plein écran sans distraction) */}
            <Route
              path="/eleve/simulations/:moduleId"
              element={
                <RequireAuth allowedRoles={['ELEVE', 'ADMIN']}>
                  <SimulationRunnerPage />
                </RequireAuth>
              }
            />

            {/* Espace Élève Gendarme */}
            <Route
              path="/eleve"
              element={
                <RequireAuth allowedRoles={['ELEVE', 'ADMIN']}>
                  <StudentLayout />
                </RequireAuth>
              }
            >
              <Route index element={<Navigate to="/eleve/dashboard" replace />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="parcours-intelligent" element={<SmartJourneyPage />} />
              <Route path="guide" element={<StudentWorkshopsPage />} />
              <Route path="ateliers" element={<Navigate to="/eleve/guide" replace />} />
              <Route path="ateliers/:assignmentId" element={<StudentWorkshopSessionPage />} />
              <Route path="profil" element={<StudentProfilePage />} />

              {/* Redirections compatibles des anciens modules fusionnés */}
              <Route path="talent-radar" element={<Navigate to="/eleve/parcours-intelligent?tab=analysis" replace />} />
              <Route path="orientation-simulator" element={<Navigate to="/eleve/parcours-intelligent?tab=orientation" replace />} />
              <Route path="simulations" element={<Navigate to="/eleve/guide" replace />} />
              <Route path="simulations-hub" element={<Navigate to="/eleve/guide" replace />} />
              <Route path="competences" element={<Navigate to="/eleve/profil?tab=competences" replace />} />
              <Route path="tests" element={<Navigate to="/eleve/guide" replace />} />

              {/* Routes d'exécution & rapports conservées */}
              <Route path="simulations/:moduleId/resultats" element={<SimulationResultsPage />} />
              <Route path="tests/:id/instructions" element={<TestInstructionsPage />} />
              <Route path="tests/:id/candidat" element={<CandidateInfoPage />} />
              <Route path="tests/:id/informations-candidat" element={<CandidateInfoPage />} />
              <Route path="resultats" element={<StudentResultsPage />} />
              <Route path="tests/:id/resultats" element={<StudentResultsPage />} />
            </Route>

            {/* Espace Commission / Évaluations Réelles & Recrutement */}
            <Route
              path="/commission"
              element={
                <RequireAuth allowedRoles={['COMMISSION', 'ADMIN']}>
                  <AdminLayout />
                </RequireAuth>
              }
            >
              <Route index element={<Navigate to="/commission/dashboard" replace />} />
              <Route path="dashboard" element={<CommissionDashboardPage />} />
            </Route>

            {/* Espace Administrateur / Commandement */}
            <Route
              path="/admin"
              element={
                <RequireAuth allowedRoles={['ADMIN']}>
                  <AdminLayout />
                </RequireAuth>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="commissions" element={<CommissionsRecruitmentPage />} />
              <Route path="ateliers" element={<WorkshopsManagementPage />} />
              <Route path="ateliers/supervision" element={<WorkshopSupervisionPage />} />
              <Route path="ateliers/analytics" element={<WorkshopsAnalyticsPage />} />
              <Route path="ateliers/:id" element={<WorkshopDetailsPage />} />
              <Route path="ateliers/evaluations/:assignmentId" element={<WorkshopEvaluationSheetPage />} />
              <Route path="eleves" element={<StudentsManagementPage />} />
              <Route path="promotions" element={<PromotionsManagementPage />} />
              <Route path="specialites" element={<SpecialtiesManagementPage />} />
              <Route path="eligibilite" element={<EligibilityRulesPage />} />
              <Route path="tests" element={<TestsManagementPage />} />
              <Route path="questions" element={<QuestionBankPage />} />
              <Route path="resultats" element={<StudentResultsAdminPage />} />
              <Route path="comparaison" element={<ProfileComparisonPage />} />
              <Route path="rapports" element={<ReportsExportPage />} />
              <Route path="parametres" element={<AdminSettingsPage />} />
            </Route>

            {/* 404 Attrape-tout */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
