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
    commonRequest, getDocumentById,
} from "./utils"
import * as admin from "firebase-admin"
import * as serviceAccount from "../credentials.json"
import {StoreCollections} from "./interfaces"
import {getDocumentListOrderByCreatedAtDesc} from "./service"

const {initializeApp} = require("firebase-admin/app")
const {getFirestore} = require("firebase-admin/firestore")

const functions = require("firebase-functions")

initializeApp(serviceAccount)

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
    const list = await getDocumentListOrderByCreatedAtDesc(StoreCollections.VERSES, req.body.filters)
    const responseArray: any[] = []
    
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
    const list = await getDocumentListOrderByCreatedAtDesc(StoreCollections.LIKE_HISTORIES, req.body.filters)
    const responseArray: any[] = []
    
    list.forEach((verse: any) => {
        responseArray.push(convertToResponse(verse))
    })
    
    res.json(responseArray)
    functions.logger.log(`Search Verse results:${responseArray}`)
})

exports.updateVerse = commonRequest(async (req: any, res: any) => {
    const body = convertToBody(req.body)
    const query = await getFirestore()
        .collection(StoreCollections.VERSES)
        .doc(body.id)
    
    await operatorHandler(query, req.body.filters)
        .update({verse: body.verse})
        .then((verseRes: any) => {
            res.json(verseRes)
            functions.logger.log(`Update Verse results:${verseRes}`)
        })
})

exports.deleteVerse = commonRequest(async (req: any, res: any) => {
    const id = req.params[0]
    const list = await getDocumentListOrderByCreatedAtDesc(StoreCollections.VERSES)
    const docID = getDocumentById(list, id)
    
    await getFirestore()
        .collection(StoreCollections.VERSES)
        .doc(docID)
        .delete()
        .then((verseRes: any) => {
            res.json(verseRes)
            functions.logger.log(`Delete Verse results:${verseRes}`)
        })
})
