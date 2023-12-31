import { authStore } from "$lib/shared/auth/AuthStore";
import { auth } from "$lib/shared/FirebaseClient";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import type firebase from "firebase/compat";

export function setAuthStateHandler(): firebase.Unsubscribe {
	return auth.onAuthStateChanged((user) => {
		authStore.update((current) => {
			if (user) {
				return { ...current, isLoading: false, loggedIn: true, currentUser: user };
			} else {
				return { ...current, isLoading: false, loggedIn: false, currentUser: null };
			}
		});
	});
}
