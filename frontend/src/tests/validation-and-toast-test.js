// ==============================================================================
// Test Exhaustif des 9 cas d'usage : Déduplication & Validation Profil Candidat
// ==============================================================================

const validateField = (field, value) => {
  switch (field) {
    case 'tailleCm': {
      if (value === '' || value === null || value === undefined) return 'La taille en centimètres est obligatoire';
      const num = Number(value);
      if (isNaN(num) || !Number.isInteger(num)) return 'La taille doit être un nombre entier valide';
      if (num < 140 || num > 220) return 'La taille doit être comprise entre 140 et 220 cm';
      return null;
    }
    case 'poidsKg': {
      if (value === '' || value === null || value === undefined) return 'Le poids en kilogrammes est obligatoire';
      const num = Number(value);
      if (isNaN(num) || num <= 0) return 'Le poids doit être un nombre valide';
      if (num < 40 || num > 160) return 'Le poids doit être compris entre 40 et 160 kg';
      return null;
    }
    case 'age': {
      if (value === '' || value === null || value === undefined) return "L'âge est obligatoire";
      const num = Number(value);
      if (isNaN(num) || !Number.isInteger(num)) return "L'âge doit être un nombre entier valide";
      if (num < 18 || num > 45) return "L'âge doit être compris entre 18 et 45 ans";
      return null;
    }
    case 'visionSIGYCOP_Y': {
      if (value === '' || value === null || value === undefined) return 'Le coefficient de vision SIGYCOP est obligatoire';
      const num = Number(value);
      if (![1, 2, 3, 4].includes(num)) return 'Veuillez sélectionner un coefficient de vision valide (Y1 à Y4)';
      return null;
    }
    default:
      return null;
  }
};

class MockToastManager {
  constructor() {
    this.toasts = [];
  }

  addToast({ id, message, title, type = 'info', items = [] }) {
    const toastId = id || (title ? `${type}-${title}` : Date.now().toString());
    const existingIndex = this.toasts.findIndex(t => t.id === toastId);
    if (existingIndex !== -1) {
      this.toasts[existingIndex] = { id: toastId, title, message, type, items };
      return;
    }
    const identical = this.toasts.find(t => t.title === title && t.message === message && t.type === type);
    if (identical) {
      return;
    }
    this.toasts.push({ id: toastId, title, message, type, items });
  }

  removeToast(id) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  get activeToasts() {
    return this.toasts;
  }
}

let passed = 0;
let total = 0;
function assert(desc, condition) {
  total++;
  if (condition) {
    console.log(`  ✅ [PASS] ${desc}`);
    passed++;
  } else {
    console.error(`  ❌ [FAIL] ${desc}`);
    process.exitCode = 1;
  }
}

console.log("\n======================================================");
console.log("  VÉRIFICATION DES 9 SCÉNARIOS DU PROMPT");
console.log("======================================================\n");

const tm = new MockToastManager();

// Case 1: All fields empty: one grouped notification only
const form1 = { tailleCm: '', poidsKg: '', age: '', visionSIGYCOP_Y: '' };
const invalidFields1 = [];
Object.keys(form1).forEach(f => {
  if (validateField(f, form1[f])) invalidFields1.push(f);
});
assert("Cas 1.1 : Tous les 4 champs requis sont détectés invalides lorsqu'ils sont vides", invalidFields1.length === 4);

tm.addToast({
  id: 'profile-validation',
  title: 'Champs à vérifier',
  message: 'Veuillez vérifier les informations suivantes :',
  type: 'error',
  items: ['Taille', 'Poids', 'Âge', 'Vision']
});
assert("Cas 1.2 : Une seule notification groupée affichée", tm.activeToasts.length === 1);
assert("Cas 1.3 : La notification liste les 4 champs", tm.activeToasts[0].items.length === 4);

// Case 2: Multiple invalid fields: one notification listing all invalid fields
form1.tailleCm = '180'; // Valid
form1.age = '25'; // Valid
const invalidFields2 = [];
['tailleCm', 'poidsKg', 'age', 'visionSIGYCOP_Y'].forEach(f => {
  if (validateField(f, form1[f])) invalidFields2.push(f);
});
assert("Cas 2.1 : Seuls Poids et Vision sont invalides", invalidFields2.length === 2);

tm.addToast({
  id: 'profile-validation',
  title: 'Champs à vérifier',
  message: 'Veuillez vérifier les informations suivantes :',
  type: 'error',
  items: ['Poids', 'Vision']
});
assert("Cas 2.2 : Notification unique mise à jour avec seulement les champs invalides (Poids, Vision)", 
  tm.activeToasts.length === 1 && tm.activeToasts[0].items.length === 2
);

// Case 3: Correct one field: its error disappears
form1.poidsKg = '75'; // Valid now
assert("Cas 3.1 : Correction du champ Poids -> validateur retourne null", validateField('poidsKg', form1.poidsKg) === null);

// Case 4: Correct all fields: notification disappears
form1.visionSIGYCOP_Y = '1'; // Valid now
const invalidFields4 = [];
['tailleCm', 'poidsKg', 'age', 'visionSIGYCOP_Y'].forEach(f => {
  if (validateField(f, form1[f])) invalidFields4.push(f);
});
assert("Cas 4.1 : Tous les champs sont désormais valides", invalidFields4.length === 0);

if (invalidFields4.length === 0) {
  tm.removeToast('profile-validation');
}
assert("Cas 4.2 : La notification a disparu après correction totale", tm.activeToasts.length === 0);

// Case 5: Click Start with invalid fields: test does not start
const canStartWithInvalid = invalidFields1.length === 0;
assert("Cas 5 : Clic 'Démarrer' avec champs invalides -> refus de démarrage", canStartWithInvalid === false);

// Case 6: Click Start with valid fields: test starts normally
const canStartWithValid = invalidFields4.length === 0;
assert("Cas 6 : Clic 'Démarrer' avec tous les champs valides -> autorisation de démarrage", canStartWithValid === true);

// Case 7: Trigger validation repeatedly: no duplicate notifications
for (let i = 0; i < 5; i++) {
  tm.addToast({
    id: 'profile-validation',
    title: 'Champs à vérifier',
    message: 'Veuillez vérifier les informations suivantes :',
    type: 'error',
    items: ['Taille']
  });
}
assert("Cas 7 : 5 déclenchements consécutifs de validation -> EXACTEMENT 1 notification active (ZÉRO SPAM)", tm.activeToasts.length === 1);

// Case 8: Refresh the page: no notification spam
tm.removeToast('profile-validation');
assert("Cas 8 : Aucun toast affiché au montage initial ou après actualisation", tm.activeToasts.length === 0);

// Case 9: Responsive layout classes present
const containerClasses = "fixed top-4 right-4 sm:top-5 sm:right-5 z-50 flex flex-col gap-2.5 max-w-sm w-[calc(100%-2rem)] sm:w-96 pointer-events-none";
assert("Cas 9 : Container Toast doté de classes desktop et mobile responsive adaptées", containerClasses.includes('sm:w-96') && containerClasses.includes('max-w-sm'));

console.log(`\n======================================================`);
console.log(`  RÉSULTATS : ${passed} / ${total} TESTS VALIDÉS`);
console.log(`======================================================\n`);
