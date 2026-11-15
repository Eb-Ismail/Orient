// ==============================================================================
// ORIENT-GR - Utilitaires d'authentification et de sécurité JWT
// Hachage de mots de passe, signature et vérification des jetons
// ==============================================================================

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_orient_gr_gendarmerie_key_2026_jwt_token_secure';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Hache un mot de passe avec un sel bcrypt
 */
export async function hashPassword(plainPassword) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainPassword, salt);
}

/**
 * Compare un mot de passe en clair avec son hash bcrypt
 */
export async function comparePassword(plainPassword, hashedPassword) {
  if (!plainPassword || !hashedPassword) {
    return false;
  }
  return bcrypt.compare(plainPassword, hashedPassword);
}

/**
 * Génère un jeton JWT signé avec les informations d'identité
 */
export function signToken(user) {
  const payload = {
    sub: user.UtilisateurId,
    id: user.UtilisateurId,
    UtilisateurId: user.UtilisateurId,
    matricule: user.Matricule,
    email: user.Email,
    nom: user.Nom,
    prenom: user.Prenom,
    role: user.Role,
    promotionId: user.PromotionId
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Valide un jeton JWT
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

/**
 * Extrait le jeton Bearer depuis l'en-tête Authorization
 */
export function extractBearerToken(authorizationHeader) {
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return null;
  }
  return authorizationHeader.substring(7).trim();
}
