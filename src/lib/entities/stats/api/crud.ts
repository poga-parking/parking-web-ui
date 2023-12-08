import { STATISTICS_UID_URL } from "$lib/shared/external/Url";
import type { Stats } from "$lib/entities/stats/model/Stats";
import type { UserAuthState } from "$lib/shared/auth/AuthStore";

export async function getStatsByUser($authStore: UserAuthState): Promise<Array<Stats>> {
	try {
		return await getStatsRequest($authStore.currentUser.uid);
	} catch (error) {
		console.error("Error getting stats for user: ", error);
		return [];
	}
}

async function getStatsRequest(uid: string | undefined): Promise<Array<Stats>> {
	const queryParams = new URLSearchParams({
		bookedNow: "false"
	});
	return fetch(`${STATISTICS_UID_URL}${uid}?${queryParams}`, {
		method: "GET",
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	})
		.then((response) => response.json())
		.then((json) => json as Array<Stats>);
}
