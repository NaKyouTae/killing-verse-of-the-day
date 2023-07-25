export interface pageFilter {
    field: string
    operator: operatorType
    value: any
}

export type operatorType = "==" | ">=" | "<=" | "LIKE"
