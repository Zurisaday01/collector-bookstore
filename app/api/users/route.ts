import prisma from '@/lib/prismadb';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// POST /api/users

const userSchema = z.object({
	clerkId: z.string(),
	name: z.string(),
	email: z.string(),
	image: z.string(),
});

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
