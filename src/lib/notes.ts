import {Preferences} from "@capacitor/preferences";

export type Note = {
    id: number
    title: string
    contents: string
    created_at: Date
    updated_at:  Date
}
export async function getNoteById(id: number): Promise<Note | null> {
    const result = await Preferences.get({ key: 'notes.' + id.toString() })
    if (result.value == null) {
        return null
    }
    return JSON.parse(result.value)
}