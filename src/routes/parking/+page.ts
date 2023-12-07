import type {PageLoad} from "../../../.svelte-kit/types/src/routes/parking/$types";

export const load: PageLoad = async ({ params }) => {
	return {
		title: "Some title",
		content: "Some content"
	};
};
