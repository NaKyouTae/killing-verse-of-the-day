export interface PageFilter {
    field: string
    operator: operatorType
    value: any
}

export type operatorType = "==" | ">=" | "<=" | "LIKE"

export type LogicFunction = (req: any, res: any) => Promise<void>;

export enum StoreCollections {
    VERSES = "verses",
    LIKE_HISTORIES = "like_histories",
}
