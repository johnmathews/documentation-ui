import { env } from '$env/dynamic/private';

export function getApiBase(): string {
	return env.API_URL || 'http://localhost:8085';
}

export async function proxyGet(path: string): Promise<Response> {
	const res = await fetch(`${getApiBase()}${path}`);
	return new Response(res.body, {
		status: res.status,
		headers: { 'Content-Type': 'application/json' }
	});
}

export async function proxyPost(path: string, body: unknown): Promise<Response> {
	const res = await fetch(`${getApiBase()}${path}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});
	return new Response(res.body, {
		status: res.status,
		headers: { 'Content-Type': 'application/json' }
	});
}
