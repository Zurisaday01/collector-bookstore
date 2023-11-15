import prisma from '@/lib/prismadb';
import { NextRequest, NextResponse } from 'next/server';

// POST /api/users
export const POST = async (request: NextRequest) => {
	const body = await request.json();
	const newUser = await prisma.user.create({
		data: {
			clerkId: body.clerkId,
			name: body.name,
			email: body.email,
			image: body.image,
		},
	});

	return NextResponse.json(newUser, { status: 201 });
};
