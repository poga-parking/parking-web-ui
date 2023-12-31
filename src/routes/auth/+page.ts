// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import type { PageLoad } from "../../../.svelte-kit/types/src/routes/about/$types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const load: PageLoad = async ({ params }) => {
	return {
		title: "Log in",
		content: "Sign in or sing up into the website."
	};
};
