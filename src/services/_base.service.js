import { firestore } from "js/firebase";
const db = firestore;

class BaseDataService {

    create(collection, data) {
        return db.collection(collection).add(data);
    }

    getAll(collection) {
        return db.collection(collection).get();
    }

    query(collection, key, operation, condition) {
        return db.collection(collection).where(key, operation, condition).get();
    }
}

export default new BaseDataService();