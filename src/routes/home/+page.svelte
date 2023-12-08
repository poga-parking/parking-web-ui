<script lang="ts">
	import { onMount } from "svelte";
	import { authPagePath } from "$lib/shared/path/model/Paths";
	import { goto } from "$app/navigation";
	import { Button, Loader, Stack, Text } from "@svelteuidev/core";
	import { AUTH_LOADING_TIMEOUT_MS } from "$lib/shared/constants/model/Constants";
	import { authStore } from "$lib/shared/auth/AuthStore";
	import { getFreePlaces } from "$lib/entities/place/api/crud";
	import type { FreePlacesResponse } from "$lib/entities/place/model/FreePlacesResponse";
	import CarInpuModal from "$lib/pages/home/ui/CarInpuModal.svelte";
	import { getPriceByUser } from "$lib/entities/price/api/crud";

	let numberOfFreePlaces = 0;
	let freePlaces: string[] = [""];
	let placesLoaded = false;

	let price = 0;
	let priceLoaded = false;

	let openModal = false;
	let selectedPlace = "";

	const handleModal = (place: string) => {
		selectedPlace = place;
		openModal = true;
	};

	onMount(() => {
		setTimeout(() => {
			if (!$authStore.loggedIn) {
				goto(authPagePath);
			} else {
				getFreePlaces().then((freePlacesResponse: FreePlacesResponse) => {
					numberOfFreePlaces = freePlacesResponse.numberOfFreePlaces;
					freePlaces = freePlacesResponse.places;
					placesLoaded = true;
				});
				getPriceByUser($authStore).then((receivedPrice: number) => {
					price = receivedPrice;
					priceLoaded = true;
				});
			}
		}, AUTH_LOADING_TIMEOUT_MS);
	});
</script>

<main>
	{#if $authStore.loggedIn && placesLoaded && priceLoaded}
		<Stack spacing={24} align="stretch">
			<CarInpuModal bind:selectedPlace bind:opened={openModal} />
			<div class="text">
				<Text size={36} align="center">Number of free places: {numberOfFreePlaces}</Text>
			</div>
			<div class="text">
				<Text size={24} align="center">Price for place per hour: {price} ₽</Text>
			</div>
			{#each freePlaces as place}
				<Button ripple size="xl" on:click={() => handleModal(place)}>
					{place}
				</Button>
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
	.text {
		flex: 1;
		margin-bottom: 16px;
	}

	#loader {
		height: 80vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
