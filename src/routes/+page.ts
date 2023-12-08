import type { PageLoad } from "../../.svelte-kit/types/src/routes/auth/$types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const load: PageLoad = async ({ params }) => {
	return {
		title: "About the project",
		content: "Innopolis University Parking Web UI"
	};
};
