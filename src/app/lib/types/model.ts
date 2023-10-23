import {ListRequest, VerseInsertRequest} from "@/app/lib/types/requests"

export const verseListRqDefaultParam: ListRequest = {
    filters: [{
        field: "createdAt",
        operator: ">=",
        value: null,
    }]
}


export const verseDefaultRequestParam: VerseInsertRequest = {
    id: null,
    verse: '',
    writer: '',
    like: null,
    createdAt: null,
    updatedAt: null,
}
