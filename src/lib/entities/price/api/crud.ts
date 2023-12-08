import { PRICE_UID_URL } from "$lib/shared/external/Url";
import type { UserAuthState } from "$lib/shared/auth/AuthStore";

export async function getPriceByUser($authStore: UserAuthState): Promise<number> {
	try {
		console.log($authStore.currentUser.uid);
		return await getPriceRequest($authStore.currentUser.uid);
	} catch (error) {
		console.error("Error getting stats for user: ", error);
		return 15;
	}
}

async function getPriceRequest(uid: string | undefined): Promise<number> {
	return fetch(PRICE_UID_URL + uid, {
		method: "GET"
	})
		.then((response) => response.text())
		.then((priceStr) => parseFloat(priceStr));
}
