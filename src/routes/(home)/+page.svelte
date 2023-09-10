<script lang="ts">
    import NoteView from "$lib/components/notes/NoteView.svelte";
    import {archived, layout, notes, pinned} from "$lib/states";
    import {getNoteById} from "$lib/notes";
    import {onMount} from "svelte";
    import type {Note} from "$lib/notes";

    let pinnedNotes: Note[] = []
    let normalNotes: Note[] = []

    onMount(async () => {
        for (const noteId of $pinned) {
            const note = await getNoteById(noteId)
            if (note == null) {
                continue
            }
            pinnedNotes = [note, ...pinnedNotes]
        }

        for (const noteId of $notes) {
            console.info(noteId)
            if ($pinned.find(value => noteId === value) != null) {
                continue
            }
            if ($archived.find(value => noteId === value) != null) {
                continue
            }
            const note = await getNoteById(noteId)
            if (note == null) {
                console.info('not found', noteId)
                continue
            }
            normalNotes = [note, ...normalNotes]
        }
    })
</script>

<div>
    {#if pinnedNotes.length > 0}
        <div class="pb-4">
            <h2 class="text-[#a6a6a6] font-medium">Pinned</h2>
            <div class="{$layout} gap-4 py-3">
                {#each pinnedNotes as note}
                    <NoteView note={note}/>
                {/each}
            </div>
        </div>
    {/if}
    <div>
        <h2 class="text-[#a6a6a6] font-medium">Notes</h2>
        <div class="{$layout} gap-4 py-3">
            {#each normalNotes as note}
                <NoteView note={note}/>
            {/each}
        </div>
    </div>
</div>