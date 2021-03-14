import { firestore } from "js/firebase";
const db = firestore;

class BaseDataService {

    getAll(collection) {
        return db.collection(collection).get();
    }
}

export default new BaseDataService();