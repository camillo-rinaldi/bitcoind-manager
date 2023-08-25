import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PASSWORD, USER } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const rpcServer = 'http://192.168.0.101:8332';
	const headers = {
		'Content-Type': 'text/plain',
		// @ts-ignore
		Authorization: `Basic ${Buffer.from(`${USER}:${PASSWORD}`).toString('base64')}`
	};

	const body = await request.json();

	console.log('Sending RPC request:', body);

	const rpcResponse = await fetch(rpcServer, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(body)
	});

	const data = await rpcResponse.json();

	return json(data);
};
