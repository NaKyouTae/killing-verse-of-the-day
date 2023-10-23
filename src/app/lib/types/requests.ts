import {PageFilter} from "@/app/lib/types/interfaces"

export interface VerseInsertRequest {
    id: string | null
    verse: string
    writer: string
    like: number | null
    createdAt: number | null
    updatedAt: number | null
}

export interface VerseUpdateRequest {
    id: string
    verse: string
}

export interface ListRequest {
    filters: PageFilter[]
}
