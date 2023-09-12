<script lang="ts">
    import type {Note} from "$lib/notes";
    import BottomHalfModal from "$lib/components/modals/BottomHalfModal.svelte";
    import { press } from "svelte-gestures"
    import {Icon} from "@steeze-ui/svelte-icon";
    import {Trash} from "@steeze-ui/lucide-icons";
    import {Preferences} from "@capacitor/preferences";
    import {archived, notes, pinned} from "$lib/states";
    import {Toast} from "@capacitor/toast";
    import {Haptics} from "@capacitor/haptics";

    export let note: Note
    let showModal = false

    async function show(_: any) {
        await Haptics.impact()
        showModal = true
    }

    async function del() {
        await Haptics.impact()

        await Preferences.remove({ key: 'notes.' + note.id.toString() })
        $notes = $notes.filter(value => value !== note.id)
        $pinned = $pinned.filter(value => value !== note.id)
        $archived = $archived.filter(value => value !== note.id)

        await Toast.show({ text: "Note deleted" })
        showModal = false
    }
</script>

<style>
    .drag-none {
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;
    }
</style>

<a use:press={{ timeframe: 300, triggerBeforeFinished: true }} on:press={show} href="/notes/{note.id}" class="drag-none flex flex-col gap-2 p-4 rounded-lg shadow select-none border-[#2F2F2F] border bg-[#2F2F2F] bg-opacity-5 w-full h-44 active:opacity-60 transition ease-in-out duration-500">
    <h3 class="font-bold text-white text-lg">{note.title}</h3>
    <p class="line-clamp-3">
        {note.contents}
    </p>
</a>
<BottomHalfModal bind:show={showModal} on:hide={() => showModal = false}>
    <a href="/" id="_refresh" class="hidden"><p></p></a>
    <div class="flex flex-col gap-2 pt-8">
        <button on:click={del} class="flex flex-row gap-3 items-start active:opacity-60 transition ease-in-out duration-500">
            <Icon src={Trash} class="w-6 flex-shrink-none"/>
            <p class="font-light text-lg">Delete</p>
        </button>
    </div>
</BottomHalfModal>