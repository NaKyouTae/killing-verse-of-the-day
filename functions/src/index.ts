// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import {buildCorsHeader, generateRandomString} from "./utils"
import * as admin from "firebase-admin"
import * as serviceAccount from "../credentials.json"
import * as cors from "cors"

const {onRequest} = require("firebase-functions/v2/https")
const {initializeApp} = require("firebase-admin/app")
const {getFirestore} = require("firebase-admin/firestore")
const corsHandler = cors({origin: true})

const functions = require("firebase-functions")

initializeApp(serviceAccount)

exports.insertVerse = onRequest(async (req: any, res: any) => {
    corsHandler(req, res, async () => {
        try {
            res = buildCorsHeader(res)
            if (req.method == "OPTIONS") {
                return res.status(200).send("ok")
            }
            let body;

            // 데이터의 타입을 확인하고, JSON 형태의 문자열만 JSON.parse()를 사용하여 변환.
            if (typeof req.body === "string") {
                body = JSON.parse(req.body);
            } else { // 이미 객체인 경우, JSON.parse 호출 과정을 건너뜁니다.
                body = req.body;
            }

            const writeResult = await getFirestore().collection("verses").add({
                id: generateRandomString(16),
                verse: body.verse,
                like: 0,
                writer: body.writer,
                createdAt: admin.firestore.Timestamp.fromDate(new Date()),
                updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
            })
            res.json({result: `Added Verse with ID: ${writeResult.id} added.`})
            // eslint-disable-next-line max-len
            functions.logger.log(`Added Verse with ID: ${writeResult.id} added.`)
        } catch (err: any) {
            functions.logger.log(`Error Request Body:${req.body}`)
            functions.logger.log(err.message)

            return res.status(500).json({
                status: "error",
                error: err.message,
            })
        }
    })
})

