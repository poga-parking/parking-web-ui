import type { User } from "../model/User";
import type { UserAuthState } from "$lib/shared/auth/AuthStore";

export async function addUser($authStore: UserAuthState) {
	const newUser: User = {
		id: $authStore.currentUser.uid,
		email: $authStore.currentUser.email,
	};
	try {
        await createUserRequest(newUser)
	} catch (error) {
		console.error("Error adding user: ", error);
	}
}

async function createUserRequest(user: User) {
    fetch("https://api.pogaparking.ru/signup", {
        method: "POST",
        body: JSON.stringify({
            id: user.id,
            email: user.email
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
            .then(response => response.json())
            .then(json => console.log(json))
}
