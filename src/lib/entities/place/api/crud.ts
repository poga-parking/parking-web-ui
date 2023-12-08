import type { FreePlacesResponse } from "$lib/entities/place/model/FreePlacesResponse";
import { FREE_URL } from "$lib/shared/external/Url";

export async function getFreePlaces(): Promise<FreePlacesResponse> {
	try {
		return await getFreePlacesRequest();
	} catch (error) {
		console.error("Error getting stats for user: ", error);
		return {
			places: [""],
			numberOfFreePlaces: 0
		};
	}
}

async function getFreePlacesRequest(): Promise<FreePlacesResponse> {
	return fetch(FREE_URL, {
		method: "GET",
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	})
		.then((response) => response.json())
		.then((json) => json as FreePlacesResponse);
}
