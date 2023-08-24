import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
export const POST: RequestHandler = async ({ request }) => {
    const rpcServer = "http://192.168.0.101:8332";
    const user = "twin";
    const password = "ish!AWE*&uwerui42@3(87";
    const headers = {
        'Content-Type': 'text/plain',
        // @ts-ignore
        'Authorization': `Basic ${Buffer.from(`${user}:${password}`).toString('base64')}`
    };

   const body = await request.json();

    console.log("Sending RPC request:", body);


    const rpcResponse = await fetch(rpcServer, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    });

    const data = await rpcResponse.json();

   return json(data);
}
