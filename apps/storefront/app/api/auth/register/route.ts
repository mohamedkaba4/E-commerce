import { prismaAuth } from '@/lib/prisma-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // The database call is safely INSIDE the function.
    // It will not run during 'next build' unless an actual 
    // request is hitting this endpoint.
    const user = await prismaAuth.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
