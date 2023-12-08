<script lang="ts">
	import { onMount } from "svelte";
	import { authPagePath } from "$lib/shared/path/model/Paths";
	import { goto } from "$app/navigation";
	import { Button, Group, Loader, Stack, Text } from "@svelteuidev/core";
	import { AUTH_LOADING_TIMEOUT_MS } from "$lib/shared/constants/model/Constants";
	import { authStore } from "$lib/shared/auth/AuthStore";
	import StatsModal from "$lib/pages/stats/ui/StatsModal.svelte";
	import type { Stats } from "$lib/entities/stats/model/Stats";
	import { getStatsByUser } from "$lib/entities/stats/api/crud";
	import { formatTimestamp } from "$lib/shared/utils/Time";

	let selectedStats: Stats | null = null;
	let statsLoaded = false;

	let statsList: Stats[] = [];

	onMount(() => {
		setTimeout(() => {
			if (!$authStore.loggedIn) {
				goto(authPagePath);
			} else {
				getStatsByUser($authStore).then((receivedStatsList) => {
					statsList = receivedStatsList;
					statsLoaded = true;
				});
			}
		}, AUTH_LOADING_TIMEOUT_MS);
	});
</script>

<main>
	{#if $authStore.loggedIn && statsLoaded}
		<Stack spacing={24} align="stretch">
			<StatsModal bind:selectedStats bind:statsList />
			<div class="text">
				<Text size={36} align="center">Your booking statistics:</Text>
			</div>
			{#each statsList as stats}
				<Group>
					{#if stats.departureDate}
						<Button ripple size="xl" on:click={() => (selectedStats = stats)}>
							{formatTimestamp(stats.arrivalDate)}
						</Button>
						<Text size={32} weight="bold">Finished</Text>
					{:else}
						<Button
							ripple
							size="xl"
							on:click={() => (selectedStats = stats)}
							color="green"
						>
							{formatTimestamp(stats.arrivalDate)}
						</Button>
						<Text size={32} weight="bold">Active</Text>
					{/if}
				</Group>
			{/each}
		</Stack>
	{:else}
		<div id="loader">
			<Loader size="xl" variant="dots" />
		</div>
	{/if}
</main>

<style>
	main {
		height: 100%;
		width: 100%;

		/* center horizontally */
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;

		margin-top: 40px;
	}

	#loader {
		height: 80vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
