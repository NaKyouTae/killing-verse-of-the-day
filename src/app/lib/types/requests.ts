import {PageFilter} from "@/app/lib/types/interfaces"

export interface VerseRequest {
    id: string | null
    verse: string
    writer: string
    like: number | null
    createdAt: number | null
    updatedAt: number | null
}

export interface ListRequest {
    filters: PageFilter[]
}
