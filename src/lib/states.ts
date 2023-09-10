import type {Writable} from "svelte/store";
import {writable} from "svelte/store";
import {Preferences} from "@capacitor/preferences";

export const layout: Writable<string> = writable('grid grid-cols-2')
export const lastNote: Writable<number> = writable(0)

export const notes: Writable<number[]> = writable([])
export const pinned: Writable<number[]> = writable([])
export const archived: Writable<number[]> = writable([])

export async function openStores() {
    await load(layout, 'ui.layout')
    await load(notes, 'data.notes')
    await load(pinned, 'data.pinned')
    await load(archived, 'data.archived')
    await load(lastNote, 'incremental.last_note_id')
}

async function load(writable: Writable<any>, key: string, unmarshal: boolean = true) {
    const result = await Preferences.get({ key: key})
    if (result.value == null) {
        writable.subscribe(value => Preferences.set({key, value: unmarshal ? JSON.stringify(value) : value}))
        return
    }
    if (unmarshal) {
        writable.set(JSON.parse(result.value))
    } else {
        writable.set(result.value)
    }
    writable.subscribe(value => Preferences.set({key, value: unmarshal ? JSON.stringify(value) : value}))
}
