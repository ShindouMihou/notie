<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let show: boolean
    const dispatcher = createEventDispatcher()
</script>

{#if show}
    <div class="fixed z-30 animate-in fade-in duration-300 transition ease-in-out bottom-0 left-0 select-none">
        <button class="min-h-screen bg-black bg-opacity-40 w-screen" on:click={() => dispatcher('hide')}></button>
        <div class="min-h-fit bg-[#2b2b2b] bg-opacity-90 shadow backdrop-blur border-t border-l border-r border-[#3a3a3a] border-opacity-30 p-12 pt-12 rounded-t-xl fixed w-screen bottom-0 left-0 animate-in slide-in-from-bottom transition ease-in-out">
            <div class="flex flex-col" id="modal-content">
                <h1 class="font-semibold text-3xl lowercase">Notie<span class="text-blue-400">.</span></h1>
                <slot/>
            </div>
        </div>
    </div>
{/if}