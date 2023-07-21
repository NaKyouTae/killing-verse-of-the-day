export interface Verse {
    id: string
    verse: string
    writer: string
    like: number
    createdAt: number
    updatedAt: number
}

export interface CardModel {
    id: string
    title: string
    content: string
    writer: string
}
