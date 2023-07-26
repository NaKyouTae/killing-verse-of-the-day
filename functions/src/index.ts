// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import {
    buildCorsHeader,
    convertToBody, convertToResponse,
    generateRandomString,
    handleOperator,
} from "./utils"
import * as admin from "firebase-admin"
import * as serviceAccount from "../credentials.json"
import * as cors from "cors"
import {pageFilter} from "./interfaces"

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
            
            const body = convertToBody(req.body)
            
            const writeResult = await getFirestore().collection("verses").add({
                id: generateRandomString(16),
                verse: body.verse,
                like: 0,
                writer: body.writer,
                createdAt: admin.firestore.Timestamp.fromDate(new Date()),
                updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
            })
            res.json({result: `Added Verse with ID: ${writeResult.id} added.`})
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

exports.listVerse = onRequest(async (req: any, res: any) => {
    corsHandler(req, res, async () => {
        try {
            res = buildCorsHeader(res)
            if (req.method == "OPTIONS") {
                return res.status(200).send("ok")
            }
            
            let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = getFirestore()
                .collection("verses")
                .orderBy("createdAt", "desc")
            const filters: pageFilter[] = req.body.filters
            
            filters.forEach((filter) => {
                if (filter.field == "createdAt") {
                    filter.value = new Date(filter.value)
                }
                query = handleOperator(query, filter)
            })
            
            const list = await query.get()
            const responseArray: any[] = []
            
            list.forEach((verse: any) => {
                responseArray.push(convertToResponse(verse))
            })
            
            res.json(responseArray)
            functions.logger.log(`Search Verse results:${responseArray}`)
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
