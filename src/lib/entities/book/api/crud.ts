import type { BookPlaceRequest } from "$lib/entities/book/model/BookPlaceRequest";
import type { BookPlaceResponse } from "$lib/entities/book/model/BookPlaceResponse";
import { BOOK_URL } from "$lib/shared/external/Url";

export async function bookPlace(bookPlaceRequest: BookPlaceRequest): Promise<BookPlaceResponse> {
	try {
		return await createBookPlaceRequest(bookPlaceRequest);
	} catch (error) {
		console.error("Error getting stats for user: ", error);
		return {
			bookId: 0
		};
	}
}

async function createBookPlaceRequest(
	bookPlaceRequest: BookPlaceRequest
): Promise<BookPlaceResponse> {
	return fetch(BOOK_URL, {
		method: "POST",
		body: JSON.stringify(bookPlaceRequest),
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	})
		.then((response) => response.json())
		.then((json) => json as BookPlaceResponse);
}
