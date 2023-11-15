import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// User actions

export const POST = async (req: Request) => {
	// You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
	const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

	if (!WEBHOOK_SECRET) {
		throw new Error(
			'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
		);
	}

	// Get the headers
	const headerPayload = headers();
	const svix_id = headerPayload.get('svix-id');
	const svix_timestamp = headerPayload.get('svix-timestamp');
	const svix_signature = headerPayload.get('svix-signature');

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response('Error occured -- no svix headers', {
			status: 400,
		});
	}

	// Get the body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	// Create a new SVIX instance with your secret.
	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	// Verify the payload with the headers
	try {
		evt = wh.verify(body, {
			'svix-id': svix_id,
			'svix-timestamp': svix_timestamp,
			'svix-signature': svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error('Error verifying webhook:', err);
		return new Response('Error occured', {
			status: 400,
		});
	}

	const eventType = evt.type;

	if (eventType === 'user.created') {
		const { id, first_name, last_name, email_addresses, image_url } =
			evt.data || {};

		try {
			await fetch('https://collector-bookstore.vercel.app/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					clerkId: id,
					name: `${first_name} ${last_name}`,
					email: email_addresses[0].email_address,
					image: image_url,
				}),
			});

			return NextResponse.json(
				{
					message: `User created ${JSON.stringify({
						clerkId: id,
						name: `${first_name} ${last_name}`,
						email: email_addresses[0].email_address,
						image: image_url,
					})}`,
				},
				{ status: 201 }
			);
		} catch (err) {
			return NextResponse.json(
				{ message: `Internal Server Error ${err}` },
				{ status: 500 }
			);
		}
	}

	// if (eventType === 'user.updated') {
	// 	const { id, username, image_url } = evt.data || {};

	// 	try {
	// 		await updateUser({ userId: id, username: username, image: image_url });

	// 		return NextResponse.json({ message: 'User updated' }, { status: 200 });
	// 	} catch (err) {
	// 		return NextResponse.json(
	// 			{ message: `Internal Server Error ${err}` },
	// 			{ status: 500 }
	// 		);
	// 	}
	// }
	// if (eventType === 'user.deleted') {
	// 	const { id } = evt.data || {};

	// 	try {
	// 		await deleteUser({ userId: id });

	// 		return NextResponse.json({ message: 'User deleted' }, { status: 204 });
	// 	} catch (err) {
	// 		return NextResponse.json(
	// 			{ message: `Internal Server Error ${err}` },
	// 			{ status: 500 }
	// 		);
	// 	}
	// }

	return new Response('', { status: 201 });
};
