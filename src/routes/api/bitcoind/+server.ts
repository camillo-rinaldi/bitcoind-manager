import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PASSWORD, USER, RPC_SERVER } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const headers = {
		'Content-Type': 'text/plain',
		// @ts-ignore
		Authorization: `Basic ${Buffer.from(`${USER}:${PASSWORD}`).toString('base64')}`
	};

	const body = await request.json();

	const rpcResponse = await fetch(RPC_SERVER, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(body)
	});

	const data = await rpcResponse.json();

	return json(data);
};
