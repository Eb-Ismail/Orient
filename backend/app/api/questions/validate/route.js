import { NextResponse } from 'next/server';
import { authenticateRequest, corsHeaders } from '../../../../middleware/authMiddleware.js';
import { group3Repository } from '../../../../repositories/group3Repository.js';
import { validateQuestionBank } from '../../../../validators/bankValidator.js';

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(request) {
  const { user, response } = await authenticateRequest(request, ['ADMIN']);
  if (response) return response;

  try {
    const questions = await group3Repository.getQuestions(true);
    const result = validateQuestionBank(questions);

    return NextResponse.json({
      status: result.isValid ? 'SUCCESS' : 'FAILED',
      message: result.isValid
        ? 'La banque centrale comporte exactement 140 questions actives conformes à la répartition réglementaire.'
        : 'Des anomalies ont été détectées dans la banque de questions.',
      validation: result
    }, {
      status: result.isValid ? 200 : 422,
      headers: corsHeaders()
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders() });
  }
}
