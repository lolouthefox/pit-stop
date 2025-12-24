import { sendStatusMessage } from "$lib/server/kitchenStatus";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
    await sendStatusMessage();
    return json({ success: true });
}