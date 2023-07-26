// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import {
    convertToBody,
    convertToResponse,
    generateRandomString,
    operatorHandler,
    commonRequest,
} from "./utils"
import * as admin from "firebase-admin"
import * as serviceAccount from "../credentials.json"
import {StoreCollections} from "./interfaces"

const {initializeApp} = require("firebase-admin/app")
const {getFirestore} = require("firebase-admin/firestore")

const functions = require("firebase-functions")

initializeApp(serviceAccount)

// exports.insertVerse = onRequest(async (req: any, res: any) => {
//     corsHandler(req, res, async () => {
//         try {
//             res = buildCorsHeader(res)
//             if (req.method == "OPTIONS") {
//                 return res.status(200).send("ok")
//             }
//
//             const body = convertToBody(req.body)
//
//             const writeResult = await getFirestore().collection("verses").add({
//                 id: generateRandomString(16),
//                 verse: body.verse,
//                 like: 0,
//                 writer: body.writer,
//                 createdAt: admin.firestore.Timestamp.fromDate(new Date()),
//                 updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
//             })
//             res.json({result: `Added Verse with ID: ${writeResult.id} added.`})
//             functions.logger.log(`Added Verse with ID: ${writeResult.id} added.`)
//         } catch (err: any) {
//             functions.logger.log(`Error Request Body:${req.body}`)
//             functions.logger.log(err.message)
//
//             return res.status(500).json({
//                 status: "error",
//                 error: err.message,
//             })
//         }
//     })
// })

// exports.listVerse = onRequest(async (req: any, res: any) => {
//     corsHandler(req, res, async () => {
//         try {
//             res = initialRequest(req, res)
//
//             let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = getFirestore()
//                 .collection("verses")
//                 .orderBy("createdAt", "desc")
//
//             query = handleOperator(query, req.body.filters)
//
//             const list = await query.get()
//             const responseArray: any[] = []
//
//             list.forEach((verse: any) => {
//                 responseArray.push(convertToResponse(verse))
//             })
//
//             res.json(responseArray)
//             functions.logger.log(`Search Verse results:${responseArray}`)
//         } catch (err: any) {
//             return errorHandler(err, req, res)
//         }
//     })
// })

exports.insertVerse = commonRequest(async (req: any, res: any) => {
    const body = convertToBody(req.body)
    const writeResult = await getFirestore()
        .collection(StoreCollections.VERSES)
        .add({
            id: generateRandomString(16),
            verse: body.verse,
            like: 0,
            writer: body.writer,
            createdAt: admin.firestore.Timestamp.fromDate(new Date()),
            updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
        })
    
    res.json({result: `Added Verse with ID: ${writeResult.id} added.`})
    functions.logger.log(`Added Verse with ID: ${writeResult.id} added.`)
})

exports.listVerse = commonRequest(async (req: any, res: any) => {
    const query = getFirestore()
        .collection(StoreCollections.VERSES)
        .orderBy("createdAt", "desc")
    const list = await operatorHandler(query, req.body.filters).get()
    const responseArray: any[] = []
    
    console.log("list", list)
    
    list.forEach((verse: any) => {
        responseArray.push(convertToResponse(verse))
    })
    
    res.json(responseArray)
    functions.logger.log(`Search Verse results:${responseArray}`)
})

exports.insertLikeHistories = commonRequest(async (req: any, res: any) => {
    const body = convertToBody(req.body)
    const writeResult = await getFirestore()
        .collection(StoreCollections.LIKE_HISTORIES)
        .add({
            id: generateRandomString(16),
            verseId: body.verseId,
            createdAt: admin.firestore.Timestamp.fromDate(new Date()),
        })
    
    await getFirestore()
        .collection(StoreCollections.VERSES)
        .doc(body.verseId)
        .update("like", 0)
    
    res.json({result: `Added Verse with ID: ${writeResult.id} added.`})
    functions.logger.log(`Added Verse with ID: ${writeResult.id} added.`)
})

exports.listLikeHistories = commonRequest(async (req: any, res: any) => {
    const query = getFirestore()
        .collection(StoreCollections.LIKE_HISTORIES)
        .orderBy("createdAt", "desc")
    const list = await operatorHandler(query, req.body.filters).get()
    const responseArray: any[] = []
    
    list.forEach((verse: any) => {
        responseArray.push(convertToResponse(verse))
    })
    
    res.json(responseArray)
    functions.logger.log(`Search Verse results:${responseArray}`)
})
