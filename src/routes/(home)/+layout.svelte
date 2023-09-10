<script>
    import "../../app.postcss";
    import {Icon} from "@steeze-ui/svelte-icon";
    import {Archive, LayoutGrid, PlusCircle, Rows} from "@steeze-ui/lucide-icons";
    import Layout from "$lib/components/layouts/Layout.svelte";
    import {layout} from "$lib/states";
    import {slide} from "svelte/transition"

    const Layout1 = 'grid grid-cols-2'
    const Layout2 = 'flex flex-row flex-wrap'

    function changeLayout() {
        $layout = $layout === Layout1 ? Layout2 : Layout1
    }
</script>

<Layout>
    <div class="py-2 flex flex-row justify-between items-center select-none" slot="header">
        <h1 class="font-semibold text-3xl lowercase">Notie<span class="text-blue-400">.</span></h1>
        <div class="flex flex-row gap-6 items-center">
            <a href="/archives">
                <Icon src={Archive} class="w-6 text-[#9F8E7E]"/>
            </a>
            <button on:click={changeLayout} class="active:opacity-60 transition ease-in-out duration-500">
                {#if $layout === Layout1}
                    <div in:slide out:slide><Icon src={Rows} class="w-6 text-[#9F8E7E]"/></div>
                {:else}
                    <div in:slide out:slide><Icon src={LayoutGrid} class="w-6 text-[#9F8E7E]"/></div>
                {/if}
            </button>
            <a href="/new">
                <Icon src={PlusCircle} class="w-6 text-[#9F8E7E]"/>
            </a>
        </div>
    </div>
    <div slot="content">
        <slot/>
    </div>
</Layout>