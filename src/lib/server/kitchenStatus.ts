import { sendMessage } from "$lib/server/tg";

let status: 'open' | 'closed' = 'closed';
let sentStatusMessage = false;

export function openKitchen() {
    status = 'open';
}

export function closeKitchen() {
    status = 'closed';
}

export function getKitchenStatus() {
    if (!sentStatusMessage) {
        sendStatusMessage();
        sentStatusMessage = true;
    }
    return status;
}

async function sendStatusMessage() {
    await sendMessage("Server Démarré. N'oubliez pas d'ouvrir la cuisine!");
}
