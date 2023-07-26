import {LogicFunction, PageFilter} from "./interfaces"
import {HttpsFunction} from "firebase-functions"
import * as cors from "cors"

const {onRequest} = require("firebase-functions/v2/https")
const corsHandler = cors({origin: true})
const functions = require("firebase-functions")

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

export function convertToBody(body: any): any {
    let cbody

    // 데이터의 타입을 확인하고, JSON 형태의 문자열만 JSON.parse()를 사용하여 변환.
    if (typeof body === "string") {
        cbody = JSON.parse(body);
    } else { // 이미 객체인 경우, JSON.parse 호출 과정을 건너뜁니다.
        cbody = body;
    }
    return cbody
}

export function convertToResponse(item: any): any {
    const data = item.data()
    console.log(data.createdAt)
    return {
        ...data,
        createdAt: data.createdAt.seconds * 1000,
        updatedAt: data.updatedAt.seconds * 1000,
    }
}

export function initialRequest(req: any, res: any): any {
    res = buildCorsHeader(res)
    
    if (req.method == "OPTIONS") {
        return res.status(200).send("ok")
    }
    
    return res
}

export function commonRequest(func: LogicFunction): HttpsFunction {
    return onRequest(async (req: any, res: any) => {
        corsHandler(req, res, async () => {
            try {
                res = initialRequest(req, res)
                return await func(req, res);
            } catch (err: any) {
                return errorHandler(err, req, res)
            }
        })
    })
}

export function errorHandler(err: any, req: any, res: any): any {
    functions.logger.log(`Error Request Body:${req.body}`)
    functions.logger.log(err.message)
    
    return res.status(500).json({
        status: "error",
        error: err.message,
    })
}

export function operatorHandler(query: any, filters: PageFilter[]) {
    filters.forEach((filter) => {
        if (filter.field == "createdAt") {
            filter.value = new Date(filter.value)
        }
        
        if (filter.value) {
            query = query.where(filter.field, filter.operator, filter.value)
        }
    })
    
    return query
}
