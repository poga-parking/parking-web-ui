import { UNBOOK_ID_URL } from "$lib/shared/external/Url";

export async function unbookPlaceByBookId(bookId: number): Promise<boolean> {
	try {
		return await createUnbookPlaceRequest(bookId);
	} catch (error) {
		console.error("Error getting stats for user: ", error);
		return false;
	}
}

async function createUnbookPlaceRequest(bookId: number): Promise<boolean> {
	return fetch(UNBOOK_ID_URL + bookId, {
		method: "POST",
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	})
		.then((response) => response.text())
		.then((statusStr) => JSON.parse(statusStr) as boolean);
}
