// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import type { PageLoad } from "../../../.svelte-kit/types/src/routes/parking/$types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const load: PageLoad = async ({ params }) => {
	return {
		title: "Parking Home",
		content: "Parking Home"
	};
};
