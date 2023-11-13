import prisma from '@/lib/prismadb';
import { EmailAddressJSON } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// POST /api/users

const userSchema = z.object({
	clerkId: z.string(),
	name: z.string(),
	email: z.string(),
	image: z.string(),
});

export const createUser = async (body: {
	clerkId: string;
	name: string;
	email: string;
	image: string;
}) => {
	const validation = userSchema.safeParse(body);

	if (!validation.success)
		return NextResponse.json(validation.error.errors, { status: 400 });

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
