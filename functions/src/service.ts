import {getFirestore} from "firebase-admin/lib/firestore"
import {PageFilter, StoreCollections} from "./interfaces"
import {operatorHandler} from "./utils"

export async function getDocumentListOrderByCreatedAtDesc(collection: StoreCollections, filters?: PageFilter[]) {
    const query = getFirestore()
        .collection(collection)
        .orderBy("createdAt", "desc")
    const list = await operatorHandler(query, filters).get()
    
    return list
}
