<script lang="ts">
	import type { Stats } from "$lib/entities/stats/model/Stats";
	import { Button, Loader, Modal, Stack, Text } from "@svelteuidev/core";
	import { unbookPlaceByBookId } from "$lib/entities/unbook/api/crud";
	import { getStatsByUser } from "$lib/entities/stats/api/crud";
	import { authStore } from "$lib/shared/auth/AuthStore";
	import { formatTimestamp } from "$lib/shared/utils/Time.js";

	export let statsList: Stats[];
	export let selectedStats: Stats | null;
	let loading = false;

	function handleClose(save = false) {
		if (save && selectedStats) {
			loading = true;
			unbookPlaceByBookId(selectedStats.bookId)
				.then((status) => {
					if (!status) {
						alert(
							"Something went wrong, your book was not unbooked, please call to help center to finish booking"
						);
						console.error(status);
					}
				})
				.then(() => {
					getStatsByUser($authStore).then((receivedStatsList) => {
						statsList = receivedStatsList;
						loading = false;
						selectedStats = null;
					});
				});
		} else {
			selectedStats = null;
		}
	}
</script>

<Modal centered opened={selectedStats} withCloseButton on:close={() => handleClose()} size="xl">
	{#if selectedStats && !loading}
		<Stack spacing={24} align="stretch">
			<Text weight="bold">
				Identifier: {selectedStats.bookId}
			</Text>
			<Text weight="bold">
				Place #: {selectedStats.placeNumber}
			</Text>
			<Text weight="bold">
				Arrival: {formatTimestamp(selectedStats.arrivalDate)}
			</Text>
			<Text weight="bold">
				{#if selectedStats.departureDate}
					Departure: {formatTimestamp(selectedStats.departureDate)}
				{:else}
					Departure: Still active
				{/if}
			</Text>
			<Text weight="bold">
				Car brand: {selectedStats.carBrand}
			</Text>
			<Text weight="bold">
				Car plate: {selectedStats.carPlate}
			</Text>
			<Text weight="bold">
				{#if selectedStats.moneyAmount}
					Total cost: {selectedStats.moneyAmount}
				{:else}
					Total cost: Still active
				{/if}
			</Text>
			{#if !selectedStats.departureDate}
				<Button
					on:click={() => handleClose(true)}
					type="submit"
					variant="filled"
					color="green"
					size="md"
					ripple
				>
					Leave place
				</Button>
			{/if}
		</Stack>
	{:else if loading}
		<div id="loader">
			<Loader size="xl" variant="dots" />
		</div>
	{/if}
</Modal>

<style>
	#loader {
		height: 80vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
