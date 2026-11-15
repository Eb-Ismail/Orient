import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../middleware/authMiddleware.js';
import { commissionRepository } from '../../../repositories/commissionRepository.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN', 'COMMISSION']);
  if (response) return response;

  try {
    const userId = user.UtilisateurId ?? user.id;
    const userRole = user.Role ?? user.role;

    let commissions = [];
    if (userRole === 'ADMIN') {
      commissions = await commissionRepository.getAllCommissions();
    } else {
      // Rôle COMMISSION : filtrage strict des commissions autorisées pour ce membre
      commissions = await commissionRepository.getCommissionsForUser(userId);
    }

    return NextResponse.json({
      success: true,
      userRole,
      commissions
    }, { headers: corsHeaders() });
  } catch (err) {
    console.error('[API /api/commissions] Erreur:', err);
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}

