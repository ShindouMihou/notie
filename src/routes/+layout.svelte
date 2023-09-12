<script>
    import "../app.postcss";
    import {openStores} from "$lib/states";
    import {onMount} from "svelte";
    import {slide,fade} from "svelte/transition"
    import Loading from "$lib/components/screens/Loading.svelte";
    import {StatusBar} from "@capacitor/status-bar";

    let loading = true

    onMount(async () => {
        await StatusBar.setBackgroundColor({ color: '#1E1E1E' })
        await openStores()
        loading = false
    })
</script>

{#if loading}
    <Loading/>
{:else}
    <div in:fade={{delay: 500}} out:slide>
        <slot/>
    </div>
{/if}