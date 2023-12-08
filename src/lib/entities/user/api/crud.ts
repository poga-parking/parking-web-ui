import type { User } from "../model/User";
import type { UserAuthState } from "$lib/shared/auth/AuthStore";
import { SIGNUP_URL } from "$lib/shared/external/Url";

export async function addUser($authStore: UserAuthState) {
	const newUser: User = {
		id: $authStore.currentUser.uid,
		email: $authStore.currentUser.email
	};
	try {
		await createUserRequest(newUser);
	} catch (error) {
		console.error("Error adding user: ", error);
	}
}

async function createUserRequest(user: User) {
	const json = JSON.stringify({
		uid: user.id,
		email: user.email
	});
	console.log(json);
	fetch(SIGNUP_URL, {
		method: "POST",
		body: json,
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	})
		.then((response) => response.json())
		.then((json) => console.log(json))
		.catch((error) => console.error(error));
}
