<script lang="ts">
	import { Button, Modal, Stack, Text, TextInput } from "@svelteuidev/core";
	import { bookPlace } from "$lib/entities/book/api/crud";
	import { authStore } from "$lib/shared/auth/AuthStore";
	import { goto } from "$app/navigation";
	import { statsPagePath } from "$lib/shared/path/model/Paths";
	import type { BookPlaceResponse } from "$lib/entities/book/model/BookPlaceResponse";

	export let selectedPlace: string;
	export let opened: boolean;

	let carBrand: string = "";
	let carPlate: string = "";

	function handleClose(save = false) {
		if (save) {
			if (!carBrand || !carPlate) {
				return;
			}
			bookPlace({
				carBrand: carBrand,
				carPlate: carPlate,
				uid: $authStore.currentUser.uid,
				placeNumber: selectedPlace
			}).then((response: BookPlaceResponse) => {
				console.log(response);
				goto(statsPagePath);
			});
		} else {
			selectedPlace = "";
			carBrand = "";
			carPlate = "";
			opened = false;
		}
	}
</script>

<Modal centered {opened} withCloseButton on:close={() => handleClose()} size="xl">
	<Stack spacing={24} align="stretch">
		<Text weight="bold">
			Selected place: {selectedPlace}
		</Text>
		<TextInput placeholder="Enter car brand" label="Car Brand" required bind:value={carBrand} />
		<TextInput placeholder="Enter car plate" label="Car Plate" required bind:value={carPlate} />
		<Button
			on:click={() => handleClose(true)}
			type="submit"
			variant="filled"
			color="green"
			size="md"
			ripple
		>
			Book
		</Button>
	</Stack>
</Modal>
