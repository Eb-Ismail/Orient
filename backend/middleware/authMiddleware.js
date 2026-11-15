// ==============================================================================
// ORIENT-GR - Middleware d'authentification et de contrôle d'accès RBAC
// Protection des routes d'API Next.js App Router
// ==============================================================================

import { NextResponse } from 'next/server';
import { extractBearerToken, verifyToken } from '../lib/auth.js';
import { coreRepository } from '../repositories/coreRepository.js';

/**
 * Valide l'authentification et le rôle de l'utilisateur pour une requête API
 * @param {Request} request 
 * @param {Array<string>} requiredRoles Rôles autorisés (ex: ['ADMIN'] ou ['ADMIN', 'ELEVE'])
 * @returns {Promise<{ user: object | null, response: NextResponse | null }>}
 */
export async function authenticateRequest(request, requiredRoles = []) {
  const authHeader = request.headers.get('authorization');
  const token = extractBearerToken(authHeader);

  if (!token) {
    return {
      user: null,
      response: NextResponse.json(
        { error: "Authentification requise. Jeton d'accès absent.", code: 'UNAUTHORIZED' },
        { status: 401, headers: corsHeaders() }
      )
    };
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return {
      user: null,
      response: NextResponse.json(
        { error: 'Session invalide ou expirée. Veuillez vous reconnecter.', code: 'INVALID_TOKEN' },
        { status: 401, headers: corsHeaders() }
      )
    };
  }

  // Vérifier si l'utilisateur existe toujours (SQL Server ou fallback mock)
  const user = await coreRepository.findActiveUserById(decoded.id);
  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        { error: 'Utilisateur introuvable ou compte désactivé.', code: 'USER_NOT_FOUND' },
        { status: 403, headers: corsHeaders() }
      )
    };
  }

  // Rejet catégorique du rôle obsolète INSTRUCTEUR
  if (user.Role === 'INSTRUCTEUR' || decoded.role === 'INSTRUCTEUR') {
    return {
      user: null,
      response: NextResponse.json(
        { error: "Le rôle Instructeur n'est plus autorisé sur cette plateforme.", code: 'ROLE_DEPRECATED' },
        { status: 403, headers: corsHeaders() }
      )
    };
  }

  // Vérification RBAC
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.Role)) {
    return {
      user: null,
      response: NextResponse.json(
        {
          error: "Accès interdit. Vos habilitations ne permettent pas d'accéder à cette ressource.",
          code: 'FORBIDDEN',
          requiredRoles,
          currentRole: user.Role
        },
        { status: 403, headers: corsHeaders() }
      )
    };
  }

  return { user, response: null };
}

/**
 * En-têtes CORS standards pour les routes Next.js
 */
export function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };
}
