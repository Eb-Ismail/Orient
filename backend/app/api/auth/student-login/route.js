import { NextResponse } from 'next/server';
import { POST as loginPost, OPTIONS as loginOptions } from '../login/route.js';

export async function OPTIONS() {
  return loginOptions();
}

export async function POST(request) {
  return loginPost(request);
}

