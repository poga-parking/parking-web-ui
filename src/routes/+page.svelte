<script lang="ts">
    import { Button, Title } from "@svelteuidev/core";
    import { goto } from "$app/navigation";
    import {parkingPagePath} from "$lib/shared/path/model/Paths";
</script>

<main>
    <Title order={1} size={52} weight="extrabold">Innopolis University Parking</Title>
    <Button size="lg" ripple on:click={() => goto(parkingPagePath)}>Book parking place</Button>
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

