<script lang="ts">
	import { Button, Header, Loader, Paper, Text } from "@svelteuidev/core";
	import HeaderButton from "$lib/pages/home/ui/HeaderButton.svelte";
	import {
		authPagePath,
		aboutPagePath,
		homePagePath,
		statsPagePath
	} from "$lib/shared/path/model/Paths.js";
	import { authHandlers, authStore } from "$lib/shared/auth/AuthStore";
	import { onMount } from "svelte";
	import { setAuthStateHandler } from "$lib/shared/auth/AuthStateHandler";
	import { goto } from "$app/navigation";
	import { AUTH_LOADING_TIMEOUT_MS } from "$lib/shared/constants/model/Constants";

	let isAuthLoading = true;

	onMount(() => {
		setTimeout(() => {
			isAuthLoading = false;
		}, AUTH_LOADING_TIMEOUT_MS);
		setAuthStateHandler();
	});

	function handleAuthClick() {
		if ($authStore.loggedIn) {
			authHandlers.logout();
		}
		goto(authPagePath);
	}
</script>

<Header height="100%">
	<Paper shadow="sm">
		<nav>
			<HeaderButton href={aboutPagePath} text="About" />
			<HeaderButton href={homePagePath} text="Home" />
			<HeaderButton href={statsPagePath} text="Stats" />
			<Button
				on:click={handleAuthClick}
				disabled={!$authStore.loggedIn && isAuthLoading}
				size={54}
				variant="outline"
				ripple
				color="gray"
				override={{ width: 200 }}
			>
				{#if $authStore.loggedIn || !isAuthLoading}
					<Text size={24} weight="bold" color="blue">
						{$authStore.loggedIn ? "Log out" : "Log in"}
					</Text>
				{:else}
					<Loader variant="dots" />
				{/if}
			</Button>
		</nav>
	</Paper>
</Header>

<style>
	nav {
		display: flex;
		justify-content: space-around;
		flex-flow: row wrap;
	}
</style>
