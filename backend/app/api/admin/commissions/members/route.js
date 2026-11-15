import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../../middleware/authMiddleware.js';
import { commissionRepository } from '../../../../../repositories/commissionRepository.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const body = await request.json();
    const { action, commissionId, userId, role } = body;
    const adminId = user.UtilisateurId ?? user.id;

    if (!commissionId || !userId) {
      return NextResponse.json({ error: 'Les champs commissionId et userId sont obligatoires.' }, { status: 400, headers: corsHeaders() });
    }

    if (action === 'REMOVE') {
      await commissionRepository.removeMemberFromCommission(parseInt(commissionId, 10), parseInt(userId, 10));
      return NextResponse.json({ success: true, message: 'Membre retiré de la commission.' }, { headers: corsHeaders() });
    }

    const res = await commissionRepository.addMemberToCommission(
      parseInt(commissionId, 10),
      parseInt(userId, 10),
      role || 'EVALUATEUR',
      adminId
    );

    return NextResponse.json({
      success: true,
      message: 'Membre affecté à la commission avec succès.',
      ...res
    }, { headers: corsHeaders() });
  } catch (err) {
    console.error('[API /api/admin/commissions/members] Erreur:', err);
    return NextResponse.json({ error: err.message }, { status: 400, headers: corsHeaders() });
  }
}

