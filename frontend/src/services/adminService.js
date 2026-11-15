// ==============================================================================
// ORIENT-GR - Service Administratif & Commandement
// Statistiques, gestion des élèves, spécialités, conditions, questions et règles
// ==============================================================================

import api from './api.js';

export const adminService = {
  /**
   * Tableau de bord : Statistiques agrégées et graphiques
   */
  async getDashboardStats(promotionId = null) {
    const params = promotionId ? { promotionId } : {};
    const res = await api.get('/dashboard/stats', { params });
    return res.data;
  },

  /**
   * Liste des élèves
   */
  async getStudents(filters = {}) {
    const res = await api.get('/students', { params: filters });
    return res.data.students;
  },

  /**
   * Création d'un élève
   */
  async createStudent(studentData) {
    const res = await api.post('/students', studentData);
    return res.data;
  },

  async updateStudent(studentId, studentData) {
    const res = await api.put(`/students/${studentId}`, studentData);
    return res.data;
  },

  /**
   * Promotions / Promotions d'élèves
   */
  async getPromotions() {
    const res = await api.get('/promotions');
    return res.data.promotions;
  },

  async createPromotion(promoData) {
    const res = await api.post('/promotions', promoData);
    return res.data;
  },

  /**
   * Spécialités
   */
  async getSpecialties() {
    const res = await api.get('/specialties');
    return res.data;
  },

  async createSpecialty(specData) {
    const res = await api.post('/specialties', specData);
    return res.data;
  },

  async updateSpecialty(specData) {
    const res = await api.put('/specialties', specData);
    return res.data;
  },

  /**
   * Conditions d'éligibilité
   */
  async getConditions(specialiteId = null) {
    const params = specialiteId ? { specialiteId } : {};
    const res = await api.get('/specialties/conditions', { params });
    return res.data.conditions;
  },

  async createCondition(conditionData) {
    const res = await api.post('/specialties/conditions', conditionData);
    return res.data;
  },

  async updateCondition(conditionData) {
    const res = await api.put('/specialties/conditions', conditionData);
    return res.data;
  },

  async deleteCondition(conditionId) {
    const res = await api.delete('/specialties/conditions', { params: { id: conditionId } });
    return res.data;
  },

  /**
   * Banque de questions
   */
  async getQuestions(filters = {}) {
    const res = await api.get('/questions', { params: filters });
    return res.data;
  },

  async getQuestionById(questionId) {
    const res = await api.get(`/questions/${questionId}`);
    return res.data.question;
  },

  async createQuestion(questionData) {
    const res = await api.post('/questions', questionData);
    return res.data;
  },

  async updateQuestion(questionId, questionData) {
    const res = await api.put(`/questions/${questionId}`, questionData);
    return res.data;
  },

  async archiveQuestion(questionId) {
    const res = await api.delete(`/questions/${questionId}`);
    return res.data;
  },

  async validateQuestionBank() {
    const res = await api.get('/questions/validate');
    return res.data;
  },

  /**
   * Tests et protocoles
   */
  async getTests() {
    const res = await api.get('/tests');
    return res.data.tests;
  },

  async createTest(testData) {
    const res = await api.post('/tests', testData);
    return res.data;
  },

  async updateTest(testId, testData) {
    const res = await api.put(`/tests/${testId}`, testData);
    return res.data;
  },

  /**
   * Évaluation des questions subjectives
   */
  async getSubjectiveAnswers(sessionId = null) {
    const params = sessionId ? { sessionId } : {};
    const res = await api.get('/tests/evaluations', { params });
    return res.data.subjectiveAnswers;
  },

  async evaluateSubjectiveAnswer(evalData) {
    const res = await api.post('/tests/evaluations', evalData);
    return res.data;
  },

  /**
   * Journal d'audit et de traçabilité
   */
  async getAuditLogs(action = null, limit = 50) {
    const params = { limit };
    if (action) params.action = action;
    const res = await api.get('/audit', { params });
    return res.data;
  },

  /**
   * Comparaison multicritère de profils
   */
  async compareProfiles(studentIds) {
    const idsParam = Array.isArray(studentIds) ? studentIds.join(',') : studentIds;
    const res = await api.get('/comparison', { params: { ids: idsParam } });
    return res.data.comparison;
  },

  /**
   * Paramètres système
   */
  async getSettings() {
    const res = await api.get('/settings');
    return res.data.settings;
  },

  async updateSettings(settingsData) {
    const res = await api.put('/settings', settingsData);
    return res.data;
  },

  /**
   * Gestion du référentiel des 12 compétences professionnelles
   */
  async getCompetencies() {
    const res = await api.get('/admin/competencies');
    return res.data.competencies;
  },

  async updateCompetency(code, updates) {
    const res = await api.put('/admin/competencies', { code, updates });
    return res.data;
  },

  /**
   * Matrice des poids de spécialités professionnelles
   */
  async getSpecialtyWeights() {
    const res = await api.get('/admin/specialty-weights');
    return res.data.matrix;
  },

  async updateSpecialtyWeights(specialiteCode, data) {
    const res = await api.put('/admin/specialty-weights', { specialiteCode, ...data });
    return res.data;
  },

  /**
   * Configuration des critères d'évaluation du scoring
   */
  async getScoringConfig() {
    const res = await api.get('/admin/scoring-config');
    return res.data.config;
  },

  async updateScoringConfig(config) {
    const res = await api.put('/admin/scoring-config', config);
    return res.data;
  },

  /**
   * Bilans d'orientation et propositions d'affectation
   */
  async getOrientationProposals() {
    const res = await api.get('/admin/orientation-proposals');
    return res.data.summaries;
  },

  async updateOrientationProposal(payload) {
    const res = await api.post('/admin/orientation-proposals', payload);
    return res.data;
  },

  /**
   * Gestion et distribution des 60 tâches de simulation
   */
  async getSimulationTasks() {
    const res = await api.get('/admin/simulations/tasks');
    return res.data;
  },

  async updateSimulationTask(taskData) {
    const res = await api.put('/admin/simulations/tasks', taskData);
    return res.data;
  },

  // Pré-sélection des Talents & Affectation par Spécialité
  async getPreselectionOverview() {
    const res = await api.get('/admin/preselection');
    return res.data;
  },

  async validateAssignment({ studentId, action, specialiteRetenueCode, justification }) {
    const res = await api.post('/admin/preselection/validate', {
      studentId,
      action,
      specialiteRetenueCode,
      justification
    });
    return res.data;
  }
};
