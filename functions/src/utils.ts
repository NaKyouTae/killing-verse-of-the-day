import {pageFilter} from "./interfaces"

export function buildCorsHeader(res: any) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Methods", "POST, OPTIONS")
    return res
}

export function generateRandomString(length: number): string {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        result += characters[randomIndex]
    }
    return result
}

export function convertBody(body: any): any {
    let cbody

    // 데이터의 타입을 확인하고, JSON 형태의 문자열만 JSON.parse()를 사용하여 변환.
    if (typeof body === "string") {
        cbody = JSON.parse(body);
    } else { // 이미 객체인 경우, JSON.parse 호출 과정을 건너뜁니다.
        cbody = body;
    }
    return cbody
}

export function handleOperator(query: any, filter: pageFilter) {
    if (filter.value) return query.where(filter.field, filter.operator, filter.value)
    return query
}
