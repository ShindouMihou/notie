<script lang="ts">
    import NoteView from "$lib/components/notes/NoteView.svelte";
    import {archived, layout} from "$lib/states";
    import {getNoteById} from "$lib/notes";
    import {onDestroy, onMount} from "svelte";
    import type {Note} from "$lib/notes";
    import {Icon} from "@steeze-ui/svelte-icon";
    import {ChevronLeft} from "@steeze-ui/lucide-icons";
    import Layout from "$lib/components/layouts/Layout.svelte";
    import {App as CapacitorApp} from "@capacitor/app";
    import type {PluginListenerHandle} from "@capacitor/core";

    let archivedNotes: Note[] = []
    let backlistener: PluginListenerHandle

    archived.subscribe(_ => loadArchives())

    async function loadArchives() {
        let temp: Note[] = []
        for (const noteId of $archived) {
            const note = await getNoteById(noteId)
            if (note == null) {
                console.info('not found', noteId)
                continue
            }
            temp = [note, ...temp]
        }
        archivedNotes = temp
    }

    onMount(async () => {
        backlistener = await CapacitorApp.addListener('backButton', function () {
            document.getElementById('go_back')?.click()
        })
        await loadArchives()
    })

    onDestroy(() => {
        backlistener.remove()
    })
</script>

<Layout>
    <div class="py-2 flex flex-row justify-between items-center" slot="header">
        <div class="flex flex-row gap-6 items-center pr-4">
            <a href="/" id="go_back">
                <Icon src={ChevronLeft} class="w-6 text-[#9F8E7E]"/>
            </a>
        </div>
        <h1 class="font-semibold text-3xl lowercase">Notie<span class="text-blue-400">.</span></h1>
    </div>
    <div slot="content">
        <div>
            <h2 class="text-[#a6a6a6] font-medium">Archived</h2>
            <div class="{$layout} gap-4 py-3">
                {#each archivedNotes as note}
                    <NoteView note={note}/>
                {/each}
            </div>
        </div>
    </div>
</Layout>