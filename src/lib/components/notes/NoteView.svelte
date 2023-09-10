<script lang="ts">
    import type {Note} from "$lib/notes";

    export let note: Note
</script>
<a href="/notes/{note.id}" class="flex flex-col gap-2 p-4 rounded-lg shadow border-[#2F2F2F] border bg-[#2F2F2F] bg-opacity-5 w-full h-44 active:opacity-60 transition ease-in-out duration-500">
    <h3 class="font-bold text-white text-lg">{note.title}</h3>
    <p class="line-clamp-3">
        {note.contents}
    </p>
</a>