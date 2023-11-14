import prisma from '@/lib/prismadb';
import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';

interface Genre {
	name: string;
}

// POST /api/genre

const genreSchema = z.object({
	name: z.string(),
});

export const POST = async (request: NextRequest) => {
	const body = await request.json();

	const newGenre = await prisma.genre.create({
		data: {
			name: body.name,
		},
	});

	return NextResponse.json(newGenre, { status: 201 });
};
