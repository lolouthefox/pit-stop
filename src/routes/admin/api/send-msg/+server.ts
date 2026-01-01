import { ADMIN_PASSWORD } from "$env/static/private";
import { sendMessage } from "$lib/server/tg";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ cookies }) => {
    const passwordCookie = cookies.get('password');
    if (passwordCookie !== ADMIN_PASSWORD) {
        cookies.delete('password', { path: '/' });
        return new Response('Unauthorized', { status: 401 });
    }
    sendMessage("You can close and open the kitchen from here.", null);
    return new Response('Message sent', { status: 200 });
}
