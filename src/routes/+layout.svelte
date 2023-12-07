<script>
	import { SvelteUIProvider } from "@svelteuidev/core";
    import ParkingHeader from "$lib/pages/home/ui/ParkingHeader.svelte";
	import { page } from "$app/stores";
	import { base } from "$app/paths";
</script>

<svelte:head>
	<title>{$page.data.title}</title>
	<meta name="description" content={$page.data.content} />
	<meta property="og:url" content={$page.url.toString()} />
	<meta property="og:title" content={$page.data.title} />
	<meta property="og:description" content={$page.data.content} />
	<meta property="og:image" content="{base}/favicon.ico" />
	<meta property="og:image:width" content="968" />
	<meta property="og:image:height" content="504" />
</svelte:head>

<SvelteUIProvider withNormalizeCSS withGlobalStyles>
	<div id="header">
        <ParkingHeader />
	</div>
	<slot />
</SvelteUIProvider>
