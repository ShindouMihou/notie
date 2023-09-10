<script lang="ts">
    import Editor from "$lib/components/screens/Editor.svelte";
    import {onMount} from "svelte";
    import {getNoteById} from "$lib/notes";
    import type {Note} from "$lib/notes";
    import {page} from "$app/stores";
    import Loading from "$lib/components/screens/Loading.svelte";

    let note: Note

    function isNumeric(str: string) {
        return !isNaN(Number(str)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    onMount(async () => {
        let id_param =  $page.params.id
        if (!isNumeric(id_param)) {
            console.info("id not safe", id_param)
            window.location.replace("/")
            return
        }
        const id = Number.parseInt(id_param)
        const noteInstance = await getNoteById(id)
        if (noteInstance == null) {
            console.info("no such note")
            window.location.replace("/")
            return
        }
        note = noteInstance
    })
</script>

{#if note == null}
    <Loading/>
{:else}
    <Editor note={note}/>
{/if}