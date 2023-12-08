<script lang="ts">
	import { Button, Title } from "@svelteuidev/core";
	import { goto } from "$app/navigation";
	import { homePagePath } from "$lib/shared/path/model/Paths";
	import { Text } from "radix-icons-svelte";
</script>

<main>
	<Title order={1} size={52} weight="extrabold">Innopolis University Parking</Title>
	<Text size={24}>Help Center: +7(923)-698-83-45</Text>
	<Button size="lg" ripple on:click={() => goto(homePagePath)}>Book parking place</Button>
</main>

<style>
	main {
		height: 80vh;
		width: 100%;

		gap: 72px;

		/* center horizontally */
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
</style>
