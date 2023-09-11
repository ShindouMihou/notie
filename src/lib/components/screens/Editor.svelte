<script lang="ts">
    import {
        Archive, ArchiveRestore,
        ChevronLeft, Pin, PinOff,
    } from "@steeze-ui/lucide-icons";
    import Layout from "$lib/components/layouts/Layout.svelte";
    import {Icon} from "@steeze-ui/svelte-icon";
    import type {Note} from "$lib/notes";
    import {archived, lastNote, notes, pinned} from "$lib/states";
    import {Preferences} from "@capacitor/preferences";

    import {slide} from "svelte/transition"

    import { format } from 'timeago.js'
    import {onDestroy, onMount} from "svelte";
    import {Toast} from "@capacitor/toast";
    import {Haptics} from "@capacitor/haptics";

    export let note: Note = {
        id: $lastNote + 1,
        title: '',
        contents: '',
        created_at: new Date(),
        updated_at: new Date()
    }

    async function save() {
        note.updated_at = new Date()
        await Preferences.set({ key: 'notes.' + note.id, value: JSON.stringify(note) })
        if ($notes.find(value => value === note.id) == null) {
            $notes = [note.id, ...$notes]
            $lastNote = $lastNote + 1
            console.info($lastNote, $notes)
        }
    }

    async function back() {
        await save()
        setTimeout(go_back, 250)
    }

    $: isArchived = $archived.find((value) => value === note.id) != undefined
    $: isPinned = $pinned.find((value) => value === note.id) != undefined

    let lastEdited = format(note.updated_at)

    let lastEditedInterval: NodeJS.Timeout
    let saveInterval: NodeJS.Timeout

    onMount(async () => {
        await save()

        lastEditedInterval = setInterval(async () => {
            lastEdited = format(note.updated_at)
        }, 10_000)

        saveInterval = setInterval(save, 2_000)
    })

    onDestroy(() => {
        clearInterval(lastEditedInterval)
        clearInterval(saveInterval)
    })

    function go_back() {
        document.getElementById('go_back')?.click()
    }

    async function archive() {
        await Haptics.impact()
        if (!isArchived) {
            $archived = [note.id, ...$archived]

            if (isPinned) {
                $pinned = $pinned.filter(value => value !== note.id)
                await Toast.show({ text: "Archived and unpinned note." })
            } else {
                await Toast.show({ text: "Archived note." })
            }

            console.info('archived', $archived)
            setTimeout(go_back, 250)
        } else {
            $archived = $archived.filter(value => value !== note.id)
            await Toast.show({ text: "Unarchived note." })
            console.info('unarchived', $archived)
        }
    }

    async function pin() {
        await Haptics.impact()
        if (!isPinned) {
            $pinned = [note.id, ...$pinned]

            if (isArchived) {
                $archived = $archived.filter(value => value !== note.id)
                await Toast.show({ text: "Pinned and unarchived note." })
            } else {
                await Toast.show({ text: "Pinned note." })
            }

            console.info('pinned', $pinned)
        } else {
            $pinned = $pinned.filter(value => value !== note.id)
            await Toast.show({ text: "Unpinned note." })
            console.info('unpinned', $pinned)
        }
    }
</script>

<Layout>
    <div class="py-2 flex flex-row justify-between items-center" slot="header">
        <a href="/" id="go_back" class="hidden"><p>.</p></a>
        <div class="flex flex-row gap-6 items-center pr-4">
            <button on:click={back}>
                <Icon src={ChevronLeft} class="w-6 text-[#9F8E7E]"/>
            </button>
        </div>
        <div class="flex flex-row gap-6 items-center pr-2">
            <button on:click={pin}>
                {#if isPinned}
                    <div in:slide out:slide><Icon src={PinOff} class="w-6 text-[#9F8E7E]"/></div>
                {:else}
                    <div in:slide out:slide><Icon src={Pin} class="w-6 text-[#9F8E7E]"/></div>
                {/if}
            </button>
            <button on:click={archive}>
                {#if isArchived}
                    <div in:slide out:slide><Icon src={ArchiveRestore} class="w-6 text-[#9F8E7E]"/></div>
                {:else}
                    <div in:slide out:slide><Icon src={Archive} class="w-6 text-[#9F8E7E]"/></div>
                {/if}
            </button>
        </div>
    </div>
    <div slot="content" class="p-4">
        <input type="text"
               class="font-semibold text-4xl placeholder-[#3a3a3a] bg-transparent outline-none w-full"
               placeholder="Title"
               bind:value={note.title}
        />
        <p class="text-[#3a3a3a] font-light text-sm pb-4">Last edited {lastEdited}</p>
        <textarea
                class="font-light text-lg bg-transparent outline-none resize-none w-full min-h-screen"
                draggable="false"
                placeholder="Whatever."
                bind:value={note.contents}
        />
    </div>
</Layout>